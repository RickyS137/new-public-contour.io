import DocumentsCard from 'components/cards/DocumentsCard'
import cls from './DocumentsPage.module.css'
import useDocumentsStore from 'store/documents.store';
import { useEffect, useState, useCallback } from 'react';
import { frappe } from 'shared/frappeService';
import Pagination from 'components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import LoadingState from 'components/LoadingState/LoadingState';
import useAuthStore from 'store/auth.store';


const DocumentsPage = () => {
  const navigate = useNavigate();
  const { documents, setDocuments } = useDocumentsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuthStore()
  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleDocuments = documents;

  const [filters, setFilters] = useState({
    search: '',
    date_from: '',
    date_to: '',
    kind: '',
    status: ''
  });

  useEffect(() => {
    frappe.getFieldOptions('Cat NPA Document','f_opt_kind').then(res => {
      const kindSelect = document.getElementById('kind');
      res?.options?.forEach(opt => {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        kindSelect.appendChild(optionElement);
      });
    })
    frappe.getFieldOptions('Cat NPA Document','f_opt_status').then(res => {
      const statusSelect = document.getElementById('status');
      res?.options?.forEach(opt => {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        statusSelect.appendChild(optionElement);
      });
    })
  },[])

  const fetchDocumentsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const conditions = [];
      if (filters.search) conditions.push(['f_s_title', 'like', `%${filters.search}%`]);
      if (filters.kind) conditions.push(['f_opt_kind', '=', filters.kind]);
      if (filters.status) conditions.push(['f_opt_status', '=', filters.status]);
      if (filters.date_from) conditions.push(['f_dt_effective_date', '>=', filters.date_from]);
      if (filters.date_to) conditions.push(['f_dt_effective_date', '<=', filters.date_to]);

      const filteredData = await frappe.getList('Cat NPA Document', {
        start: startIndex,
        page_length: pageSize,
        fields: ["f_opt_kind", "f_opt_status", "f_opt_author", "f_s_title", "f_s_num", "f_dt_effective_date", "f_s_description", "f_a_doc", "name"],
        filters: conditions
      });
      setDocuments(filteredData);

      const totalFiltered = await frappe.getList('Cat NPA Document', {
        fields: ["name"],
        limit: 0,
        filters: conditions
      });
      setTotalDocuments(totalFiltered.length);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, startIndex, pageSize, setDocuments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); 
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDocumentsData();
  };

  useEffect(() => {
    fetchDocumentsData();
  }, [currentPage, fetchDocumentsData]);
  
  return (
    <div className={cls.documentList}>
    <div className={cls.pageHead}>
      <h2 className={cls.pageTitle}>
        Документы 
        <sup>
          <span id="total-documents">{totalDocuments}</span>
        </sup>
      </h2>
      <div className={cls.searchContainer}>
        <form id="document-filters-form" className={cls.documentFiltersForm} onSubmit={handleFilterSubmit}>
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
            {isAuthenticated && (
            <button type="button" className={cls.addButton} onClick={() => navigate('/open-form/document')}>Добавить</button>
            )}
          </div>
          <div className={cls.filterDataInputs}>
            <div className={cls.filterInputs}>
              <label htmlFor="date_from">Подписано после</label>
              <input 
                type="date" 
                name="date_from" 
                id="date_from" 
                className={cls.dateInput} 
                value={filters.date_from}
                onChange={handleFilterChange}
              />
              <label htmlFor="date_to">Подписано до</label>
              <input 
                type="date" 
                name="date_to" 
                id="date_to" 
                className={cls.dateInput} 
                value={filters.date_to}
                onChange={handleFilterChange}
              />
            </div>
            <div className={cls.filterSelects}>
              <select 
                name="kind" 
                id="kind" 
                className={cls.filterSelect}
                value={filters.kind}
                onChange={handleFilterChange}
              >
                <option value="">Все типы</option>
              </select>
              <select 
                name="status" 
                id="status" 
                className={cls.selectStatus}
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Все статусы</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className={cls.documentItems}>
      {isLoading ? (
        <LoadingState />
      ) : (
        visibleDocuments.map((item, i) => (
          <DocumentsCard document={item} key={startIndex + i}/>
        ))
      )}
    </div>
    <Pagination totalItems={totalDocuments} pageSize={pageSize} currentPage={currentPage} onPageChange={setCurrentPage} />
  </div>
  )
}

export default DocumentsPage