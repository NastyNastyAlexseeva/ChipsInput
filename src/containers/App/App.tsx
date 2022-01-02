import Form from '../Form';
import ChipsInput from '../../components/ChipsInput';

import './App.scss';

const App = () => {
	return (
		<main className='main'>
			<section className='content'>
				<Form>
					<ChipsInput />
				</Form>
			</section>
		</main>
	);
}

export default App;
