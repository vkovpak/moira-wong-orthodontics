/* global getComputedStyle, requestAnimationFrame, cancelAnimationFrame, ResizeObserver, MutationObserver */
// Lays out a row of logos by their real rendered widths.
//
// If everything fits on one line the row is "spread" (edge logos flush with the
// edges). Otherwise the rows are filled as full as possible from the top (6
// logos become 4+2, not 3+3), except that rows holding a single logo are
// avoided when a slightly narrower layout allows it (5+1 becomes 4+2), and a
// single logo is better at the bottom than in the middle (2+2+1, not 2+1+2).
//
// Up to three rows keep the full width: data-layout="rows" plus a data-row
// (1-3) on every logo make CSS force the line breaks, rows of four or more
// logos stay spread, and rows of up to three are centred through
// data-centre-start / data-centre-end on their first and last logo, with the
// same space between the logos as the spread rows have. More rows
// than that fall back to data-layout="balanced": the row is narrowed to fit the
// chosen layout and every row is centred.
//
// Resizing: the layout is recomputed synchronously on the window's resize event
// (it fires before the frame is painted, so no frame shows the previous layout
// at the new width) and, when the width has moved by less than TOLERANCE since
// the last computation, the previous layout is kept as long as it still fits.
// That stops it flipping back and forth at a threshold, e.g. when a scrollbar
// appearing or disappearing changes the width by about 15px.

// Added to the width finally applied, so a row that fits exactly is not pushed
// onto another line by sub-pixel rounding. Never used when deciding what fits.
const SAFETY = 1;

// Wider than a scrollbar.
const TOLERANCE = 24;

// Slack when comparing widths: sums of fractional widths taken in a different
// order differ by ~1e-13, which would make a row that fits exactly look too
// wide (and turn a 4+2 candidate into 3+3). Far smaller than the 1/64px the
// browser lays out in.
const EPSILON = 0.01;

const MAX_FORCED_ROWS = 3;

// Rows with this many logos or fewer are centred; longer ones stay spread.
const MAX_CENTRED_LOGOS = 3;

// The last computed layout of each row.
const states = new WeakMap();

// Logos per row when wrapping greedily into `limit`.
function rowCounts( widths, gap, limit ) {
	const counts = [];
	let used = 0;
	let count = 0;

	for ( const width of widths ) {
		if ( count === 0 ) {
			used = width;
			count = 1;
		} else if ( used + gap + width <= limit + EPSILON ) {
			used += gap + width;
			count++;
		} else {
			counts.push( count );
			used = width;
			count = 1;
		}
	}

	counts.push( count );

	return counts;
}

// Do rows of the given sizes all fit within `limit`?
function fits( counts, widths, gap, limit ) {
	let index = 0;

	return counts.every( ( count ) => {
		const rowWidths = widths.slice( index, index + count );
		index += count;

		return (
			rowWidths.reduce( ( sum, width ) => sum + width, 0 ) +
				gap * ( rowWidths.length - 1 ) <=
			limit + EPSILON
		);
	} );
}

// Lower is better: every row with one logo costs, one in the middle more so.
function cost( counts ) {
	const lastIndex = counts.length - 1;

	return counts.reduce(
		( total, count, index ) =>
			count === 1 ? total + ( index === lastIndex ? 10 : 15 ) : total,
		0
	);
}

// Widths at which the greedy layout can change: the total width of every run of
// neighbouring logos that fits, widest first.
function breakpoints( widths, gap, available ) {
	const sums = new Set();

	for ( let start = 0; start < widths.length; start++ ) {
		let sum = 0;

		for ( let end = start; end < widths.length; end++ ) {
			sum += ( end > start ? gap : 0 ) + widths[ end ];

			if ( sum > available + EPSILON ) {
				break;
			}

			sums.add( sum );
		}
	}

	return Array.from( sums ).sort( ( a, b ) => b - a );
}

// The layout for the given widths: { layout, counts, maxWidth }.
function computeLayout( widths, gap, available ) {
	const rows = rowCounts( widths, gap, available ).length;

	if ( rows === 1 ) {
		return { layout: 'spread', counts: [ widths.length ] };
	}

	// Among the layouts with the same number of rows, the cheapest one; the
	// widest (fullest at the top) wins a tie because candidates are widest first.
	const candidates = breakpoints( widths, gap, available )
		.map( ( width ) => ( {
			width,
			counts: rowCounts( widths, gap, width ),
		} ) )
		.filter( ( { counts } ) => counts.length === rows );
	const best = candidates.reduce(
		( chosen, candidate ) =>
			cost( candidate.counts ) < cost( chosen.counts )
				? candidate
				: chosen,
		candidates[ 0 ] ?? { width: available, counts: [] }
	);

	if ( best.counts.length > MAX_FORCED_ROWS ) {
		return {
			layout: 'balanced',
			counts: best.counts,
			maxWidth: Math.ceil( best.width ) + SAFETY,
		};
	}

	return { layout: 'rows', counts: best.counts };
}

