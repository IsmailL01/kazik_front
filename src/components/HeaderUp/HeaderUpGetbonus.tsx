'use client'; 

import Image from 'next/image';
import styles from './HeaderUp.module.scss';
import { useDisclosure } from '@mantine/hooks'; 
import AuthModal from '@/components/AuthModal/AuthModal'; 

const HeaderUpGetbonus = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <div className={styles.getbonus}>
                <div className={styles.getbonus__main}>
                    <div className={styles['getbonus__main-wrapper']}>
                        <div className={styles['getbonus__main-title']}>
                            The best conditions for an exciting start
                        </div>
                        <button 
                            className={styles['getbonus__main-registrationLink']} 
                            onClick={open}
                            type="button"
                        >
                            Sign up and immediately get a bonus on your account!
                        </button>
                    </div>

                    <button className={styles['getbonus__main-closeButton']}>
                        <Image 
                            src="/closeButton.svg"
                            alt='winvube_closeButton'
                            width={28}
                            height={28}
                            priority
                        />
                    </button>
                </div>
            </div>
            <AuthModal opened={opened} onClose={close} />
        </>
    );
}

export default HeaderUpGetbonus;