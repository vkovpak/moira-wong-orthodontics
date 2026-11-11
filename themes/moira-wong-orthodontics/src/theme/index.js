import './theme.scss';

// html.mw-scrolled marks a scrolled page (the header logo card goes compact).
// html.mw-header-transitioning is set only while that flip animates, so the
// vw-based sizes do not animate on window resizes.
const root = document.documentElement;
// How long the logo card takes to shrink and to grow back (the same numbers as
// in site-header/style.scss).
const SHRINK_MS = 350;
const GROW_MS = 500;
let isScrolled = false;
let transitionTimeout;

function stopTransitioning() {
	root.classList.remove( 'mw-header-transitioning' );
	window.clearTimeout( transitionTimeout );
}

function updateScrolled() {
	const scrolled = window.scrollY > 0;
	if ( scrolled === isScrolled ) {
		return;
	}
	isScrolled = scrolled;
	root.classList.toggle( 'mw-scrolled', scrolled );
	root.classList.add( 'mw-header-transitioning' );
	window.clearTimeout( transitionTimeout );
	// Safety net for when no transition runs (nothing changed size).
	transitionTimeout = window.setTimeout(
		stopTransitioning,
		scrolled ? SHRINK_MS : GROW_MS
	);
}

document
	.querySelector( '.mw-header__logo' )
	?.addEventListener( 'transitionend', stopTransitioning );

updateScrolled();
window.addEventListener( 'scroll', updateScrolled, { passive: true } );

// A page opened on a section's link (/#contact) is first scrolled to where the
// section is before the images and the fonts have loaded; their loading moves
// it. So once they have loaded the page is scrolled to the section again, unless
// the visitor has scrolled by then.
const hash = window.location.hash.slice( 1 );
if ( hash ) {
	let visitorScrolled = false;
	const realign = () => {
		const target = document.getElementById( decodeURIComponent( hash ) );
		if ( ! visitorScrolled && target ) {
			target.scrollIntoView( { behavior: 'instant' } );
		}
	};
	[ 'wheel', 'touchstart', 'keydown', 'mousedown' ].forEach( ( type ) =>
		window.addEventListener(
			type,
			() => {
				visitorScrolled = true;
			},
			{ passive: true, once: true }
		)
	);
	document.fonts?.ready.then( realign );
	if ( document.readyState === 'complete' ) {
		realign();
	} else {
		window.addEventListener( 'load', realign, { once: true } );
	}
}

// iOS Safari shows :active (the touch feedback of the hover effects, see
// utils/_pointer.scss) only when a touch listener is on the page.
document.addEventListener( 'touchstart', () => {}, { passive: true } );
