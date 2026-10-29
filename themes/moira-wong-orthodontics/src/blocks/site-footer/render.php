<?php
/**
 * Site footer band: fixed logo and the address / treatments text fields (inner blocks).
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks.
 * @var WP_Block $block      Block instance.
 *
 * @package moira-wong-orthodontics
 */

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'mw-site-footer' ) );
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<div class="mw-footer__band mw-section">
		<div class="mw-content mw-footer__layout"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
	</div>
</div>
