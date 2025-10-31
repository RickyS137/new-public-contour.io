import MicrofloraCard from 'components/cards/MicrofloraCard'
import cls from './MicrofloraPage.module.css'
import { frappe } from 'shared/frappeService'
import useMicrofloraStore from 'store/microflora.store'
import { useState, useEffect } from 'react'
import Pagination from 'components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'


const MicrofloraPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    frappe.client.get('api/method/gisbb_public_contour.www.public.index.get_microflora_filters').then(res => {      
      const inBookSelect = document.getElementById('f_s_organization');
      res?.data?.message?.f_s_organizations?.forEach(opt => {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        inBookSelect.appendChild(optionElement);
      });
      const kindSelect = document.getElementById('f_s_kind');
      res?.data?.message?.f_s_kinds?.forEach(opt => {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        kindSelect.appendChild(optionElement);
      });
      const viewSelect = document.getElementById('f_s_view');
      res?.data?.message?.f_s_views?.forEach(opt => {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        viewSelect.appendChild(optionElement);
      });
      const cultureTypeSelect = document.getElementById('f_s_culture_type');
      res?.data?.message?.f_s_culture_types?.forEach(opt => {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        cultureTypeSelect.appendChild(optionElement);
      });
      const objectOfSymbiosisSelect = document.getElementById('f_s_object_of_symbiosis');
      res?.data?.message?.f_s_object_of_symbiosiss?.forEach(opt => {
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
  const pageSize = 20
  const startIndex = (currentPage - 1) * pageSize
  const visibleMicroflora = microflora

  const [filters, setFilters] = useState({
    search: '',
    f_s_organization: '',
    f_s_kind: '',
    f_s_view: '',
    f_s_culture_type: '',
    f_s_object_of_symbiosis: ''
  });

  const fetchMicrofloraData = async (filters) => {
    try {
      const conditions = [];
      if (filters.search) conditions.push(['f_s_name', 'like', `%${filters.search}%`]);
      if (filters.f_s_organization) conditions.push(['f_s_organization', '=', filters.f_s_organization]);
      if (filters.f_s_kind) conditions.push(['f_s_kind', '=', filters.f_s_kind]);
      if (filters.f_s_view) conditions.push(['f_s_view', '=', filters.f_s_view]);
      if (filters.f_s_culture_type) conditions.push(['f_s_culture_type', '=', filters.f_s_culture_type]);
      if (filters.f_s_object_of_symbiosis) conditions.push(['f_s_object_of_symbiosis', '=', filters.f_s_object_of_symbiosis]);

      const filteredData = await frappe.getList('Cat Microflora', {
        start: startIndex,
        page_length: pageSize,
        fields: ["f_s_number","f_s_in_book", "f_s_kind", "f_s_view", "f_s_name", "f_s_culture_type", "f_s_culture_props", "f_s_enzyme_activity", "f_s_antigenic_structure", "f_s_stability_profile", "f_s_specific_activity", "f_s_other", "f_s_16s_rrna", "f_s_sequencing", "f_s_organization", "f_s_object_of_symbiosis", "f_s_note", "name"],
        filters: conditions
      });
      setMicroflora(filteredData);

      const totalFiltered = await frappe.getList('Cat Microflora', {
        fields: ["name"],
        limit: 0,
        filters: conditions
      });
      setTotalMicroflora(totalFiltered.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchMicrofloraData(filters);
  };

  useEffect(() => {
    fetchMicrofloraData(filters);
  }, [currentPage, startIndex]);

  return (
    <div className={cls.microfloraList}>
      <h2 className={cls.pageTitle}>
        Единый каталог государственной коллекции<br/> представителей нормальной микрофлоры
        <sup>
          <span id="total-flora">{totalMicroflora}</span>
        </sup>
      </h2>
      <p className={cls.subtitle}>
        Каталог ведется в соответствии с постановлением Правительства РФ от 16 апреля 2022 г. № 676 «Об утверждении Правил формирования, сохранения и развития государственной коллекции представителей нормальной микрофлоры человека, сельскохозяйственных животных и растений, а также криогенных банков образцов природных нормальных микробиоценозов (биоматериалов)» и на данный момент содержит {totalMicroflora} записей 
      </p>
      <div>
        <div className={cls.searchContainer}>
          <form className={cls.microfloraFiltersForm} onSubmit={handleFilterSubmit}>
            <div className={cls.buttonSection}>
              <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder="Поиск по наименованию"
                className={cls.searchInput}
                value={filters.search}
                onChange={handleFilterChange}
              />
              <button type="submit" className={cls.searchButton}>Найти</button>
              <button type="button" className={cls.addButton} onClick={() => navigate('/open-form/flora')}>Добавить</button>
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
          {
            microflora.length
            ? visibleMicroflora.map((item, i) => (
              <MicrofloraCard flora={item} key={startIndex + i}/>
            ))
            : <tr><td className={cls.emptyPage} colSpan={16}>Документы не найдены.</td></tr>
          }
        </tbody>
      </table>
    </div>
    <Pagination totalItems={totalMicroflora} pageSize={pageSize} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default MicrofloraPage