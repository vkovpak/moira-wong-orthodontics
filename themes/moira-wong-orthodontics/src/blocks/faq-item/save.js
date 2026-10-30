import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { question, answer } = attributes;
	const blockProps = useBlockProps.save( { className: 'mw-faq-item' } );

	return (
		<article { ...blockProps }>
			<span className="mw-faq-item__num" aria-hidden="true" />
			{ ! RichText.isEmpty( question ) && (
				<RichText.Content
					tagName="h3"
					className="mw-faq-item__question"
					value={ question }
				/>
			) }
			{ ! RichText.isEmpty( answer ) && (
				<RichText.Content
					tagName="p"
					className="mw-faq-item__answer"
					value={ answer }
				/>
			) }
		</article>
	);
}
