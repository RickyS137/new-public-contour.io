import MicrofloraCard from 'components/cards/MicrofloraCard'
import cls from './MicrofloraPage.module.css'
import FrappeService from 'shared/frappeService'
import useMicrofloraStore from 'store/microflora.store'
import { useEffect } from 'react'

const frappe = new FrappeService()

const MicrofloraPage = () => {

  const { microflora, setMicroflora } = useMicrofloraStore()

  useEffect(() => {
    frappe.getList('Cat Microflora', { fields:["f_s_organization ","f_s_in_book", "f_s_kind", "f_s_view", "f_s_name", "f_s_culture_type", "f_s_culture_props", "f_s_enzyme_activity", "f_s_antigenic_structure", "f_s_stability_profile", "f_s_specific_activity", "f_s_other", "f_s_16s_rrna", "f_s_sequencing", "f_s_object_of_symbiosis", "name"] })
    .then(res => {setMicroflora(res)})
  },[ setMicroflora ])

  return (
    <div className={cls.microfloraList}>
      <h2 className={cls.pageTitle}>
        Единый каталог государственной коллекции<br/> представителей нормальной микрофлоры
        <sup>
          <span id="total-flora">0</span>
        </sup>
      </h2>
      <p className={cls.subtitle}>
        Каталог ведется в соответствии с постановлением Правительства РФ от 16 апреля 2022 г. № 676 «Об утверждении Правил формирования, сохранения и развития государственной коллекции представителей нормальной микрофлоры человека, сельскохозяйственных животных и растений, а также криогенных банков образцов природных нормальных микробиоценозов (биоматериалов)» и на данный момент содержит 12707 записей 
      </p>
      <div>
        <div className={cls.searchContainer}>
          <form className={cls.microfloraFiltersForm}>
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
            ? microflora.map((item, i) => (
              <MicrofloraCard flora={item} key={i}/>
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