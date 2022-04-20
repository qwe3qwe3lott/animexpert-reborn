import React, {useEffect} from 'react';
import {displayModalMessage} from '../../store/actions/displayModalMessage';
import {useDispatch} from 'react-redux';
import {RootThunkDispatch} from '../../store/reducers';

const TierToolPage: React.FC = () => {
	const dispatch: RootThunkDispatch = useDispatch();
	useEffect(() => {
		dispatch(displayModalMessage({
			paragraphs: ['ты лалочка?', 'ответь'],
			actions: [
				{label: 'да', action: ()=>{
					window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')?.focus();
				}},
				{label: 'нет', action: ()=>{
					window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')?.focus();
				}}
			],
			header: 'Важный вопрос'
		}));
	});
	return (<div>
		in progress...
	</div>);
};

export default TierToolPage;
