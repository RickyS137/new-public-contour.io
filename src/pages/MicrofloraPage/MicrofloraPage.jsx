import MicrofloraCard from 'components/cards/MicrofloraCard'
import cls from './MicrofloraPage.module.css'
import { frappe } from 'shared/frappeService'
import useMicrofloraStore from 'store/microflora.store'
import { useState, useEffect, useCallback } from 'react'
import Pagination from 'components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import LoadingState from 'components/LoadingState/LoadingState'
import useAuthStore from 'store/auth.store'
import AuditModal from 'components/AuditModal/AuditModal'


const MicrofloraPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    frappe.client.get('api/method/gisbb_public_contour.www.public.index.get_microflora_filters').then(res => {      
      const inBookSelect = document.getElementById('f_s_organization');
      res?.data?.message?.f_s_organizations?.forEach(opt => {
        if (!inBookSelect) return;
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        inBookSelect.appendChild(optionElement);
      });
      const kindSelect = document.getElementById('f_s_kind');
      res?.data?.message?.f_s_kinds?.forEach(opt => {
        if (!kindSelect) return;
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        kindSelect.appendChild(optionElement);
      });
      const viewSelect = document.getElementById('f_s_view');
      res?.data?.message?.f_s_views?.forEach(opt => {
        if (!viewSelect) return;
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        viewSelect.appendChild(optionElement);
      });
      const cultureTypeSelect = document.getElementById('f_s_culture_type');
      res?.data?.message?.f_s_culture_types?.forEach(opt => {
        if (!cultureTypeSelect) return;
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        cultureTypeSelect.appendChild(optionElement);
      });
      const objectOfSymbiosisSelect = document.getElementById('f_s_object_of_symbiosis');
      res?.data?.message?.f_s_object_of_symbiosis?.forEach(opt => {
        if (!objectOfSymbiosisSelect) return;
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        objectOfSymbiosisSelect.appendChild(optionElement);
      });
    })
  },[])

  const { microflora, setMicroflora } = useMicrofloraStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalMicroflora, setTotalMicroflora] = useState(0)
  const [totalSearchMicroflora, setTotalSearchMicroflora] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [auditOpen, setAuditOpen] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const pageSize = 20
  const startIndex = (currentPage - 1) * pageSize

  const [filters, setFilters] = useState({
    f_s_name: '',
    f_s_organization: '',
    f_s_kind: '',
    f_s_view: '',
    f_s_culture_type: '',
    f_s_object_of_symbiosis: ''
  });

