/**
 * Thin wrapper over the default @wordpress/scripts webpack config.
 *
 * Blocks under src/blocks are auto-discovered via their block.json as usual;
 * this only adds extra entries for the theme-wide stylesheet and editor assets
 * (src/theme -> build/theme/*), which block.json discovery cannot express.
 *
 * With --experimental-modules the default export is an array of
 * [ scriptConfig, moduleConfig ]; the extra entries belong in scriptConfig.
 */
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const configs = Array.isArray( defaultConfig ) ? defaultConfig : [ defaultConfig ];
const [ scriptConfig, ...moduleConfigs ] = configs;

const defaultEntry = scriptConfig.entry;

scriptConfig.entry = () => ( {
	...( typeof defaultEntry === 'function' ? defaultEntry() : defaultEntry ),
	'theme/index': path.resolve( process.cwd(), 'src/theme/index.js' ),
	'theme/editor': path.resolve( process.cwd(), 'src/theme/editor.js' ),
} );

module.exports = Array.isArray( defaultConfig )
	? [ scriptConfig, ...moduleConfigs ]
	: scriptConfig;
