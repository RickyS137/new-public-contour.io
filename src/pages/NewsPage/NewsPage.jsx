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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNews, setTotalNews] = useState(0);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleNews = news;

  const [filters, setFilters] = useState({
    search: '',
    date_from: '',
    date_to: ''
  });

  const fetchNewsData = async () => {
    try {
      // Формируем условия фильтрации
      const conditions = [];
      if (filters.search) conditions.push(['f_s_title', 'like', `%${filters.search}%`]);
      if (filters.date_from) conditions.push(['f_dt_pubdate', '>=', filters.date_from]);
      if (filters.date_to) conditions.push(['f_dt_pubdate', '<=', filters.date_to]);

      const filteredData = await frappe.getList('Cat News', {
        start: startIndex,
        page_length: pageSize,
        fields: ["f_s_title", "f_s_content", "f_dt_pubdate", "name"],
        filters: conditions
      });
      setNews(filteredData);

      const totalFiltered = await frappe.getList('Cat News', {
        fields: ["name"],
        page_length: 0,
        filters: conditions
      });
      setTotalNews(totalFiltered.length);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchNewsData();
  };

  useEffect(() => {
    fetchNewsData();
  }, [currentPage]);

  return (
    <div className={cls.news}>
        <div className={cls.pageHead}>
        <h2 className={cls.pageTitle}>
            Новости
            <sup>
            <span id="total-news">{totalNews}</span>
            </sup>
        </h2>
        <div className={cls.searchContainer}>
            <form id={cls.newsFiltersForm} className={cls.newsFiltersForm} onSubmit={handleFilterSubmit}>
            <div className={cls.buttonSection}>
                <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder="Поиск по названию" 
                className={cls.searchInput}
                value={filters.search}
                onChange={handleFilterChange}
                />
                <button type="submit" className={cls.searchButton}>Найти</button>
                <button type="button" className={cls.addButton} onClick={() => navigate('/open-form/new')}>Добавить</button>
            </div>
            <div className={cls.filterDataInputs}>
                <label htmlFor="date_from">С</label>
                <input 
                type="date" 
                name="date_from" 
                id="date_from" 
                className={cls.dateInput}
                value={filters.date_from}
                onChange={handleFilterChange}
                />
                <label htmlFor="date_to">По</label>
                <input 
                type="date" 
                name="date_to" 
                id="date_to" 
                className={cls.dateInput}
                value={filters.date_to}
                onChange={handleFilterChange}
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
        <Pagination totalItems={totalNews} pageSize={pageSize} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default NewsPage