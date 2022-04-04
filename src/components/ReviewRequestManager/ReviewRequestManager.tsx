import React from 'react';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import RequestSettings from '../RequestSettings';
import {RequestParamTypes} from '../../types/RequestParam';

const ReviewRequestManager: React.FC = () => {
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();

	const {mainRequests: [mainAnimeRequest]} = useTypedSelector((state) => state.review);

	const changeHandler = (event: {paramType: RequestParamTypes, name: string, value: number}) => {
		console.log(event);
		reviewDispatch({type: ReviewActionTypes.CHANGE_REQUEST_NUMBER_PARAM_VALUE, payload: {
			type: RequestParamTypes.Number,
			requestId: mainAnimeRequest.id,
			paramName: event.name,
			value: event.value,
		}});
	};

	return (<div>
		<select>
			<option>{mainAnimeRequest.id}</option>
		</select>
		<RequestSettings request={mainAnimeRequest} onChange={changeHandler}/>
	</div>);
};

export default ReviewRequestManager;
