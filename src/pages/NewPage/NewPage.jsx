import { useEffect, useState } from 'react'
import cls from './NewPage.module.css'
import FieldInput from 'components/FieldInput/FieldInput'
import FrappeService from 'shared/frappeService'
import { useNavigate, useParams } from 'react-router-dom'
import useNewsStore from 'store/news.store'
import useAuthStore from 'store/auth.store'

const frappe = new FrappeService();

const NewPage = () => {
  const { isAuthenticated } = useAuthStore();  

  const params = useParams();
  const navigate = useNavigate();
  const { currentNew, setCurrentNew } = useNewsStore();

  useEffect(() => {    
    frappe.getDoc('Cat News', params.id).then(res => setCurrentNew(res));
  },[params.id, setCurrentNew])

  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState({
    f_s_title: '',
    f_s_content: '',
    f_dt_pubdate: ''
  })

  useEffect(() => {
    if (currentNew) {
      setEditData({
        f_s_title: currentNew.f_s_title || '',
        f_s_content: currentNew.f_s_content || '',
        f_dt_pubdate: currentNew.f_dt_pubdate || ''
      })
    }
  }, [currentNew])

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setEditData({
      f_s_title: currentNew.f_s_title || '',
      f_s_content: currentNew.f_s_content || '',
      f_dt_pubdate: currentNew.f_dt_pubdate || ''
    })
  }

  const handleSave = async () => {
    try {
      const updated = await frappe.updateDoc('Cat News', params.id, editData)
      setCurrentNew(updated)
      setIsEdit(false)
    } catch (e) {
      alert('Ошибка при сохранении: ' + (e?.response?.data?.message || e.message))
    }
  }

  return (
    <div className={cls.pageWrapper}>
      <div className={cls.postInfo}>
        <h4 className={cls.postTitle}>
          <FieldInput
            isEdit={isEdit}
            type="input"
            value={isEdit ? editData.f_s_title : currentNew.f_s_title}
            onChange={val => handleInputChange('f_s_title', val)}
          />
        </h4>

        <div className={cls.postContent}>
          <FieldInput
            isEdit={isEdit}
            type="textarea"
            value={isEdit ? editData.f_s_content : currentNew.f_s_content}
            onChange={val => handleInputChange('f_s_content', val)}
          />
        </div>

        <span className={cls.postPubdate}>
          <b>Дата публикации: </b>
          <FieldInput
            isEdit={isEdit}
            type="input"
            value={isEdit ? editData.f_dt_pubdate : currentNew.f_dt_pubdate}
            onChange={val => handleInputChange('f_dt_pubdate', val)}
          />
        </span>
      </div>

      <div className={cls.postControlPanel}>
        <button className={cls.blueBtn} onClick={() => navigate(-1)}>Вернуться</button>
        {isAuthenticated && (
          <div className={cls.adminControls}>
            {isEdit ? (
              <>
                <button className={cls.blueBtn} onClick={handleCancel}>Отмена</button>
                <button className={cls.blueBtn} onClick={handleSave}>Сохранить</button>
              </>
            ) : (
              <button className={cls.blueBtn} onClick={handleEdit}>Редактировать</button>
            )}
            <button className={cls.redBtn} onClick={async () => {
              if (window.confirm('Удалить новость?')) {
                await frappe.deleteDoc('Cat News', params.id)
                window.history.back()
              }
            }}>Удалить</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewPage
