import ModalWindow from '../ModalWindow';
import React from 'react';
import {ModalList} from '../../types/ModalList';

import styles from './ListDisplayer.module.scss';

type Props = {
	header?: string
	onClose?: () => void
	modalList: ModalList
}

const ListDisplayer: React.FC<Props> = ({header, onClose, modalList}) => {
	return (<ModalWindow header={header} onClose={onClose}>
		<ul className={styles.list}>
			{modalList.map((element, key) => <li key={key}>
				<button className={styles.button} onClick={() => {
					element.action();
				}}>{element.label}</button>
			</li>)}
		</ul>
	</ModalWindow>);
};

export default ListDisplayer;
