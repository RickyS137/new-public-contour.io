import { Link, useNavigate } from 'react-router-dom';
import cls from './Header.module.css'
import logo from '../../assets/gis_bb.png'
import { useState } from 'react';
import useMediaQuery from 'shared/useMediaQuery';
import AuthModalMobile from 'components/AuthModalMobile/AuthModalMobile';
import useAuthStore from 'store/auth.store';

const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width: 768px)');

    function redirectToLogin() {
        const currentURL = window.location.origin; // Получаем текущий URL (например, https://example.com)
    // protocol not needed here
        const host = window.location.host; // Получаем хост (например, gisbb.sechenov.ru)

        /*
             Получаем специально сформированный урл авторизации прямо в Аванпост
        */
        const getAuth = () => {
            return fetch(`https://internal-gisbb.minzdrav.gov.ru/api/method/avanpost_fam.integrations.auth.get_login_url?site=internal-gisbb.minzdrav.gov.ru`)
            .then(res => res.json())
            .then(res => {
                return res?.message
            })
            .catch(e => {
                console.error(e);
                return null;
            })
        }

        if (host.startsWith("gisbb") ) {
            // const newURL = protocol + "//internal-" + host; // Добавляем "internal-" перед хостом
            // Если хост начинается с "gisbb", формируем новый URL с "internal"
            
            getAuth()
            .then((res)=>{
                if ( res ) {
                    const {url} = res;
                        window.location.href = url;
                } 
            })
        } else {
            // Для других хостов добавляем "/login"
            const loginURL = currentURL + '/login';
            window.location.href = loginURL; // Перенаправляем на /login
        }
        fetch('/api/method/gisbb_public_contour.templates.includes.header.get_login_url')
        .then(res => res.json())
        .then(res => {
            const { url, test_mode } = res.message.message || {};
            if (url) {
                    if (test_mode) {
                        window.location.href = url;
                    } else {
                        window.location.href = url;
                    }
            }
        })
        .catch(err => console.error(err));
    }

    const isAuth = useAuthStore(state => state.isAuthenticated);
    const logout = useAuthStore(state => state.logout);

    const handleAuthClick = () => {
        if (isAuth) {
            // If authenticated, logout
            try { logout(); } catch (e) { console.error(e); }
            navigate('/main');
            return;
        }

        // Not authenticated: mobile opens modal, desktop navigates to auth
        if (isMobile) { setOpen(!open); }
        else { navigate('/auth'); }
    }

  return (
    <header>
        <div className={cls.header}>
            <div className={cls.customContainer}>
                <div className={cls.headerInner}>
                    <div>
                        <div className={cls.logo}>
                            <Link to={"/main"}><img src={logo} alt="logo"/></Link>
                        </div>
                    </div>
                    <nav>
                        <ul className={cls.pageLinks}>
                            <li><span><Link to={"/open-news"}>Новости</Link></span></li>
                            <li><span><Link to={"/open-document"}>Документы</Link></span></li>
                            <li><span><Link to={"/open-microflora"}>Каталог микрофлоры</Link></span></li>
                        </ul>
                    </nav>
                    <div>
                        <button className={cls.login} onClick={handleAuthClick}>
                            <span>{isAuth ? 'Выйти' : 'Войти'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {isMobile && open && (
            <AuthModalMobile
                open={open}
                onAccept={() => {
                setOpen(false);
                redirectToLogin();
                }}
                onCancel={() => setOpen(false)}
            />
        )}
    </header>
  )
}

export default Header