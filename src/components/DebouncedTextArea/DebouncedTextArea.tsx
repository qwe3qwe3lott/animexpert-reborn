import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';

import styles from './DebouncedTextArea.module.scss';

type Props = {
	value: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	delay?: number
	className?: string
	regExp?: RegExp
	onBeforeChange?: (event: ChangeEvent<HTMLTextAreaElement>) => boolean
	placeholder?: string
}

const DebouncedTextArea: React.FC<Props> = ({value, onChange, delay = 1000, className, regExp, onBeforeChange, placeholder}) => {
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
		onChange={(event) => {
			if (onBeforeChange) {
				const toContinue = onBeforeChange(event);
				if (!toContinue) {
					console.log(123);
					event.preventDefault();
					return;
				}
			}
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
