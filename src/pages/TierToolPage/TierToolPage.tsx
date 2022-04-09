import React, {useEffect} from 'react';
import {displayModalMessage} from '../../util/displayModalMessage';


const TierToolPage: React.FC = () => {
	useEffect(() => {
		displayModalMessage({
			paragraphs: ['ты лалочка?', 'ответь'],
			actions: [
				{label: 'да', action: ()=>{
					window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')?.focus();
				}},
				{label: 'нет', action: ()=>{
					window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')?.focus();
				}},
			],
			header: 'Важный вопрос',
		});
	});
	return (<div>
		in progress...
	</div>);
};

export default TierToolPage;