const fetchMicrofloraData = useCallback(async (filtersPayload = {}, page = 1) => {
    setIsLoading(true);
    try {
      const data = await frappe.getMicroflora(filtersPayload, Number(page), Number(pageSize));      
      
      if (data && data.flora) {
        setMicroflora(data.flora);
      } else {
        setMicroflora([]);
      }

      if (data && data.total_count !== undefined && data.total_count !== null) {
        setTotalSearchMicroflora(data.total_count);
      } else {
        setTotalSearchMicroflora(null);
      }

      try {
        const countData = await frappe.getMicrofloraCount();
        if (countData) {
          setTotalMicroflora(countData);
        }
      } catch (err) {
        console.error('Error getting microflora total count:', err);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMicroflora([]);
      setTotalMicroflora(0);
    } finally {
      setIsLoading(false);
    }
  }, [setMicroflora, pageSize]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMicrofloraData(filters, 1);
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    setFilters({
      f_s_name: '',
      f_s_organization: '',
      f_s_kind: '',
      f_s_view: '',
      f_s_culture_type: '',
      f_s_object_of_symbiosis: ''
    });
    setCurrentPage(1);
    fetchMicrofloraData({}, 1);
  }

  const openAuditModal = () => {
    setAuditOpen(true);
  }
  

  useEffect(() => {
    fetchMicrofloraData(filters, currentPage);
  }, [currentPage, fetchMicrofloraData, filters]);

  return (
    <div className={cls.microfloraList}>
      <h2 className={cls.pageTitle}>
        Единый каталог государственной коллекции<br/> представителей нормальной микрофлоры
        <sup>
          <span id="total-flora">{totalSearchMicroflora}</span>
        </sup>
      </h2>
      <p className={cls.subtitle}>
        Каталог ведется в соответствии с постановлением Правительства РФ от 16 апреля 2022 г. № 676 «Об утверждении Правил формирования, сохранения и развития государственной коллекции представителей нормальной микрофлоры человека, сельскохозяйственных животных и растений, а также криогенных банков образцов природных нормальных микробиоценозов (биоматериалов)» и на данный момент содержит {totalMicroflora} записей 
      </p>
      <div>
        <div className={cls.searchContainer}>
          <form className={cls.microfloraFiltersForm} onSubmit={handleFilterSubmit}>
            { isAuthenticated && (
                <button type="button" className={cls.searchButton} onClick={openAuditModal}>Журналирование изменений</button>
              ) }
            <div className={cls.buttonSection}>
              <input 
                type="text" 
                name="f_s_name" 
                id="search" 
                placeholder="Поиск по наименованию"
                className={cls.searchInput}
                value={filters.f_s_name}
                onChange={handleFilterChange}
              />
              <button type="submit" className={cls.searchButton}>Найти</button>
              {
                isAuthenticated && (
                  <button type="button" className={cls.addButton} onClick={() => navigate('/open-form/flora')}>Добавить</button>
                )
              }
            </div>
            <div className={cls.microfloraSelects}>
              <select 
                name="f_s_organization" 
                id="f_s_organization" 
                className={cls.filterSelect}
                value={filters.f_s_organization}
                onChange={handleFilterChange}
              >
                <option value="">Все организации</option>
              </select>
              <select 
                name="f_s_kind" 
                id="f_s_kind" 
                className={cls.filterSelect}
                value={filters.f_s_kind}
                onChange={handleFilterChange}
              >
                <option value="">Все роды</option>
              </select>
              <select 
                name="f_s_view" 
                id="f_s_view" 
                className={cls.filterSelect}
                value={filters.f_s_view}
                onChange={handleFilterChange}
              >
                <option value="">Все виды</option>
              </select>
              <select 
                name="f_s_culture_type" 
                id="f_s_culture_type" 
                className={cls.filterSelect}
                value={filters.f_s_culture_type}
                onChange={handleFilterChange}
              >
                <option value="">Все типы культур</option>
              </select>
              <select 
                name="f_s_object_of_symbiosis" 
                id="f_s_object_of_symbiosis" 
                className={cls.filterSelect}
                value={filters.f_s_object_of_symbiosis}
                onChange={handleFilterChange}
              >
                <option value="">Все организмы-источники</option>
              </select>
              <button className={cls.addButton} type="submit" onClick={handleClearFilters}>Сброс</button>
            </div>
          </form>
        </div>    
      </div>
    <div className={cls.tableContainer}>
      <table>
        <thead>
          <tr>
            <th rowSpan="3">Организация</th>
            <th rowSpan="3">Род</th>
            <th rowSpan="3">Вид</th>
            <th rowSpan="3">Наименование (код)</th>
            <th rowSpan="3">Тип культуры</th>
            <th colSpan="8" className={cls.groupHeader}>Наличие паспортных данных</th>
            <th rowSpan="3">Организм-источник</th>
          </tr>
          <tr>
            <th colSpan="6" className={cls.groupHeader}>Фенотипические характеристики</th>
            <th colSpan="2" className={cls.groupHeader}>Генотипические характеристики</th>
          </tr>
          <tr>
            <th>Культурально-морфологические свойства</th>
            <th>Профиль ферментационной активности</th>
            <th>Антигенная структура</th>
            <th>Профиль а/м устойчивости</th>
            <th>Специфическая активность</th>
            <th>Иное (указать)</th>
            <th>16S рРНК</th>
            <th>Секвенирование</th>
          </tr>
        </thead>
        <tbody className={cls.floraItems}>
          {isLoading ? (
            <tr><td colSpan={16}><LoadingState /></td></tr>
          ) : (
            microflora.length
            ? microflora.map((item, i) => (
              <MicrofloraCard flora={item} key={startIndex + i}/>
            ))
            : <tr><td className={cls.emptyPage} colSpan={16}>Документы не найдены.</td></tr>
          )}
        </tbody>
      </table>
    </div>
    {
      auditOpen && (
        <AuditModal
          isOpen={auditOpen} 
          setIsOpen={setAuditOpen}
        />
      )
    }
    <Pagination 
      totalItems={
        totalSearchMicroflora !== null
        ? totalSearchMicroflora
        : totalMicroflora
      } 
      pageSize={pageSize} 
      currentPage={currentPage} 
      onPageChange={setCurrentPage} 
    />
    </div>
  )
}

export default MicrofloraPage