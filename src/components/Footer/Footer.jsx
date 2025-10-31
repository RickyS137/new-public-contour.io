import { Link } from 'react-router-dom'
import cls from './Footer.module.css'
import logo from '../../assets/gisbb_fav.png'

const Footer = () => {
  return (
    <footer>
        <div className={cls.footer}>
            <div className={cls.customContainer}>
            <div className={cls.footerInner}>
                <div className={cls.logo}>
                <Link to={'/main'}><img src={logo} alt="logo"/></Link>
                </div>
                <div>
                <ul className={cls.footerPageLinks}>
                    <li><span><Link to={"/open-news"}>Новости</Link></span></li>
                    <li><span><Link to={"/open-document"}>Документы</Link></span></li>
                    <li><span><Link to={"/open-microflora"}>Каталог микрофлоры</Link></span></li>
                </ul>
                </div>
                <div className={cls.footerEmail}>
                    Почта технической поддержки: <a href="mailto:gisbb@minzdrav.gov.ru" target="_blank" rel='noreferrer'>gisbb@minzdrav.gov.ru</a>
                </div>
            </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer