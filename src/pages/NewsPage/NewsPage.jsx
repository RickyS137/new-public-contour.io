import NewsCard from 'components/cards/NewsCard'
import cls from './NewsPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { frappe } from 'shared/frappeService';
import useNewsStore from 'store/news.store';
import Pagination from 'components/Pagination/Pagination'

// use shared frappe instance

const NewsPage = () => {
  const navigate = useNavigate();

  const { news, setNews } = useNewsStore();
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalItems = news ? news.length : 0
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const visibleNews = news ? news.slice(startIndex, endIndex) : []
  
  useEffect(() => {
    frappe.getList('Cat News', { 
      start: startIndex,
      page_length: pageSize,
      fields:["f_s_title", "f_s_content", "f_dt_pubdate", "name"]
     })
    .then(res => setNews(res))
  },[ setNews, startIndex ])

  return (
    <div className={cls.news}>
        <div className={cls.pageHead}>
        <h2 className={cls.pageTitle}>
            Новости
            <sup>
            <span id="total-news">{news?.length}</span>
            </sup>
        </h2>
        <div className={cls.searchContainer}>
            <form id={cls.newsFiltersForm} className={cls.newsFiltersForm}>
            <div className={cls.buttonSection}>
                <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder="Поиск по названию" 
                className={cls.searchInput}
                />
                <button type="submit" className={cls.searchButton}>Найти</button>
                  <button type="button" className={cls.addButton} onClick={() => navigate('/open-microflora-create/news')}>Добавить</button>
            </div>
            <div className={cls.filterDataInputs}>
                <label htmlFor="date_from">С</label>
                <input 
                type="date" 
                name="date_from" 
                id="date_from" 
                className={cls.dateInput} 
                placeholder="Дата от"
                />
                <label htmlFor="date_to">По</label>
                <input 
                type="date" 
                name="date_to" 
                id="date_to" 
                className={cls.dateInput} 
                placeholder="Дата до"
                />
            </div>
            </form>
        </div>    
        </div>
        <div className={cls.newsList}>
          <div className={cls.newsHeader}>
            <span>Заголовок</span>
            <span>Дата размещения</span>
          </div>
          {
            visibleNews && visibleNews.map((item, i) => (
              <NewsCard news={item} key={startIndex + i}/>
            ))
          }
        </div>
        <Pagination totalItems={totalItems} pageSize={pageSize} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default NewsPage