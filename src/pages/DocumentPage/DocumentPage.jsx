import React, { useEffect, useState } from 'react'
import cls from './DocumentPage.module.css' // твой CSS-модуль
import FieldInput from 'components/FieldInput/FieldInput'
import useDocumentsStore from 'store/documents.store'
import { frappe } from 'shared/frappeService'
import { useNavigate, useParams } from 'react-router-dom'

// use shared frappe instance

const DocumentPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentDocument, setCurrentDocument } = useDocumentsStore();

  useEffect(() => {
    frappe.getDoc('Cat NPA Document', id).then(res => {setCurrentDocument(res)});
  },[id, setCurrentDocument])  

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
            value={currentDocument.f_s_title}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Принявший орган"
            value={currentDocument.f_opt_author}
            options={['Министерство экологии', 'Парламент', 'Правительство']}
          />

          <FieldInput
            isEdit={isEdit}
            type="input"
            title="Номер документа"
            value={currentDocument.f_s_num}
          />

          <FieldInput
            isEdit={isEdit}
            type="input"
            inputType="date"
            title="Дата подписания"
            value={currentDocument.f_dt_date}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Статус"
            value={currentDocument.f_opt_status}
            options={['Действует', 'Утратил силу', 'На рассмотрении']}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Тип документа"
            value={currentDocument.f_opt_kind}
            options={['Федеральный закон', 'Постановление', 'Приказ']}
          />

          <FieldInput
            isEdit={isEdit}
            type="textarea"
            title="Описание"
            value={currentDocument.f_s_description}
          />

          <div className={cls.documentFiles}>
            <h4>Файлы</h4>
            {currentDocument.f_a_doc ? (
              <a href='*' download={currentDocument.f_a_doc} className={cls.docLink} target="_blank" rel="noreferrer">
                Скачать файл
              </a>
            ) : (
              <span id="filePlaceholder">Загрузка...</span>
            )}
          </div>
        </div>
      </div>

      <div className={cls.documentControlPanel}>
        <button className={cls.blueBtn} onClick={() => navigate(-1)}>Вернуться</button>
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
