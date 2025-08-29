import React, { useState } from 'react'
import cls from './FloraPage.module.css'
import { useLocation } from 'react-router-dom'
import FieldInput from 'components/FieldInput/FieldInput'

const FloraPage = () => {
  const [flora, setFlora] = useState({
    organization: 'Институт микробиологии',
    creationDate: '2025-08-28',
    name: 'Lactobacillus (123)',
    inBook: 'Отдел A',
    kind: 'Род B',
    objectOfSymbiosis: 'Организм X',
    view: 'Вид Y',
    cultureType: 'Тип Z',
    cultureProps: 'Да',
    enzymeActivity: 'Нет',
    antigenicStructure: 'Да',
    stabilityProfile: 'Нет',
    specificActivity: 'Да',
    other: 'Доп. инфо',
    rrna: 'Да',
    sequencing: 'Нет'
  })

  const { history } = useLocation()

  const [isEdit, setIsEdit] = useState(false)

  const handleChange = (field, value) => {
    setFlora(prev => ({ ...prev, [field]: value }))
  }

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
              value={flora.organization}
              isEdit={isEdit}
              onChange={val => handleChange('organization', val)}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Дата создания"
              type="input"
              value={flora.creationDate}
              isEdit={isEdit}
              onChange={val => handleChange('creationDate', val)}
            />
          </div>
        </div>
        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Наименование (код)"
              type="input"
              value={flora.name}
              isEdit={isEdit}
              onChange={val => handleChange('name', val)}
              />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Отдел"
              type="select"
              value={flora.inBook}
              options={['Отдел A', 'Отдел B']}
              isEdit={isEdit}
              onChange={val => handleChange('inBook', val)}
              />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Род"
              type="select"
              value={flora.kind}
              options={['Род A', 'Род B']}
              isEdit={isEdit}
              onChange={val => handleChange('kind', val)}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Организм-источник"
              type="select"
              value={flora.objectOfSymbiosis}
              options={['Организм X', 'Организм Y']}
              isEdit={isEdit}
              onChange={val => handleChange('objectOfSymbiosis', val)}
            />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Вид"
              type="select"
              value={flora.view}
              options={['Вид X', 'Вид Y']}
              isEdit={isEdit}
              onChange={val => handleChange('view', val)}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Тип культуры"
              type="select"
              value={flora.cultureType}
              options={['Тип X', 'Тип Y']}
              isEdit={isEdit}
              onChange={val => handleChange('cultureType', val)}
            />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
            <div className={cls.phenotypicCharacters}>
            <h5>Фенотипические характеристики</h5>
            <FieldInput
              title="Культурально-морфологические свойства"
              type="radio"
              value={flora.cultureProps}
              options={['Да','Нет']}
              isEdit={isEdit}
              onChange={val => handleChange('cultureProps', val)}
            />
            <FieldInput
              title="Профиль ферментативной активности"
              type="radio"
              value={flora.enzymeActivity}
              options={['Да','Нет']}
              isEdit={isEdit}
              onChange={val => handleChange('enzymeActivity', val)}
            />
            <FieldInput
              title="Антигенная структура"
              type="radio"
              value={flora.antigenicStructure}
              options={['Да','Нет']}
              isEdit={isEdit}
              onChange={val => handleChange('antigenicStructure', val)}
            />
            <FieldInput
              title="Профиль а/м устойчивости"
              type="radio"
              value={flora.stabilityProfile}
              options={['Да','Нет']}
              isEdit={isEdit}
              onChange={val => handleChange('stabilityProfile', val)}
            />
            <FieldInput
              title="Специфическая активность"
              type="radio"
              value={flora.specificActivity}
              options={['Да','Нет']}
              isEdit={isEdit}
              onChange={val => handleChange('specificActivity', val)}
            />
            <FieldInput
              title="Иное (указать)"
              type="input"
              value={flora.other}
              isEdit={isEdit}
              onChange={val => handleChange('other', val)}
            />
          </div>

          <div className={cls.genotypicCharacters}>
            <h5>Генотипические характеристики</h5>
            <FieldInput
              title="16S рРНК"
              type="radio"
              value={flora.rrna}
              options={['Да','Нет']}
              isEdit={isEdit}
              onChange={val => handleChange('rrna', val)}
            />
            <FieldInput
              title="Секвенирование"
              type="radio"
              value={flora.sequencing}
              options={['Да','Нет']}
              isEdit={isEdit}
              onChange={val => handleChange('sequencing', val)}
            />
          </div>
        </div>
      </div>

      <div className={cls.floraControlPanel}>
        <button className={cls.blueBtn} onClick={() => history.back()}>Вернуться</button>
        <div>
          {isEdit ? (
            <>
              <button className={cls.blueBtn} onClick={() => setIsEdit(false)}>Отмена</button>
              <button className={cls.blueBtn} onClick={() => { console.log(flora); setIsEdit(false) }}>Сохранить</button>
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
