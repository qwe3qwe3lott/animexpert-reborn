import React from 'react';

import styles from './ModalWindow.module.scss';

type Props = {
	onClose: () => void
}

const ModalWindow: React.FC<Props> = ({onClose, children}) => {
	return (<div className={styles.modal} onClick={() => onClose()}>
		<div className={styles.form} onClick={(event) => event.stopPropagation()}>
			<button onClick={() => onClose()}>Закрыть</button>
			{children}
		</div>
	</div>);
};

export default ModalWindow;
