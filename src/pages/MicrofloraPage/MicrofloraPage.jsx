import MicrofloraCard from 'components/cards/MicrofloraCard'
import cls from './MicrofloraPage.module.css'

const MockData = [
  {
    organization: 'organization 1',
    in_book: 'in book 1',
    kind: 'kind 1',
    view: 'view 1',
    name: 'name 1',
    culture_type: 'culture type 1',
    culture_props: 'culture props 1',
    enzyme_activity: 'enzyme activity 1',
    antigenic_structure: 'antigenic structure 1',
    stability_profile: 'stability profile 1',
    specific_activity: 'specific activity 1',
    other: 'other 1',
    s_rrna: '16s_rrna 1',
    sequencing: 'sequencing 1',
    object_of_symbiosis: 'object of symbiosis 1',
  },
  {
    organization: 'organization 2',
    in_book: 'in book 2',
    kind: 'kind 2',
    view: 'view 2',
    name: 'name 2',
    culture_type: 'culture type 2',
    culture_props: 'culture props 2',
    enzyme_activity: 'enzyme activity 2',
    antigenic_structure: 'antigenic structure 2',
    stability_profile: 'stability profile 2',
    specific_activity: 'specific activity 2',
    other: 'other 2',
    s_rrna: '16s_rrna 2',
    sequencing: 'sequencing 2',
    object_of_symbiosis: 'object of symbiosis 2',
  },
  {
    organization: 'organization 3',
    in_book: 'in book 3',
    kind: 'kind 3',
    view: 'view 3',
    name: 'name 3',
    culture_type: 'culture type 3',
    culture_props: 'culture props 3',
    enzyme_activity: 'enzyme activity 3',
    antigenic_structure: 'antigenic structure 3',
    stability_profile: 'stability profile 3',
    specific_activity: 'specific activity 3',
    other: 'other 3',
    s_rrna: '16s_rrna 3',
    sequencing: 'sequencing 3',
    object_of_symbiosis: 'object of symbiosis 3',
  },
]

const MicrofloraPage = () => {
  return (
    <div className={cls.microfloraList}>
      <h2 className={cls.pageTitle}>
        Единый каталог государственной коллекции<br/> представителей нормальной микрофлоры
        <sup>
          <span id="total-flora">0</span>
        </sup>
      </h2>
      <p className={cls.subtitle}>
        Каталог ведется в соответствии с постановлением Правительства РФ от 16 апреля 2022 г. № 676 «Об утверждении Правил формирования, сохранения и развития государственной коллекции представителей нормальной микрофлоры человека, сельскохозяйственных животных и растений,а также криогенных банков образцов природных нормальных микробиоценозов (биоматериалов)»
      </p>
      <div>
        <div className={cls.searchContainer}>
          <form id="microflora-filters-form" className={cls.microfloraFiltersForm}>
            <div className={cls.buttonSection}>
              <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder="Поиск по наименованию" 
                className={cls.searchInput}
              />
              <button type="submit" className={cls.searchButton}>Найти</button>
              <button type="button" className={cls.addButton}>Добавить</button>
            </div>
            <div className={cls.microfloraSelects}>
              <select name="f_s_in_book" id="f_s_in_book" className={cls.filterSelect}>
                <option value="">Все типы</option>
              </select>
              <select name="f_s_kind" id="f_s_kind" className={cls.filterSelect}>
                <option value="">Все роды</option>
              </select>
              <select name="f_s_view" id="f_s_view" className={cls.filterSelect}>
                <option value="">Все виды</option>
              </select>
              <select name="f_s_culture_type" id="f_s_culture_type" className={cls.filterSelect}>
                <option value="">Все типы культур</option>
              </select>
              <select name="f_s_object_of_symbiosis" id="f_s_object_of_symbiosis" className={cls.filterSelect}>
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
            <th rowspan="3">Организация</th>
            <th rowspan="3">Отдел</th>
            <th rowspan="3">Род</th>
            <th rowspan="3">Вид</th>
            <th rowspan="3">Наименование (код)</th>
            <th rowspan="3">Тип культуры</th>
            <th colspan="8" className={cls.groupHeader}>Наличие паспортных данных</th>
            <th rowspan="3">Организм-источник</th>
          </tr>
          <tr>
            <th colspan="6" className={cls.groupHeader}>Фенотипические характеристики</th>
            <th colspan="2" className={cls.groupHeader}>Генотипические характеристики</th>
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
            MockData.length
            ? MockData.map((item, i) => (
              <MicrofloraCard flora={item} key={16}/>
            ))
            : <tr><td className={cls.emptyPage} colSpan={16}>Документы не найдены.</td></tr>
          }
        </tbody>
      </table>
    </div>
    <div className="pagination" id="pagination"></div>
    </div>
  )
}

export default MicrofloraPage