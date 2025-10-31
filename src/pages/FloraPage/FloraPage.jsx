import React, { useEffect, useState } from 'react'
import cls from './FloraPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import FieldInput from 'components/FieldInput/FieldInput'
import { frappe } from 'shared/frappeService'
import useMicrofloraStore from 'store/microflora.store'
import useAuthStore from 'store/auth.store'

const FloraPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { currentFlora, setCurrentFlora } = useMicrofloraStore()
  const { isAuthenticated } = useAuthStore();
  const [ floraOptions, setFloraOptions ] = useState({
    f_s_organizations: [],
    f_s_kinds: [],
    f_s_views: [],
    f_s_culture_types: [],
    f_s_object_of_symbiosiss: []
  })

  useEffect(() => {
    frappe.getDoc('Cat Microflora', id).then(res => setCurrentFlora(res))
    frappe.client.get('api/method/gisbb_public_contour.www.react_page.get_microflora_filters').then(res => { 
      setFloraOptions({
        f_s_organizations: res?.data?.message?.f_s_organizations || [],
        f_s_kinds: res?.data?.message?.f_s_kinds || [],
        f_s_views: res?.data?.message?.f_s_views || [],
        f_s_culture_types: res?.data?.message?.f_s_culture_types || [],
        f_s_object_of_symbiosiss: res?.data?.message?.f_s_object_of_symbiosiss || []
      })
    })
  },[ id, setCurrentFlora ])

  

  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState({
    f_s_organization: '',
    creationDate: '',
    f_s_name: '',
    f_s_in_book: '',
    f_s_kind: '',
    f_s_object_of_symbiosis: '',
    f_s_view: '',
    f_s_culture_type: '',
    f_s_culture_props: '',
    f_s_enzyme_activity: '',
    f_s_antigenic_structure: '',
    f_s_stability_profile: '',
    f_s_specific_activity: '',
    f_s_other: '',
    f_s_16s_rrna: '',
    f_s_sequencing: ''
  })

  useEffect(() => {
    if (currentFlora) {
      setEditData({
        f_s_organization: currentFlora.f_s_organization || '',
        creationDate: currentFlora.creationDate || '',
        f_s_name: currentFlora.f_s_name || '',
        f_s_in_book: currentFlora.f_s_in_book || '',
        f_s_kind: currentFlora.f_s_kind || '',
        f_s_object_of_symbiosis: currentFlora.f_s_object_of_symbiosis || '',
        f_s_view: currentFlora.f_s_view || '',
        f_s_culture_type: currentFlora.f_s_culture_type || '',
        f_s_culture_props: currentFlora.f_s_culture_props || '',
        f_s_enzyme_activity: currentFlora.f_s_enzyme_activity || '',
        f_s_antigenic_structure: currentFlora.f_s_antigenic_structure || '',
        f_s_stability_profile: currentFlora.f_s_stability_profile || '',
        f_s_specific_activity: currentFlora.f_s_specific_activity || '',
        f_s_other: currentFlora.f_s_other || '',
        f_s_16s_rrna: currentFlora.f_s_16s_rrna || '',
        f_s_sequencing: currentFlora.f_s_sequencing || ''
      })
    }
  }, [currentFlora])

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCancel = () => {
    setIsEdit(false)
    if (currentFlora) {
      setEditData({
        f_s_organization: currentFlora.f_s_organization || '',
        creationDate: currentFlora.creationDate || '',
        f_s_name: currentFlora.f_s_name || '',
        f_s_in_book: currentFlora.f_s_in_book || '',
        f_s_kind: currentFlora.f_s_kind || '',
        f_s_object_of_symbiosis: currentFlora.f_s_object_of_symbiosis || '',
        f_s_view: currentFlora.f_s_view || '',
        f_s_culture_type: currentFlora.f_s_culture_type || '',
        f_s_culture_props: currentFlora.f_s_culture_props || '',
        f_s_enzyme_activity: currentFlora.f_s_enzyme_activity || '',
        f_s_antigenic_structure: currentFlora.f_s_antigenic_structure || '',
        f_s_stability_profile: currentFlora.f_s_stability_profile || '',
        f_s_specific_activity: currentFlora.f_s_specific_activity || '',
        f_s_other: currentFlora.f_s_other || '',
        f_s_16s_rrna: currentFlora.f_s_16s_rrna || '',
        f_s_sequencing: currentFlora.f_s_sequencing || ''
      })
    }
  }

  const handleSave = async () => {
    try {
      const updated = await frappe.updateDoc('Cat Microflora', id, editData)
      setCurrentFlora(updated)
      setIsEdit(false)
    } catch (e) {
      alert('Ошибка при сохранении: ' + (e?.response?.data?.message || e.message))
    }
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
              value={isEdit ? editData.f_s_organization : currentFlora.f_s_organization}
              onChange={val => handleInputChange('f_s_organization', val)}
              doctype={'Cat Microflora'}
              options={floraOptions.f_s_organizations}
              isEdit={isEdit}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Дата создания"
              type="date"
              value={isEdit ? editData.creationDate : currentFlora.creationDate}
              onChange={val => handleInputChange('creationDate', val)}
              isEdit={isEdit}
            />
          </div>
        </div>
        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Наименование (код)"
              type="input"
              value={isEdit ? editData.f_s_name : currentFlora.f_s_name}
              onChange={val => handleInputChange('f_s_name', val)}
              isEdit={isEdit}
              />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Отдел"
              type="select"
              value={isEdit ? editData.f_s_in_book : currentFlora.f_s_in_book}
              onChange={val => handleInputChange('f_s_in_book', val)}
              doctype={'Cat Microflora'}
              options={floraOptions.f_s_organizations}
              isEdit={isEdit}
              />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Род"
              type="select"
              value={isEdit ? editData.f_s_kind : currentFlora.f_s_kind}
              onChange={val => handleInputChange('f_s_kind', val)}
              doctype={'Cat Microflora'}
              options={floraOptions.f_s_kinds}
              isEdit={isEdit}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Организм-источник"
              type="select"
              value={isEdit ? editData.f_s_object_of_symbiosis : currentFlora.f_s_object_of_symbiosis}
              onChange={val => handleInputChange('f_s_object_of_symbiosis', val)}
              doctype={'Cat Microflora'}
              options={floraOptions.f_s_object_of_symbiosiss}
              isEdit={isEdit}
            />
          </div>
        </div>

        <div className={cls.floraInfoRow}>
          <div className={cls.floraField}>
            <FieldInput
              title="Вид"
              type="select"
              value={isEdit ? editData.f_s_view : currentFlora.f_s_view}
              onChange={val => handleInputChange('f_s_view', val)}
              doctype={'Cat Microflora'}
              options={floraOptions.f_s_views}
              isEdit={isEdit}
            />
          </div>
          <div className={cls.floraField}>
            <FieldInput
              title="Тип культуры"
              type="select"
              value={isEdit ? editData.f_s_culture_type : currentFlora.f_s_culture_type}
              onChange={val => handleInputChange('f_s_culture_type', val)}
              doctype={'Cat Microflora'}
              options={floraOptions.f_s_culture_types}
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
              value={isEdit ? editData.f_s_culture_props : currentFlora.f_s_culture_props}
              onChange={val => handleInputChange('f_s_culture_props', val)}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Профиль ферментативной активности"
              type="radio"
              value={isEdit ? editData.f_s_enzyme_activity : currentFlora.f_s_enzyme_activity}
              onChange={val => handleInputChange('f_s_enzyme_activity', val)}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Антигенная структура"
              type="radio"
              value={isEdit ? editData.f_s_antigenic_structure : currentFlora.f_s_antigenic_structure}
              onChange={val => handleInputChange('f_s_antigenic_structure', val)}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Профиль а/м устойчивости"
              type="radio"
              value={isEdit ? editData.f_s_stability_profile : currentFlora.f_s_stability_profile}
              onChange={val => handleInputChange('f_s_stability_profile', val)}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Специфическая активность"
              type="radio"
              value={isEdit ? editData.f_s_specific_activity : currentFlora.f_s_specific_activity}
              onChange={val => handleInputChange('f_s_specific_activity', val)}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Иное (указать)"
              type="input"
              value={isEdit ? editData.f_s_other : currentFlora.f_s_other}
              onChange={val => handleInputChange('f_s_other', val)}
              isEdit={isEdit}
            />
          </div>

          <div className={cls.genotypicCharacters}>
            <h5>Генотипические характеристики</h5>
            <FieldInput
              title="16S рРНК"
              type="radio"
              value={isEdit ? editData.f_s_16s_rrna : currentFlora.f_s_16s_rrna}
              onChange={val => handleInputChange('f_s_16s_rrna', val)}
              options={['Да','Нет']}
              isEdit={isEdit}
            />
            <FieldInput
              title="Секвенирование"
              type="radio"
              value={isEdit ? editData.f_s_sequencing : currentFlora.f_s_sequencing}
              onChange={val => handleInputChange('f_s_sequencing', val)}
              options={['Да','Нет']}
              isEdit={isEdit}
              />
          </div>
        </div>
      </div>

      <div className={cls.floraControlPanel}>
        <button className={cls.blueBtn} onClick={() => navigate(-1)}>Вернуться</button>
        <div>
          {
            isAuthenticated ? (
              <>
                  {isEdit ? (
                <>
                  <button className={cls.blueBtn} onClick={handleCancel}>Отмена</button>
                  <button className={cls.blueBtn} onClick={handleSave}>Сохранить</button>
                </>
              ) : (
                <button className={cls.blueBtn} onClick={() => setIsEdit(true)}>Редактировать</button>
              )}
              <button className={cls.redBtn} onClick={async () => {
                if (window.confirm('Удалить запись?')) {
                  await frappe.deleteDoc('Cat Microflora', id)
                  window.history.back()
                }
              }}>Удалить</button>
              </>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default FloraPage
