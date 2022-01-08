import { useState } from 'react';
import Form from '../Form';
import ChipsInput from '../../components/ChipsInput';

import './App.scss';

const App = () => {
	const [valueСINotValue, setValueСINotValue] = useState('');
	const [valueСIDeafault, setValueСIDeafault] = useState("чипс1, чипс2, чипс3,");
	const [valueСINotLastComma, setValueСINotLastComma] = useState("чипс1, чипс2, чипс3");
	const [valueСIValidQuotes, setValueСIValidQuotes] = useState('чипс1, "чипс2,", чипс3, чипс",4,",');
	const [valueСIInValidQuotes, setValueСIInValidQuotes] = useState('чипс1, чипс2, чипс3, чипс4,", чипс5, чипс,6,,');
	const [valueСINotEditChips, setValueСINotEditChips] = useState('чипс1, "ч,и,п,с,2,", "чипс3"');
	const [valueСINotClearChips, setValueСINotClearChips] = useState('чипс1, "ч,и,п,с,2,", чипс3');

	return (
		<main className='main'>
			<section className='content'>
				<Form>
					<h1 className='title'>
						<span className='subtitle'>Init not value</span>
					</h1>
					<ChipsInput
						id='chipsInputNotValue'
						name='chipsInputNotValue'
						placeholder="Введите ключевые слова"
						value={valueСINotValue}
						onChange={setValueСINotValue}
						isEditableChips
                        isClearableChips
					/>

					<h1 className='title'>
						<span className='subtitle'>Init valid value: </span>
						"чипс1, чипс2, чипс3,"
					</h1>
					<ChipsInput
						id='chipsInputDefault'
						name='chipsInputDefault'
						placeholder="Введите ключевые слова"
						value={valueСIDeafault}
						onChange={setValueСIDeafault}
						isEditableChips
                        isClearableChips
					/>
					
					<h1 className='title'>
						<span className='subtitle'>Init valid value: </span>
						"чипс1, чипс2, чипс3"
					</h1>
					<ChipsInput
						id='chipsInputNotLastComma'
						name='chipsInputNotLastComma'
						placeholder="Введите ключевые слова"
						value={valueСINotLastComma}
						onChange={setValueСINotLastComma}
						isEditableChips
                        isClearableChips
					/>
					
					<h1 className='title'>
						<span className='subtitle'>Init valid value and quotes: </span>
						'чипс1, "чипс2,", чипс3, чипс",4,",'
					</h1>
					<ChipsInput
						id='chipsInputValidQuotes'
						name='chipsInputValidQuotes'
						placeholder="Введите ключевые слова"
						value={valueСIValidQuotes}
						onChange={setValueСIValidQuotes}
						isEditableChips
                        isClearableChips
					/>

					<h1 className='title'>
						<span className='subtitle'>Init invalid quotes value: </span>
						'чипс1, чипс2, чипс3, "чипс4,", чипс5, чипс",6,,'
					</h1>
					<ChipsInput
						id='chipsInputInValidQuotes'
						name='chipsInputInValidQuotes'
						placeholder="Введите ключевые слова"
						value={valueСIInValidQuotes}
						onChange={setValueСIInValidQuotes}
						isEditableChips
                        isClearableChips
					/>
					
					<h1 className='title'>
						<span className='subtitle'>Init not editable chips: </span>
						'чипс1, "ч,и,п,с,2,", "чипс3"'
					</h1>
					<ChipsInput
						id='chipsInputNotEditChips'
						name='chipsInputNotEditChips'
						placeholder="Введите ключевые слова"
						value={valueСINotEditChips}
						onChange={setValueСINotEditChips}
						isClearableChips
					/>

					<h1 className='title'>
						<span className='subtitle'>Init not clearable chips: </span>
						'чипс1, "ч,и,п,с,2,", чипс3'
					</h1>
					<ChipsInput
						id='chipsInputNotClearChips'
						name='chipsInputNotClearChips'
						placeholder="Введите ключевые слова"
						value={valueСINotClearChips}
						onChange={setValueСINotClearChips}
						isEditableChips
					/>
				</Form>
			</section>
		</main>
	);
}

export default App;
