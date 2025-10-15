import { useNavigate } from 'react-router-dom'
import cls from './NewsItem.module.css'

const NewsItem = ({ item }) => {
  const { f_dt_pubdate, f_s_title, f_s_content, name } = item

  const navigate = useNavigate()
  return (
    <div className={cls.newsItem}>
      <div className={cls.newsDate}>
        <span>{f_dt_pubdate}</span>
      </div>
      <div className={cls.newsContent}>
        <h3>{f_s_title}</h3>
        <p>{f_s_content}</p>
        <span onClick={() => navigate(`/open-news/${name}`)} style={{cursor: 'pointer'}}>Подробнее...</span>
      </div>
    </div>
  )
}

export default NewsItem