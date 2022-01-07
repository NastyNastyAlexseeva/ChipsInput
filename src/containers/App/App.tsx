import { useState } from 'react';
import Form from '../Form';
import ChipsInput from '../../components/ChipsInput';

import './App.scss';

const App = () => {
	const [valueСIDefault, setValueСIDefault] = useState("чипс1, чипс2, чипс3");

	// const handlerInput = (event: React.ChangeEvent<HTMLLabelElement>) => {
	// 	// console.log('handler is app',event.target.getAttribute('data-value'))
	// 	setValueСIDefault(event.target.innerText);
	// }

	return (
		<main className='main'>
			<section className='content'>
				<Form>
					<ChipsInput
						id='chipsInputDefault'
						name='chipsInputDefault'
						placeholder="Введите ключевые слова"
						value={valueСIDefault}
						onChange={setValueСIDefault} />
				</Form>
			</section>
		</main>
	);
}

export default App;
