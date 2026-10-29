<?php
/**
 * A rich text area of the site footer, with an optional decorative icon.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks (paragraphs, lists, ...).
 * @var WP_Block $block      Block instance.
 *
 * @package moira-wong-orthodontics
 */

$icon_url = ! empty( $attributes['hasIcon'] ) ? (string) ( $attributes['iconUrl'] ?? '' ) : '';
$icon_alt = (string) ( $attributes['iconAlt'] ?? '' );

if ( '' === trim( wp_strip_all_tags( $content ) ) && '' === $icon_url ) {
	return;
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'mw-footer-text' . ( $icon_url ? ' has-icon' : '' ) ) );
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php if ( $icon_url ) : ?>
		<img class="mw-footer-text__icon" src="<?php echo esc_url( $icon_url ); ?>" alt="<?php echo esc_attr( $icon_alt ); ?>"<?php echo '' === $icon_alt ? ' aria-hidden="true"' : ''; ?>>
	<?php endif; ?>
	<div class="mw-footer-text__body"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
</div>
