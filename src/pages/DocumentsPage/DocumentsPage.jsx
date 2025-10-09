import DocumentsCard from 'components/cards/DocumentsCard'
import cls from './DocumentsPage.module.css'
import useDocumentsStore from 'store/documents.store';
import { useEffect } from 'react';
import FrappeService from 'shared/frappeService';

const frappe = new FrappeService();

const DocumentsPage = () => {
  const { documents, setDocuments } = useDocumentsStore();

  useEffect(() => {
    frappe.getList('Cat NPA Document', { fields:["f_opt_kind", "f_opt_status", "f_opt_author", "f_s_title", "f_s_num", "f_dt_effective_date", "f_s_description", "f_a_doc", "name"] })
    .then(res => setDocuments(res))
  },[ setDocuments ])
  
  return (
    <div className={cls.documentList}>
    <div className={cls.pageHead}>
      <h2 className={cls.pageTitle}>
        Документы 
        <sup>
          <span id="total-documents">{documents.length}</span>
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
            <div className={cls.filterInputs}>
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
            </div>
            <div className={cls.filterSelects}>
              <select name="kind" id="kind" className={cls.filterSelect}>
                <option value="">Все типы</option>
              </select>
              <select name="status" id="status" className={cls.selectStatus}>
                <option value="">Все статусы</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className={cls.documentItems}>
      {
        documents.map((item, i) => (
          <DocumentsCard document={item} key={i}/>
        ))
      }
    </div>
    <div className={cls.pagination}></div>
  </div>
  )
}

export default DocumentsPage