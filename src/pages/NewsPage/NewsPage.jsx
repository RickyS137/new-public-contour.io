import NewsCard from 'components/cards/NewsCard'
import cls from './NewsPage.module.css'

const MockData = [
  {
    title: 'Test title',
    link: 'link1',
    pub_date: '29.11.2004',
  },
  {
    title: 'Test title 2',
    link: 'link2',
    pub_date: '29.11.2004',
  },
  {
    title: 'Test title 3',
    link: 'link3',
    pub_date: '29.11.2004',
  },
  {
    title: 'Test title 4',
    link: 'link4',
    pub_date: '29.11.2004',
  },
]

const NewsPage = () => {
  return (
    <div className={cls.news}>
        <div className={cls.pageHead}>
        <h2 className={cls.pageTitle}>
            Новости
            <sup>
            <span id="total-news">0</span>
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
                  <button type="button" className={cls.addButton}>Добавить</button>
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
            MockData.map((item, i) => (
              <NewsCard news={item} key={i}/>
            ))
          }
        </div>
        <div className="pagination" id="pagination"></div>
    </div>
  )
}

export default NewsPage