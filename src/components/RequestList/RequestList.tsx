import React, {ChangeEvent} from 'react';
import {Request, RequestTypes} from '../../types/Request';

type Props = {
	requests: Request[]
	onCreate: (requestType: RequestTypes) => void
	onEdit: (requestId: number) => void
	onDelete: (requestId: number) => void
	onLabelChange: (requestId: number, requestLabel: string) => void
}

const RequestList: React.FC<Props> = ({requests, onCreate, onDelete, onEdit, onLabelChange}) => {
	return (<div>
		<button onClick={() => onCreate(RequestTypes.Anime)}>Создать</button>
		<ul>
			{requests.map((request, key) =>
				<li key={key}>
					{request.id}
					<input value={request.label} onChange={(event: ChangeEvent<HTMLInputElement>) => onLabelChange(request.id, event.target.value)}/>
					<button onClick={() => onEdit(request.id)}>Настроить</button>
					<button onClick={() => onDelete(request.id)}>Удалить</button>
				</li>,
			)}
		</ul>
	</div>);
};

export default RequestList;
