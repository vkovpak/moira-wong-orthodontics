import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import './editor.scss';

// Page settings panel: per-page switches for the global footer. The footer
// itself is edited once in the Site Editor; these only change how it is shown
// on this page (see mw_register_meta / mw_maybe_hide_footer_logos in functions.php).
function PageFooterSettings() {
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	if ( postType !== 'page' ) {
		return null;
	}

	return (
		<PluginDocumentSettingPanel
			name="mw-page-footer"
			title={ __( 'Footer', 'moira-wong-orthodontics' ) }
		>
			<ToggleControl
				label={ __( 'Hide footer logos', 'moira-wong-orthodontics' ) }
				help={ __(
					'The logos at the very bottom of the site, on this page only.',
					'moira-wong-orthodontics'
				) }
				checked={ !! meta?.mw_hide_footer_logos }
				onChange={ ( value ) =>
					setMeta( { ...meta, mw_hide_footer_logos: value } )
				}
				__nextHasNoMarginBottom
			/>
		</PluginDocumentSettingPanel>
	);
}

registerPlugin( 'mw-page-footer', { render: PageFooterSettings } );
