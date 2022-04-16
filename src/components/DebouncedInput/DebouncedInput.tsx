import React, {ChangeEvent, useCallback, useState} from 'react';
import {debounce} from 'lodash';

import styles from './DebouncesInput.module.scss';

type Props = {
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	delay?: number
	className?: string
	regExp?: RegExp
}

const DebouncedInput: React.FC<Props> = ({value, onChange, delay = 1000, className, regExp}) => {
	const [tempValue, setTempValue] = useState(value);
	const [isEditing, setEditingFlag] = useState(false);
	const handler = useCallback(debounce((event: ChangeEvent<HTMLInputElement>) => {
		setEditingFlag(false);
		onChange(event);
	}, delay), []);
	return (<input
		className={[className, styles.input, (isEditing ? styles.editing : '')].join(' ')}
		value={tempValue}
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

export default DebouncedInput;
