import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';

import styles from './DebouncedTextArea.module.scss';

type Props = {
	value: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	delay?: number
	className?: string
	regExp?: RegExp
	onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
	placeholder?: string
}

const DebouncedTextArea: React.FC<Props> = ({value, onChange, delay = 1000, className, regExp, onKeyDown, placeholder}) => {
	const [tempValue, setTempValue] = useState(value);
	useEffect(() => {
		setTempValue(value);
	}, [value]);

	const [isEditing, setEditingFlag] = useState(false);

	const handler = useCallback(debounce((event: ChangeEvent<HTMLTextAreaElement>) => {
		setEditingFlag(false);
		onChange(event);
	}, delay), []);

	return (<textarea
		className={[className, styles.input, (isEditing ? styles.editing : '')].join(' ')}
		value={tempValue}
		placeholder={placeholder}
		onKeyDown={onKeyDown}
		onChange={(event) => {
			const value = event.target.value;
			if (regExp && !regExp.test(value)) {
				event.preventDefault();
				return;
			}
			setEditingFlag(true);
			setTempValue(value);
			handler(event);
		}}/>);
};

export default DebouncedTextArea;
