import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
	MediaReplaceFlow,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import MediaControl from '../../utils/media-control';

// What the field accepts: the usual WYSIWYG content. The paragraph / heading /
// list blocks bring bold, italic, links, line breaks and nested lists with them.
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading', 'core/list' ];

const TEMPLATE = [ [ 'core/paragraph' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { hasIcon, iconId, iconUrl, iconAlt } = attributes;

	const blockProps = useBlockProps( {
		className: `mw-footer-text${ hasIcon ? ' has-icon' : '' }`,
	} );

	const onSelectIcon = ( media ) =>
		setAttributes( {
			iconId: media.id,
			iconUrl: media.url,
			iconAlt: media.alt || '',
		} );

	const onRemoveIcon = () =>
		setAttributes( { iconId: undefined, iconUrl: '', iconAlt: '' } );

	return (
		<>
			{ hasIcon && (
				<BlockControls>
					<MediaReplaceFlow
						mediaId={ iconId }
						mediaURL={ iconUrl }
						allowedTypes={ [ 'image' ] }
						accept="image/*"
						onSelect={ onSelectIcon }
						onReset={ onRemoveIcon }
						name={ `${ __(
							'Address icon',
							'moira-wong-orthodontics'
						) } ▾` }
					/>
				</BlockControls>
			) }
			<div { ...blockProps }>
				{ hasIcon &&
					( iconUrl ? (
						<MediaControl
							className="mw-footer-text__icon"
							url={ iconUrl }
							alt={ iconAlt }
							id={ iconId }
							title={ __(
								'Address icon',
								'moira-wong-orthodontics'
							) }
							onSelect={ onSelectIcon }
							onRemove={ onRemoveIcon }
						/>
					) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectIcon }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button
										className="mw-footer-text__icon-add"
										icon="plus"
										label={ __(
											'Add address icon',
											'moira-wong-orthodontics'
										) }
										onClick={ open }
									/>
								) }
							/>
						</MediaUploadCheck>
					) ) }
				<div className="mw-footer-text__body">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						// The footer locks its own structure; the content of a field stays free.
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}
