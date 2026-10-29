import './theme.scss';

// html.mw-scrolled marks a scrolled page (the header logo card goes compact).
// html.mw-header-transitioning is set only while that flip animates, so the
// vw-based sizes do not animate on window resizes.
const root = document.documentElement;
const TRANSITION_MS = 500;
let isScrolled = false;
let transitionTimeout;

function stopTransitioning() {
	root.classList.remove( 'mw-header-transitioning' );
	window.clearTimeout( transitionTimeout );
}

function updateScrolled() {
	const scrolled = window.scrollY > 0;
	if ( scrolled === isScrolled ) {
		return;
	}
	isScrolled = scrolled;
	root.classList.toggle( 'mw-scrolled', scrolled );
	root.classList.add( 'mw-header-transitioning' );
	window.clearTimeout( transitionTimeout );
	// Safety net for when no transition runs (nothing changed size).
	transitionTimeout = window.setTimeout( stopTransitioning, TRANSITION_MS );
}

document
	.querySelector( '.mw-header__logo' )
	?.addEventListener( 'transitionend', stopTransitioning );

updateScrolled();
window.addEventListener( 'scroll', updateScrolled, { passive: true } );
