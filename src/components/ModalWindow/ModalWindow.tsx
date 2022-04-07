import React, {useEffect} from 'react';

import styles from './ModalWindow.module.scss';

type Props = {
	closable?: boolean
	onClose?: () => void
	header?: string
}

const ModalWindow: React.FC<Props> = ({header = '0_o', onClose, closable = true, children}) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	});
	const closeHandler = () => {
		if (closable && onClose) onClose();
	};
	return (<div className={styles.modal} onClick={closeHandler}>
		<div className={styles.form} onClick={(event) => event.stopPropagation()}>
			<div className={styles.header}>
				<h2 className={styles.title}>{header}</h2>
				{closable && <button className={styles.close} onClick={closeHandler}/>}
			</div>
			{children}
		</div>
	</div>);
};

export default ModalWindow;
