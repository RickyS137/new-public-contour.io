import DocumentsCard from 'components/cards/DocumentsCard'
import cls from './DocumentsPage.module.css'

const MockData = [
  {
    kind: 'testkind1',
    status: 'Действует',
    document_author: 'document author',
    title: 'Title',
    num: '1',
    effective_date: '29.11.2004',
    description: 'description 1',
    doc: 'testdocument1',
  },
  {
    kind: 'testkind2',
    status: 'Утратил силу или отменен',
    document_author: 'document author',
    title: 'Title2',
    num: '2',
    effective_date: '29.11.2004',
    description: 'description 2',
    doc: 'testdocument2',
  },
  {
    kind: 'testkind3',
    status: 'test status',
    document_author: 'document author',
    title: 'Title3',
    num: '3',
    effective_date: '29.11.2004',
    description: 'description 3',
    doc: 'testdocument3',
  },
]

const DocumentsPage = () => {
  return (
    <div className={cls.documentList}>
    <div className={cls.pageHead}>
      <h2 className={cls.pageTitle}>
        Документы 
        <sup>
          <span id="total-documents">0</span>
        </sup>
      </h2>
      <div className={cls.searchContainer}>
        <form id="document-filters-form" className={cls.documentFiltersForm}>
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
            <label for="date_from">Подписано после</label>
            <input 
              type="date" 
              name="date_from" 
              id="date_from" 
              className={cls.dateInput} 
              placeholder="Дата от"
            />
            <label for="date_to">Подписано до</label>
            <input 
              type="date" 
              name="date_to" 
              id="date_to" 
              className={cls.dateInput} 
              placeholder="Дата до"
            />
            <select name="kind" id="kind" className={cls.filterSelect}>
              <option value="">Все типы</option>
            </select>
            <select name="status" id="status" className={cls.selectStatus}>
              <option value="">Все статусы</option>
            </select>
          </div>
        </form>
      </div>
    </div>
    <div className={cls.documentItems}>
      {
        MockData.map((item, i) => (
          <DocumentsCard document={item} key={i}/>
        ))
      }
    </div>
    <div className={cls.pagination}></div>
  </div>
  )
}

export default DocumentsPage