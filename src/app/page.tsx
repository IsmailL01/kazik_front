import Chat from '@/widgets/chat/ui';
import styles from './page.module.scss';

export default function Home() {
	return (
		<div className={styles.page}>
			<Chat />
		</div>
	);
}
