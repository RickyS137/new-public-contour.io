import React, { useEffect, useState } from 'react'
import cls from './DocumentPage.module.css' // твой CSS-модуль
import FieldInput from 'components/FieldInput/FieldInput'
import useDocumentsStore from 'store/documents.store'
import { frappe } from 'shared/frappeService'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthStore from 'store/auth.store'

const DocumentPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentDocument, setCurrentDocument } = useDocumentsStore();
  const { isAuthenticated } = useAuthStore();

  const [editData, setEditData] = useState({
    f_s_title: '',
    f_opt_author: '',
    f_s_num: '',
    f_dt_date: '',
    f_opt_status: '',
    f_opt_kind: '',
    f_s_description: '',
    f_a_doc: ''
  })

  useEffect(() => {
    frappe.getDoc('Cat NPA Document', id).then(res => {setCurrentDocument(res)});
  },[id, setCurrentDocument])

  useEffect(() => {
    if (currentDocument) {
      setEditData({
        f_s_title: currentDocument.f_s_title || '',
        f_opt_author: currentDocument.f_opt_author || '',
        f_s_num: currentDocument.f_s_num || '',
        f_dt_date: currentDocument.f_dt_date || '',
        f_opt_status: currentDocument.f_opt_status || '',
        f_opt_kind: currentDocument.f_opt_kind || '',
        f_s_description: currentDocument.f_s_description || '',
        f_a_doc: currentDocument.f_a_doc || ''
      })
    }
  }, [currentDocument])

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCancel = () => {
    setIsEdit(false)
    if (currentDocument) {
      setEditData({
        f_s_title: currentDocument.f_s_title || '',
        f_opt_author: currentDocument.f_opt_author || '',
        f_s_num: currentDocument.f_s_num || '',
        f_dt_date: currentDocument.f_dt_date || '',
        f_opt_status: currentDocument.f_opt_status || '',
        f_opt_kind: currentDocument.f_opt_kind || '',
        f_s_description: currentDocument.f_s_description || '',
        f_a_doc: currentDocument.f_a_doc || ''
      })
    }
  }

  const handleSave = async () => {
    try {
      const updated = await frappe.updateDoc('Cat NPA Document', id, editData)
      setCurrentDocument(updated)
      setIsEdit(false)
    } catch (e) {
      alert('Ошибка при сохранении: ' + (e?.response?.data?.message || e.message))
    }
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
            value={isEdit ? editData.f_s_title : currentDocument.f_s_title}
            onChange={val => handleInputChange('f_s_title', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Принявший орган"
            value={isEdit ? editData.f_opt_author : currentDocument.f_opt_author}
            onChange={val => handleInputChange('f_opt_author', val)}
            doctype={'Cat NPA Document'}
            fieldname={'f_opt_author'}
          />

          <FieldInput
            isEdit={isEdit}
            type="input"
            title="Номер документа"
            value={isEdit ? editData.f_s_num : currentDocument.f_s_num}
            onChange={val => handleInputChange('f_s_num', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="input"
            inputType="date"
            title="Дата подписания"
            value={isEdit ? editData.f_dt_date : currentDocument.f_dt_date}
            onChange={val => handleInputChange('f_dt_date', val)}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Статус"
            value={isEdit ? editData.f_opt_status : currentDocument.f_opt_status}
            onChange={val => handleInputChange('f_opt_status', val)}
            options={['Действует', 'Утратил силу', 'На рассмотрении']}
          />

          <FieldInput
            isEdit={isEdit}
            type="select"
            title="Тип документа"
            value={isEdit ? editData.f_opt_kind : currentDocument.f_opt_kind}
            onChange={val => handleInputChange('f_opt_kind', val)}
            options={['Федеральный закон', 'Постановление', 'Приказ']}
          />

          <FieldInput
            isEdit={isEdit}
            type="textarea"
            title="Описание"
            value={isEdit ? editData.f_s_description : currentDocument.f_s_description}
            onChange={val => handleInputChange('f_s_description', val)}
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
          {
            isAuthenticated && (
              <>
              {!isEdit ? (
              <button className={cls.blueBtn} onClick={() => setIsEdit(true)}>Редактировать</button>
            ) : (
              <>
                <button className={cls.blueBtn} onClick={handleCancel}>Отмена</button>
                <button className={cls.blueBtn} onClick={handleSave}>Сохранить</button>
              </>
            )}
            <button className={cls.redBtn} onClick={async () => {
              if (window.confirm('Удалить документ?')) {
                await frappe.deleteDoc('Cat NPA Document', id)
                window.history.back()
              }
            }}>Удалить</button>
            </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default DocumentPage
