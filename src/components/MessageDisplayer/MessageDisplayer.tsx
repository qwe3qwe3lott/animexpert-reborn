import React from 'react';
import {Dispatch} from 'redux';
import {OtherAction, OtherActionTypes} from '../../store/reducers/other/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import ModalWindow from '../ModalWindow';
import styles from './MessageDisplayer.module.scss';

const MessageDisplayer: React.FC = () => {
	const otherDispatch: Dispatch<OtherAction> = useDispatch();

	const {message} = useTypedSelector((state) => state.other);

	return (<>
		{message !== null && <ModalWindow header={message.header} closable={message.closable} onClose={() => otherDispatch({type: OtherActionTypes.SET_MESSAGE, payload: null})}>
			<div className={styles.container}>
				{message.paragraphs.map((paragraph, key) => <p key={key} className={styles.paragraph}>
					{paragraph}
				</p>)}
				{message.actions && <div className={styles.actions}>
					{message.actions.map((action, key) => <button key={key} onClick={action.action} className={styles.button}>
						{action.label}
					</button>)}
				</div>}
			</div>
		</ModalWindow>}
	</>);
};

export default MessageDisplayer;
