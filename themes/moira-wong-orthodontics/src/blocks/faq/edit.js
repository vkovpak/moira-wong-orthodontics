import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	Button,
	PanelBody,
	ToolbarGroup,
	ToolbarButton,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { plusIcon } from '../../utils/media-control';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	RichText,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

// Questions and any blocks the button area needs; the button is the usual core
// block, so it keeps its own toolbar.
const ALLOWED_BLOCKS = [ 'mw/faq-item', 'core/buttons' ];

const TEMPLATE = [
	[ 'mw/faq-item' ],
	[ 'mw/faq-item' ],
	[ 'mw/faq-item' ],
	[ 'mw/faq-item' ],
	[
		'core/buttons',
		{},
		[
			[
				'core/button',
				{
					text: __(
						'Enquire about a consultation',
						'moira-wong-orthodontics'
					),
				},
			],
		],
	],
];

const OPTIONS = [ 4, 3, 2 ];

// N blocks in a row, the same total width for all: four squares, three and two
// wider rectangles of the same height. Shows how the cards will sit.
const ICON_WIDTH = 44;
const ICON_GAP = 4;
// The side of the four squares, which fill the width.
const ICON_SIDE = ( ICON_WIDTH - 2 * ICON_GAP - 3 * ICON_GAP ) / 4;

// Passed to `icon` as a function: a ready-made <svg> would be resized to 24px.
const rowIcon = ( n ) => {
	const total = ICON_WIDTH - 2 * ICON_GAP;
	const width = ( total - ICON_GAP * ( n - 1 ) ) / n;

	return (
		<svg
			viewBox={ `0 0 ${ ICON_WIDTH } 24` }
			width={ ICON_WIDTH }
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
		>
			{ Array.from( { length: n }, ( _, i ) => (
				<rect
					key={ i }
					x={ ICON_GAP + i * ( width + ICON_GAP ) }
					y={ ( 24 - ICON_SIDE ) / 2 }
					width={ width }
					height={ ICON_SIDE }
					rx="1"
					fill="currentColor"
				/>
			) ) }
		</svg>
	);
};

const optionLabel = ( n ) =>
	/* translators: %d: number of cards in a row */
	__( '%d per row', 'moira-wong-orthodontics' ).replace( '%d', n );

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { perRow } = attributes;

	const blockProps = useBlockProps( {
		className: `mw-faq mw-section has-${ perRow }-per-row`,
	} );

	// New questions go after the last question, before the button.
	const lastQuestion = useSelect(
		( select ) =>
			select( blockEditorStore )
				.getBlocks( clientId )
				.map( ( block ) => block.name )
				.lastIndexOf( 'mw/faq-item' ),
		[ clientId ]
	);
	const { insertBlock } = useDispatch( blockEditorStore );
	const addQuestion = () =>
		insertBlock( createBlock( 'mw/faq-item' ), lastQuestion + 1, clientId );

	return (
		<>
			<BlockControls>
				<ToolbarGroup
					label={ __(
						'Questions per row',
						'moira-wong-orthodontics'
					) }
				>
					{ OPTIONS.map( ( n ) => (
						<ToolbarButton
							key={ n }
							icon={ () => rowIcon( n ) }
							label={ optionLabel( n ) }
							isPressed={ perRow === n }
							onClick={ () => setAttributes( { perRow: n } ) }
						/>
					) ) }
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={ plusIcon }
						text={ __( 'Add question', 'moira-wong-orthodontics' ) }
						label={ __(
							'Add question',
							'moira-wong-orthodontics'
						) }
						onClick={ addQuestion }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'moira-wong-orthodontics' ) }>
					<ToggleGroupControl
						label={ __(
							'Questions per row',
							'moira-wong-orthodontics'
						) }
						value={ perRow }
						onChange={ ( value ) =>
							setAttributes( { perRow: Number( value ) } )
						}
						isBlock
						__nextHasNoMarginBottom
					>
						{ OPTIONS.map( ( n ) => (
							<ToggleGroupControlOptionIcon
								key={ n }
								value={ n }
								icon={ () => rowIcon( n ) }
								label={ optionLabel( n ) }
							/>
						) ) }
					</ToggleGroupControl>
					<Button
						variant="secondary"
						icon={ plusIcon }
						onClick={ addQuestion }
						className="mw-faq__add"
					>
						{ __( 'Add question', 'moira-wong-orthodontics' ) }
					</Button>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="mw-content">
					<RichText
						tagName="h2"
						className="mw-faq__title"
						value={ attributes.title }
						onChange={ ( title ) => setAttributes( { title } ) }
						placeholder={ __(
							'Heading',
							'moira-wong-orthodontics'
						) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
					<div className="mw-faq__list">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							orientation="horizontal"
							renderAppender={ false }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
