<?php
/**
 * Site header: fixed logo and the address / contact text fields (inner blocks).
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks.
 * @var WP_Block $block      Block instance.
 *
 * @package moira-wong-orthodontics
 */

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'mw-header' ) );
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<div class="mw-header__inner">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput ?>
	</div>
</div>
