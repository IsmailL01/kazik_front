import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import BalanceDropdown from '../BalanceDropdown/BalanceDropdown';


const USER_ACTIONS = [
    {
        id: 'like',
        tag: 'link',
        href: '',
        src: '/like.svg',
        alt: 'Like',
        width: 32,
        height: 32,
        wrapperClass: 'header__wrapper-like'
    },
    {
        id: 'bell',
        tag: 'button', 
        src: '/bell.svg',
        alt: 'Notifications',
        width: 29,
        height: 29,
        wrapperClass: 'header__wrapper-bell'
    },
    {
        id: 'profile',
        tag: 'link',
        href: '',
        src: '/lc.svg',
        alt: 'Profile',
        width: 33,
        height: 33,
        wrapperClass: 'header__wrapper-personalaccountList',
        imgClass: 'header__wrapper-personalaccountItem'
    }
];

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                {/* Логотип */}
                <div className={styles['header__wrapper-logoImg']}>
                    <Image
                        src="/logoMain.svg"
                        alt='winvube_logo'
                        width={67}
                        height={58}
                        priority
                    />
                    <span className={styles['header__wrapper-logoName']}>WinVibe</span>
                </div>

                <div className={styles['header__wrapper-buttonList']}>
                    
                    {/* --- Блок для НЕ авторизованного пользователя (закомментирован) --- */}
                    {/* 
                    <Link href="" className={styles['header__wrapper-login']}>
                        Log In
                    </Link>
                    <Link href="" className={styles['header__wrapper-singin']}>
                        Sign up
                    </Link> 
                    */}

                    {/* --- Блок для авторизованного пользователя --- */}
                    
                    {/* Кнопка баланса (оставили как есть, так как структура уникальна) */}
                     
                    <BalanceDropdown />

                    <Link href="" className={styles['header__wrapper-balanceup']}>
                        Deposit
                    </Link>

                 
                    <div className={styles['header__wrapper-headerMenu']}>
                        {USER_ACTIONS.map((item) => {
                            
                            const IconImage = (
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    width={item.width}
                                    height={item.height}
                                    className={item.imgClass ? styles[item.imgClass] : undefined}
                                    priority
                                />
                            );

                            return item.tag === 'link' ? (
                                <Link 
                                    key={item.id} 
                                    href={item.href || ''} 
                                    className={styles[item.wrapperClass]}
                                >
                                    {IconImage}
                                </Link>
                            ) : (
                                <button 
                                    key={item.id} 
                                    className={styles[item.wrapperClass]}
                                >
                                    {IconImage}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;