<?php
/**
 * Single-line text field of the site header.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Unused (no inner blocks).
 * @var WP_Block $block      Block instance.
 *
 * @package moira-wong-orthodontics
 */

// Inline formatting the editor field allows: bold, italic, underline, strikethrough, links, text colour.
$allowed_html = array(
	'a'      => array(
		'href'   => true,
		'target' => true,
		'rel'    => true,
	),
	'strong' => array(),
	'b'      => array(),
	'em'     => array(),
	'i'      => array(),
	's'      => array(),
	'del'    => array(),
	'mark'   => array(
		'class' => true,
		'style' => true,
	),
	'span'   => array(
		'class' => true,
		'style' => true,
	),
);

$text = trim( wp_kses( $attributes['content'] ?? '', $allowed_html ) );

if ( '' === wp_strip_all_tags( $text ) ) {
	return;
}

// A phone link gets a handset icon next to its text; the stylesheet shows the
// icon in place of the text on narrow screens (the text stays for screen readers).
$phone_icon = '<svg class="mw-header__tel-icon" aria-hidden="true" focusable="false" width="22" height="22" viewBox="10.23 10.23 79.54 79.54" fill="currentColor"><path fill-rule="evenodd" d="m10.301 31.875c-1.0781-8.7383 10.766-26.379 17.695-20.453 2.2148 1.8945 11.707 17.922 12.07 19.871 0.83203 4.4336-3.5586 8.6797-6.8906 13.574-4.3516 6.3984 15.555 26.305 21.953 21.953 4.8945-3.332 9.1406-7.7227 13.574-6.8906 1.9531 0.36719 17.98 9.8594 19.871 12.07 5.9258 6.9297-11.715 18.777-20.453 17.699-27.883-3.4375-54.383-29.938-57.82-57.824z"/></svg>';

$text = preg_replace(
	'/(<a\b[^>]*\bhref="tel:[^"]*"[^>]*>)(.*?)(<\/a>)/is',
	'$1<span class="mw-header__tel-text">$2</span>' . $phone_icon . '$3',
	$text
);
?>
<p <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput ?>><?php echo $text; // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
