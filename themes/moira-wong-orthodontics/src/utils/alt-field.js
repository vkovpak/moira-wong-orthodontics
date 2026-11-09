import { TextareaControl } from '@wordpress/components';

// One alt-text field: label above a textarea (unless hideLabel; it stays as the
// aria label), with a thumbnail beside them when showThumb is set (lists of
// images, where the label alone doesn't say which picture a field belongs to;
// with a label the thumbnail is level with the textarea). thumbShape: round (photos) or contain (logos, framed, centred).
// The alt is copied from the media library when a picture is chosen; editing it
// here leaves the library as it is. Styles: src/theme/editor.scss.
export default function AltField( {
	label,
	url,
	alt,
	onChange,
	hideLabel,
	showThumb,
	thumbShape = 'round',
} ) {
	return (
		<div className="mw-alt-field">
			<div className="mw-alt-field__row">
				{ showThumb && (
					<img
						className={ `mw-alt-field__thumb is-${ thumbShape }${
							hideLabel ? '' : ' has-label'
						}` }
						src={ url }
						alt=""
					/>
				) }
				<div className="mw-alt-field__input">
					{ ! hideLabel && (
						<span className="mw-alt-field__label">{ label }</span>
					) }
					<TextareaControl
						label={ label }
						hideLabelFromVision
						value={ alt || '' }
						onChange={ onChange }
						rows={ 2 }
						__nextHasNoMarginBottom
					/>
				</div>
			</div>
		</div>
	);
}
