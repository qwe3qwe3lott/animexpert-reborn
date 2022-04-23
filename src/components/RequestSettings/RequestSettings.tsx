import React, {useMemo} from 'react';
import {Request} from '../../types/Request';
import {
	MultipleRequestParam,
	NumberRequestParam,
	RequestParamTypes,
	SingleRequestParam
} from '../../types/RequestParam';
import {RequestChangeEvent} from '../../types/RequestChangeEvent';

import styles from './RequestSettings.module.scss';

type Props = {
	request: Request
	onChange: (event: RequestChangeEvent) => void
}

const RequestSettings: React.FC<Props> = ({request, onChange}) => {
	console.log('RequestSettings', 'render');
	const [getNumberParams, getSingleParams, getMultipleParams] = useMemo(() => {
		const numberParams = request.params.filter((param) => param.type === RequestParamTypes.Number) as NumberRequestParam[];
		const singleParams = request.params.filter((param) => param.type === RequestParamTypes.Single) as SingleRequestParam[];
		const multipleParams = request.params.filter((param) => param.type === RequestParamTypes.Multiple) as MultipleRequestParam[];
		return [numberParams, singleParams, multipleParams];
	}, [request]);

	const numberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, param: NumberRequestParam) => {
		onChange({
			requestId: request.id,
			type: param.type,
			paramName: param.name,
			value: +event.target.value
		});
	};

	const singleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>, param: SingleRequestParam) => {
		onChange({
			requestId: request.id,
			type: param.type,
			paramName: param.name,
			value: event.target.value
		});
	};

	const multipleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, param: MultipleRequestParam) => {
		onChange({
			requestId: request.id,
			type: param.type,
			paramName: param.name,
			value: {
				valueOfValues: event.target.value,
				flag: event.target.checked
			}
		});
	};

	const defineMultiGroupClass = (length: number) =>
		length < 20 ? styles.multiGroup : [styles.multiGroup, styles.largeMultiGroup].join(' ');

	return (<div className={styles.container}>
		{getNumberParams.map((param, key) => <label className={styles.labelToTop} key={key}>
			{param.label}
			<input
				className={styles.input}
				type={'number'}
				min={param.restrictions.min}
				max={param.restrictions.max}
				value={param.value}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => numberChangeHandler(event, param)}
			/>
		</label>)}
		{getSingleParams.map((param, key) => <label key={key} className={styles.labelToTop}>
			{param.label}
			<select
				className={styles.select}
				value={param.value === null ? undefined : param.value}
				onChange={(event: React.ChangeEvent<HTMLSelectElement>) => singleChangeHandler(event, param)}
			>
				{param.restrictions.map((restriction, key) =>
					<option key={key} value={restriction.value}>{restriction.label}</option>
				)}
			</select>
		</label>)}
		{getMultipleParams.map((param, key) => <div key={key} className={defineMultiGroupClass(param.values.length)}>
			<p className={styles.multiGroupTitle}>{param.label}</p>
			{param.values.map((valueOfValues, key) => <label key={key} className={styles.labelToRight}>
				<input
					className={styles.checkbox}
					type={'checkbox'}
					checked={valueOfValues.check}
					value={valueOfValues.value}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => multipleChangeHandler(event, param)}
				/>
				{valueOfValues.label}
			</label>)}
		</div>)}
	</div>);
};

export default RequestSettings;
