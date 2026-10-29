import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Spinner } from '@wordpress/components';

// Inline SVGs, not dashicon name strings: the editor canvas iframe does not load
// wp-admin's dashicons webfont, so dashicon glyphs silently render as nothing here.
const svg = ( path ) => (
	<svg
		viewBox="0 0 24 24"
		width="20"
		height="20"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
	>
		<path d={ path } />
	</svg>
);

const editIcon = svg(
	'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
);
const trashIcon = svg(
	'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
);
// Icon of an empty image slot (MediaPlaceholder's `icon`).
export const imageIcon = svg(
	'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'
);
const arrowLeftIcon = svg( 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' );
const arrowRightIcon = svg( 'M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z' );

// An image with a hover/focus toolbar: move left/right, replace (pencil), remove (trash).
// A blob: preview without an attachment id yet means an upload is in progress, so a
// spinner replaces the toolbar until the real attachment arrives.
export default function MediaControl( {
	className,
	url,
	alt,
	id,
	title,
	onSelect,
	onRemove,
	onMoveLeft,
	onMoveRight,
	moveLeftDisabled,
	moveRightDisabled,
} ) {
	const isUploading = ! id;

	return (
		<div
			className={ `${ className } mw-media-control${
				isUploading ? ' is-uploading' : ''
			}` }
			tabIndex={ 0 }
			role="group"
			aria-label={ title }
		>
			<img src={ url } alt={ alt } />
			{ isUploading ? (
				<div className="mw-media-control__spinner">
					<Spinner />
				</div>
			) : (
				<div className="mw-media-control__toolbar">
					{ onMoveLeft && (
						<Button
							icon={ arrowLeftIcon }
							label={ __(
								'Move left',
								'moira-wong-orthodontics'
							) }
							onClick={ onMoveLeft }
							disabled={ moveLeftDisabled }
							accessibleWhenDisabled
						/>
					) }
					{ onMoveRight && (
						<Button
							icon={ arrowRightIcon }
							label={ __(
								'Move right',
								'moira-wong-orthodontics'
							) }
							onClick={ onMoveRight }
							disabled={ moveRightDisabled }
							accessibleWhenDisabled
						/>
					) }
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelect }
							allowedTypes={ [ 'image' ] }
							value={ id }
							render={ ( { open } ) => (
								<Button
									icon={ editIcon }
									label={ __(
										'Replace image',
										'moira-wong-orthodontics'
									) }
									onClick={ open }
								/>
							) }
						/>
					</MediaUploadCheck>
					<Button
						icon={ trashIcon }
						isDestructive
						label={ __(
							'Remove image',
							'moira-wong-orthodontics'
						) }
						onClick={ onRemove }
					/>
				</div>
			) }
		</div>
	);
}
