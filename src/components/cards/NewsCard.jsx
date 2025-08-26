import { NavLink } from 'react-router-dom'
import cls from './NewsCard.module.css'

const NewsCard = ({ news }) => {
    const {
        title,
        pub_date,
        link
    } = news    

  return (
    <div className={cls.NewsCard}>
        <div className={cls.NewsTitle}>
            <h5>{title}</h5>
            <NavLink to={link}>подробнее</NavLink>
        </div>
        <div>
          <span>{pub_date}</span>
        </div>
    </div>
  )
}

export default NewsCard