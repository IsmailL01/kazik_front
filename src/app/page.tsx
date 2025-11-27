import styles from './page.module.scss';

import Chat from '@/widgets/chat/ui';

export default function Home() {
	return (
		<div className={styles.page}>
			<Chat />
		</div>
	);
}