function resetRow( row ) {
	row.style.removeProperty( 'max-width' );
	delete row.dataset.layout;

	for ( const item of row.children ) {
		delete item.dataset.row;
		delete item.dataset.centreStart;
		delete item.dataset.centreEnd;
		item.style.removeProperty( 'margin-inline-start' );
	}
}

// The space between the logos of the first spread row (space-between puts the
// room that is left equally between them), or null when no row is spread.
function spreadSpace( counts, widths, available ) {
	let index = 0;

	for ( const count of counts ) {
		if ( count > MAX_CENTRED_LOGOS ) {
			const total = widths
				.slice( index, index + count )
				.reduce( ( sum, width ) => sum + width, 0 );

			return ( available - total ) / ( count - 1 );
		}

		index += count;
	}

	return null;
}

function applyLayout( row, state, available, widths, gap ) {
	const items = Array.from( row.children );

	if ( state.layout === 'balanced' ) {
		row.style.maxWidth = `${ Math.min( available, state.maxWidth ) }px`;
	}

	if ( state.layout === 'rows' ) {
		const space = spreadSpace( state.counts, widths, available );
		let index = 0;

		state.counts.forEach( ( count, rowIndex ) => {
			const rowItems = items.slice( index, index + count );
			index += count;

			rowItems.forEach( ( item ) => {
				item.dataset.row = String( rowIndex + 1 );
			} );

			// Few logos: centred instead of spread.
			if ( count <= MAX_CENTRED_LOGOS ) {
				rowItems[ 0 ].dataset.centreStart = '';
				rowItems[ rowItems.length - 1 ].dataset.centreEnd = '';

				// The same space between the logos as in the spread row, as far
				// as the row has room for it (the row's own gap is already there).
				if ( space !== null && rowItems.length > 1 ) {
					const rowWidths = widths.slice( index - count, index );
					const room =
						( available -
							rowWidths.reduce(
								( sum, width ) => sum + width,
								0
							) ) /
						( count - 1 );
					const extra = Math.max( 0, Math.min( space, room ) - gap );

					rowItems.slice( 1 ).forEach( ( item ) => {
						item.style.marginInlineStart = `${ extra }px`;
					} );
				}
			}
		} );
	}

	row.dataset.layout = state.layout;
}

export function balanceLogosRow( row ) {
	resetRow( row );

	const widths = Array.from( row.children ).map(
		( item ) => item.getBoundingClientRect().width
	);

	// Nothing to measure yet (no logos, or images still loading).
	if ( ! widths.length || widths.includes( 0 ) ) {
		states.delete( row );
		return;
	}

	const gap = parseFloat( getComputedStyle( row ).columnGap ) || 0;
	const available = row.getBoundingClientRect().width;
	const key = `${ widths.map( Math.round ).join( ',' ) }|${ gap }`;

	let state = states.get( row );

	const keepPrevious =
		state &&
		state.key === key &&
		Math.abs( available - state.available ) <= TOLERANCE &&
		fits( state.counts, widths, gap, available );

	if ( ! keepPrevious ) {
		state = {
			...computeLayout( widths, gap, available ),
			key,
			available,
		};
		states.set( row, state );
	}

	applyLayout( row, state, available, widths, gap );
}

// Keeps a row laid out as its section is resized, logos load, or logos are
// added / removed / reordered. Returns a cleanup function.
export function observeLogosRow( row ) {
	let frame = 0;

	const run = () => {
		cancelAnimationFrame( frame );
		frame = requestAnimationFrame( () => balanceLogosRow( row ) );
	};

	// Window resizes are handled before the frame is painted.
	const runNow = () => balanceLogosRow( row );
	window.addEventListener( 'resize', runNow );

	// Anything else that changes the section's width (the editor's sidebars,
	// web fonts): observe the section, not the row, since the row's own
	// max-width is what we change.
	const resize = new ResizeObserver( run );
	resize.observe( row.parentElement );

	const mutations = new MutationObserver( run );
	mutations.observe( row, { childList: true } );

	// load events do not bubble, so listen in the capture phase.
	row.addEventListener( 'load', run, true );

	run();

	return () => {
		cancelAnimationFrame( frame );
		window.removeEventListener( 'resize', runNow );
		resize.disconnect();
		mutations.disconnect();
		row.removeEventListener( 'load', run, true );
		resetRow( row );
		states.delete( row );
	};
}
