import React, { useEffect, useState } from 'react'
import cls from './FloraPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import FieldInput from 'components/FieldInput/FieldInput'
import { frappe } from 'shared/frappeService'
import useMicrofloraStore from 'store/microflora.store'

// use shared frappe instance

const FloraPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { currentFlora, setCurrentFlora } = useMicrofloraStore() 

  useEffect(() => {
    frappe.getDoc('Cat Microflora', id).then(res => setCurrentFlora(res))
  },[ id, setCurrentFlora ])

  

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className={cls.floraInfo}>
      <div className={cls.floraTitle}>
        <h4>Коллекция представителей нормальной микрофлоры</h4>
      </div>

      <div>
        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Организация"
              type="input"
              value={currentFlora.f_s_organization}
              isEdit={isEdit}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Дата создания"
              type="input"
              value={currentFlora.creationDate}
              isEdit={isEdit}
            />
          </div>
        </div>
        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Наименование (код)"
              type="input"
              value={currentFlora.f_s_name}
              isEdit={isEdit}
              />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Отдел"
              type="select"
              value={currentFlora.f_s_in_book}
              options={['Отдел A', 'Отдел B']}
              isEdit={isEdit}
              />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Род"
              type="select"
              value={currentFlora.f_s_kind}
              options={['Род A', 'Род B']}
              isEdit={isEdit}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Организм-источник"
              type="select"
              value={currentFlora.f_s_object_of_symbiosis}
              options={['Организм X', 'Организм Y']}
              isEdit={isEdit}
            />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Вид"
              type="select"
              value={currentFlora.f_s_view}
              options={['Вид X', 'Вид Y']}
              isEdit={isEdit}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Тип культуры"
              type="select"
              value={currentFlora.f_s_culture_type}
              options={['Тип X', 'Тип Y']}
              isEdit={isEdit}
            />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
            <div className={cls.phenotypicCharacters}>
            <h5>Фенотипические характеристики</h5>
            <FieldInput
              title="Культурально-морфологические свойства"
              type="radio"
              value={currentFlora.f_s_culture_props}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Профиль ферментативной активности"
              type="radio"
              value={currentFlora.f_s_enzyme_activity}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Антигенная структура"
              type="radio"
              value={currentFlora.f_s_antigenic_structure}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Профиль а/м устойчивости"
              type="radio"
              value={currentFlora.f_s_stability_profile}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Специфическая активность"
              type="radio"
              value={currentFlora.f_s_specific_activity}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Иное (указать)"
              type="input"
              value={currentFlora.f_s_other}
              isEdit={isEdit}
            />
          </div>

          <div className={cls.genotypicCharacters}>
            <h5>Генотипические характеристики</h5>
            <FieldInput
              title="16S рРНК"
              type="radio"
              value={currentFlora.f_s_16s_rrna}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Секвенирование"
              type="radio"
              value={currentFlora.f_s_sequencing}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
          </div>
        </div>
      </div>

      <div className={cls.floraControlPanel}>
        <button className={cls.blueBtn} onClick={() => navigate(-1)}>Вернуться</button>
        <div>
          {isEdit ? (
            <>
              <button className={cls.blueBtn} onClick={() => setIsEdit(false)}>Отмена</button>
              <button className={cls.blueBtn} onClick={() => { setIsEdit(false) }}>Сохранить</button>
            </>
          ) : (
            <button className={cls.blueBtn} onClick={() => setIsEdit(true)}>Редактировать</button>
          )}
          <button className={cls.redBtn}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default FloraPage
