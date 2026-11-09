import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import AltField from './alt-field';
import usePhotoAttributes from './use-photo-attributes';

// Controls shared by the blocks whose photo is optional: a "Photo" menu in the
// block toolbar (replace or remove the picture) and a "Has photo" switch in the
// sidebar, which lays the block out as it is without a photo. The block keeps
// its attributes as mediaId / mediaUrl / mediaAlt / hasPhoto. With
// `withPosition` the panel also has a Left / Right switch (photoPosition).
// Once a picture is chosen the panel has its alt text, filled in from the media
// library and editable here (the library's own text is left as it is).
export default function PhotoControls( {
	attributes,
	setAttributes,
	withPosition = false,
} ) {
	const { hasPhoto, mediaId, mediaUrl, mediaAlt, photoPosition } = attributes;
	const { onSelect, onRemove } = usePhotoAttributes( setAttributes );

	return (
		<>
			<BlockControls>
				{ hasPhoto && (
					<MediaReplaceFlow
						mediaId={ mediaId }
						mediaURL={ mediaUrl }
						allowedTypes={ [ 'image' ] }
						accept="image/*"
						onSelect={ onSelect }
						onReset={ onRemove }
						name={ `${ __( 'Photo', 'moira-wong-orthodontics' ) } ▾` }
					/>
				) }
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'moira-wong-orthodontics' ) }>
					<ToggleControl
						label={ __( 'Has photo', 'moira-wong-orthodontics' ) }
						checked={ hasPhoto }
						onChange={ ( value ) =>
							setAttributes( { hasPhoto: value } )
						}
						__nextHasNoMarginBottom
					/>
					{ withPosition && hasPhoto && (
						<ToggleGroupControl
							label={ __(
								'Photo position',
								'moira-wong-orthodontics'
							) }
							value={ photoPosition }
							onChange={ ( value ) =>
								setAttributes( { photoPosition: value } )
							}
							isBlock
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						>
							<ToggleGroupControlOption
								value="left"
								label={ __(
									'Left',
									'moira-wong-orthodontics'
								) }
							/>
							<ToggleGroupControlOption
								value="right"
								label={ __(
									'Right',
									'moira-wong-orthodontics'
								) }
							/>
						</ToggleGroupControl>
					) }
					{ hasPhoto && mediaUrl && (
						<AltField
							label={ __(
								'Photo alt text',
								'moira-wong-orthodontics'
							) }
							alt={ mediaAlt }
							onChange={ ( value ) =>
								setAttributes( { mediaAlt: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
