import React, {useState} from 'react';
import {Request, RequestTypes} from '../../types/Request';

import styles from './RequestList.module.scss';
import {interpreter} from '../../util/interpreter';
import DebouncedInput from '../DebouncedInput';
import {requestLabelRegExp} from '../../regularExpressions';

type Props = {
	requests: Request[]
	onCreate: (requestType: RequestTypes) => void
	onEdit: (requestId: number) => void
	onDelete: (requestId: number) => void
	onLabelChange: (requestId: number, requestLabel: string) => void
}

const RequestList: React.FC<Props> = ({requests, onCreate, onDelete, onEdit, onLabelChange}) => {
	console.log('RequestList', 'render');
	const [requestType, setRequestType] = useState(RequestTypes.Anime);
	return (<div className={styles.layout}>
		<label className={styles.labelToLeft}>
			Тип запроса:
			<select className={styles.select} value={requestType} onChange={(event) => setRequestType(event.target.value as RequestTypes)}>
				{Object.values(RequestTypes).map((requestType, key) => <option key={key} value={requestType}>
					{interpreter.interpretRequestType(requestType)}
				</option>)}
			</select>
		</label>
		<button className={styles.button} onClick={() => onCreate(requestType)}>Создать</button>
		<ul className={styles.list}>
			{requests.map((request, key) =>
				<li key={key} className={styles.element}>
					<p>{request.id}</p>
					<DebouncedInput className={styles.input} regExp={requestLabelRegExp} value={request.label} onChange={(event) => onLabelChange(request.id, event.target.value)}/>
					<button className={styles.edit} onClick={() => onEdit(request.id)}/>
					<button className={styles.delete} onClick={() => onDelete(request.id)}/>
				</li>,
			)}
		</ul>
	</div>);
};

export default RequestList;
