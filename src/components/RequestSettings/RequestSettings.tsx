import React from 'react';
import {Request} from '../../types/Request';
import {NumberRequestParam, RequestParamTypes} from '../../types/RequestParam';

type Props = {
	request: Request
	onChange: Function
}

const ReviewRequestManager: React.FC<Props> = ({request, onChange}) => {
	const getRestrictedParams = (): NumberRequestParam[] => request.params.filter((param) => param.type === RequestParamTypes.Number) as NumberRequestParam[];

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>, param: NumberRequestParam) => {
		onChange({paramType: param.type, name: param.name, value: +event.target.value});
	};

	return (<div>
		{getRestrictedParams().map((param, key) =>
			<input style={{background: 'gray'}} type={'number'} min={param.restrictions.min} max={param.restrictions.max} value={param.value} key={key} onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event, param)}/>,
		)}
	</div>);
};

export default ReviewRequestManager;
