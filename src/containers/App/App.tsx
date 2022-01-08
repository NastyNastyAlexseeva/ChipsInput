import { useState } from 'react';
import Form from '../Form';
import ChipsInput from '../../components/ChipsInput';

import './App.scss';

const App = () => {
	const [valueСIDeafault, setValueСIDeafault] = useState("чипс1, чипс2, чипс3,");
	const [valueСINotLastComma, setValueСINotLastComma] = useState("чипс1, чипс2, чипс3");
	const [valueСIValidQuotes, setValueСIValidQuotes] = useState('чипс1, "чипс2,", чипс3, чипс",4,",');
	const [valueСIInValidQuotes, setValueСIInValidQuotes] = useState('чипс1, чипс2, чипс3, чипс4,", чипс5, чипс,6,,');

	return (
		<main className='main'>
			<section className='content'>
				<Form>
					<h1><span>Init value: </span>"чипс1, чипс2, чипс3,"</h1>
					<ChipsInput
						id='chipsInputDefault'
						name='chipsInputDefault'
						placeholder="Введите ключевые слова"
						value={valueСIDeafault}
						onChange={setValueСIDeafault} />
					
					<h1><span>Init value: </span>"чипс1, чипс2, чипс3"</h1>
					<ChipsInput
						id='chipsInputNotLastComma'
						name='chipsInputNotLastComma'
						placeholder="Введите ключевые слова"
						value={valueСINotLastComma}
						onChange={setValueСINotLastComma} />
					
					<h1><span>Init value: </span>'чипс1, "чипс2,", чипс3, чипс",4,",'</h1>
					<ChipsInput
						id='chipsInputValidQuotes'
						name='chipsInputValidQuotes'
						placeholder="Введите ключевые слова"
						value={valueСIValidQuotes}
						onChange={setValueСIValidQuotes} />

					<h1><span>Init value: </span>'чипс1, чипс2, чипс3, "чипс4,", чипс5, чипс",6,,'</h1>
					<ChipsInput
						id='chipsInputInValidQuotes'
						name='chipsInputInValidQuotes'
						placeholder="Введите ключевые слова"
						value={valueСIInValidQuotes}
						onChange={setValueСIInValidQuotes} />
				</Form>
			</section>
		</main>
	);
}

export default App;
