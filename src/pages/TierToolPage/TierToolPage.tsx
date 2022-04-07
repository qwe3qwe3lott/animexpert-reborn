import React, {useEffect} from 'react';
import {useMessageDisplayer} from '../../hooks/useMessageDisplayer';


const TierToolPage: React.FC = () => {
	useEffect(() => {
		useMessageDisplayer(['ты лалочка?', 'ответь'], [{label: 'да', action: ()=>{
			window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')?.focus();
		}}, {label: 'нет', action: ()=>{
			window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')?.focus();
		}}], 'Важный вопрос');
	});
	return (<div>
		in progress...
	</div>);
};

export default TierToolPage;
