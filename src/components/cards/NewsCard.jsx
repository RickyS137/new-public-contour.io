import { NavLink } from 'react-router-dom'
import cls from './NewsCard.module.css'

const NewsCard = ({ news }) => {
    const {
        f_s_title: title,
        f_dt_pubdate: pub_date,
        name
    } = news    

  return (
    <div className={cls.NewsCard}>
        <div className={cls.NewsTitle}>
            <h4>{title}</h4>
            <NavLink to={`/open-news/${name}`}>подробнее</NavLink>
        </div>
        <div>
          <span>{pub_date}</span>
        </div>
    </div>
  )
}

export default NewsCard