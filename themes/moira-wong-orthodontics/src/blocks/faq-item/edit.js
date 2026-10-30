import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const { question, answer } = attributes;
	const blockProps = useBlockProps( { className: 'mw-faq-item' } );

	return (
		<article { ...blockProps }>
			<span className="mw-faq-item__num" aria-hidden="true" />
			<RichText
				tagName="h3"
				className="mw-faq-item__question"
				value={ question }
				onChange={ ( value ) => setAttributes( { question: value } ) }
				placeholder={ __( 'Question', 'moira-wong-orthodontics' ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
			/>
			<RichText
				tagName="p"
				className="mw-faq-item__answer"
				value={ answer }
				onChange={ ( value ) => setAttributes( { answer: value } ) }
				placeholder={ __( 'Answer', 'moira-wong-orthodontics' ) }
				allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
			/>
		</article>
	);
}
