import React, { useState } from 'react'
import cls from './DocumentPage.module.css' // твой CSS-модуль
import FieldInput from 'components/FieldInput/FieldInput'

const DocumentPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [docData, setDocData] = useState({
    title: 'Закон об экологии',
    author: 'Министерство экологии',
    num: '123-ФЗ',
    date: '2025-08-20',
    status: 'Действует',
    kind: 'Федеральный закон',
    description: 'Описание документа...',
    file: '/files/law.pdf'
  })

  const handleChange = (field, value) => {
    setDocData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <div className={cls.document}>
        <div className={cls.documentInfo}>
          <h4>Документ</h4>
        </div>

        <div className={cls.documentInner}>
          <FieldInput
            isEdit={isEdit}
            type="input"
            title="Наименование документа"
            value={docData.title}
            onChange={val => handleChange('title', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Принявший орган"
            value={docData.author}
            options={['Министерство экологии', 'Парламент', 'Правительство']}
            onChange={val => handleChange('author', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="input"
            title="Номер документа"
            value={docData.num}
            onChange={val => handleChange('num', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="input"
            inputType="date"
            title="Дата подписания"
            value={docData.date}
            onChange={val => handleChange('date', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Статус"
            value={docData.status}
            options={['Действует', 'Утратил силу', 'На рассмотрении']}
            onChange={val => handleChange('status', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Тип документа"
            value={docData.kind}
            options={['Федеральный закон', 'Постановление', 'Приказ']}
            onChange={val => handleChange('kind', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="textarea"
            title="Описание"
            value={docData.description}
            onChange={val => handleChange('description', val)}
          />

          <div className={cls.documentFiles}>
            <h4>Файлы</h4>
            {docData.file ? (
              <a href={docData.file} className={cls.docLink} target="_blank" rel="noreferrer">
                Скачать файл
              </a>
            ) : (
              <span id="filePlaceholder">Загрузка...</span>
            )}
          </div>
        </div>
      </div>

      <div className={cls.documentControlPanel}>
        <button className={cls.blueBtn}>Вернуться</button>
        <div id="admin-controls">
          {!isEdit ? (
            <button className={cls.blueBtn} onClick={() => setIsEdit(true)}>Редактировать</button>
          ) : (
            <>
              <button className={cls.blueBtn} onClick={() => setIsEdit(false)}>Отмена</button>
              <button className={cls.blueBtn} onClick={() => setIsEdit(false)}>Сохранить</button>
            </>
          )}
          <button className={cls.redBtn}>Удалить</button>
        </div>
      </div>
    </>
  )
}

export default DocumentPage
