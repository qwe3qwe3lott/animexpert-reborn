import React, {KeyboardEvent, useState} from 'react';
import DebouncedTextArea from '../DebouncedTextArea';
import {ModalList} from '../../types/ModalList';
import ListDisplayer from '../ListDisplayer';
import {Request} from '../../types/Request';
import {useTypedSelector} from '../../hooks/useTypedSelector';

type Props = {
	text: string
	onChange: (text: string) => void
	className?: string
}

const TextAreaWithContex: React.FC<Props> = ({text, onChange, className}) => {
	console.log('TextAreaWithContex', 'render');

	const [isModalListShowed, setShowModalListFlag] = useState(false);
	const [modalList, setModalList] = useState<ModalList>([]);

	const requests = useTypedSelector((state) => state.requests.requests);

	const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		switch (event.key) {
		case '@':
			event.preventDefault();

			const textArea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
			text = textArea.value;
			const textAreaSelection = {start: textArea.selectionStart, end: textArea.selectionEnd};

			const requestsList: ModalList = [{label: 'Символ @', action: () => requestSelectHandler('@', textAreaSelection, textArea)}];
			for (const textRequest of requests) {
				requestsList.push({label: textRequest.label, action: () => requestSelectHandler(textRequest, textAreaSelection, textArea)});
			}
			setModalList(requestsList);

			setShowModalListFlag(true);
		}
	};

	const requestSelectHandler = (request: Request | string, textAreaSelection: {start: number, end: number}, textArea: HTMLTextAreaElement) => {
		const newPart = (typeof request === 'string') ? request : `@${request.type}|${request.id}|${request.label};`;
		const newText = `${text.substring(0, textAreaSelection.start)}${newPart}${text.substring(textAreaSelection.end, text.length)}`;
		onChange(newText);
		setShowModalListFlag(false);

		if (textArea) {
			textArea.focus();
			const index = textAreaSelection.start + newPart.length;
			setTimeout(function() {
				textArea.setSelectionRange(index, index);
			}, 0);
		}
	};

	return (<>
		{isModalListShowed && <ListDisplayer modalList={modalList} header={'Выберите запрос'} onClose={() => setShowModalListFlag(false)}/>}
		<DebouncedTextArea
			className={className}
			value={text}
			placeholder={'Для использования текстовых запросов введите символ @. Текстовые запросы создаются в списке запросов.'}
			onChange={(event) => onChange(event.target.value)}
			onKeyDown={keyDownHandler}
		/>
	</>);
};

export default TextAreaWithContex;
