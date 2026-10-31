import { useCallback } from '@wordpress/element';

// Handlers for an image that a block keeps in three attributes named after a
// prefix: `${ prefix }Id`, `${ prefix }Url` and `${ prefix }Alt` (`media` for
// the block's main photo). onSelect takes a media library item, onRemove clears
// the three attributes.
export default function usePhotoAttributes( setAttributes, prefix = 'media' ) {
	const onSelect = useCallback(
		( media ) =>
			setAttributes( {
				[ `${ prefix }Id` ]: media.id,
				[ `${ prefix }Url` ]: media.url,
				[ `${ prefix }Alt` ]: media.alt || '',
			} ),
		[ setAttributes, prefix ]
	);

	const onRemove = useCallback(
		() =>
			setAttributes( {
				[ `${ prefix }Id` ]: undefined,
				[ `${ prefix }Url` ]: '',
				[ `${ prefix }Alt` ]: '',
			} ),
		[ setAttributes, prefix ]
	);

	return { onSelect, onRemove };
}
