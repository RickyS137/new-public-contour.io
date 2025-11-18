import { useEffect, useState, useCallback } from 'react'
import cls from './AuditModal.module.css'
import { frappe } from 'shared/frappeService'
import LoadingState from 'components/LoadingState/LoadingState'

const AuditModal = ({ setIsOpen }) => {
  const [auditLoading, setAuditLoading] = useState(false)
  const [auditLogs, setAuditLogs] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const [hasNext, setHasNext] = useState(false)

  const [searchDocname, setSearchDocname] = useState('')
  const [searchAuthor, setSearchAuthor] = useState('')
  const [filterField, setFilterField] = useState('')

  const [authorOptions, setAuthorOptions] = useState([])
  const [fieldOptions, setFieldOptions] = useState([])

  const fetchAuditLogs = useCallback(async (pageToLoad = 1) => {
    setAuditLoading(true)
    try {
      const filters = []

      if (searchDocname && String(searchDocname).trim() !== '') {
        filters.push(['docname', 'like', `%${String(searchDocname).trim()}%`])
      }

      if (searchAuthor && String(searchAuthor).trim() !== '') {
        // if author selected from options, use exact match
        filters.push(['f_s_edit_author', '=', String(searchAuthor).trim()])
      }

      if (filterField && String(filterField).trim() !== '') {
        filters.push(['f_s_field', '=', String(filterField).trim()])
      }

      const start = (pageToLoad - 1) * pageSize

      const auditData = await frappe.getList('Cat Microflora Version', {
        filters,
        fields: ['ref_doctype', 'f_s_edit_author', 'f_dt_creation_date', 'docname', 'f_s_field', 'f_s_original_value', 'f_s_new_value', 'name'],
        page_length: pageSize,
        start
      })

      const list = Array.isArray(auditData) ? auditData : (auditData || [])
      setAuditLogs(list)
      setHasNext(list.length === pageSize)
      setPage(pageToLoad)
    } catch (error) {
      console.error('Error fetching audit logs:', error)
      setAuditLogs([])
      setHasNext(false)
    } finally {
      setAuditLoading(false)
    }
  }, [pageSize, searchDocname, searchAuthor, filterField])

  useEffect(() => {
    fetchAuditLogs(1)
  }, [fetchAuditLogs])

  useEffect(() => {
    let mounted = true
    async function loadOptions() {
      try {
        const authorsResp = await frappe.client.get('/api/method/gisbb_public_contour.www.public.index.get_distinct_field_values', {
          params: {
            doctype: 'Cat Microflora Version',
            fieldname: 'f_s_edit_author'
          }
        })
        
        const fieldsResp = await frappe.client.get('/api/method/gisbb_public_contour.www.public.index.get_distinct_field_values', {
          params: {
            doctype: 'Cat Microflora Version',
            fieldname: 'f_s_field'
          }
        })
        

        const normalize = (resp) => {
          if (!resp) return []
          if (Array.isArray(resp)) return resp
          if (Array.isArray(resp.options)) return resp.options
          if (Array.isArray(resp.message)) return resp.message
          if (Array.isArray(resp.data)) return resp.data
          return []
        }

        if (!mounted) return
        setAuthorOptions(normalize(authorsResp?.data?.message))
        setFieldOptions(normalize(fieldsResp?.data?.message))
      } catch (e) {
        console.error('Error loading field options for audit modal:', e)
      }
    }

    loadOptions()

    return () => { mounted = false }
  }, [])

  const closeAuditModal = () => {
    setIsOpen(false)
    setAuditLogs([])
    setAuditLoading(false)
    setPage(1)
    setHasNext(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchAuditLogs(1)
  }

  const handlePrev = () => {
    if (page > 1) fetchAuditLogs(page - 1)
  }

  const handleNext = () => {
    if (hasNext) fetchAuditLogs(page + 1)
  }

  return (
    <div className={cls.modalOverlay} onClick={closeAuditModal}>
        <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
          <div className={cls.modalHeader}>
            <h3>Журнал изменений</h3>
            <div className={cls.headerControls}>
              <form onSubmit={handleSearchSubmit} className={cls.searchForm}>
                <input
                  type="text"
                  placeholder="По названию документа"
                  value={searchDocname}
                  onChange={(e) => setSearchDocname(e.target.value)}
                  className={cls.input}
                />
                <select
                  value={searchAuthor}
                  onChange={(e) => setSearchAuthor(e.target.value)}
                  className={cls.input}
                >
                  <option value="">Все авторы</option>
                  {authorOptions && authorOptions.map((a, i) => (
                    <option key={i} value={a}>{a}</option>
                  ))}
                </select>

                <select
                  value={filterField}
                  onChange={(e) => setFilterField(e.target.value)}
                  className={cls.input}
                >
                  <option value="">Все поля</option>
                  {fieldOptions && fieldOptions.map((f, i) => (
                    <option key={i} value={f}>{f}</option>
                  ))}
                </select>
                <button type="submit" className={cls.controlButton}>Найти</button>
              </form>
              <button onClick={closeAuditModal} className={cls.controlButton}>Закрыть</button>
            </div>
          </div>
          <div className={cls.modalBody}>
            <table className={cls.auditTable}>
              <thead>
                <tr>
                  <td>Название документа</td>
                  <td>Автор изменений</td>
                  <td>Время изменений</td>
                  <td>Измененное поле</td>
                  <td>Старое значние</td>
                  <td>Новое значние</td>
                  <td>ID</td>
                </tr>
              </thead>
              <tbody>
                {auditLoading ? (
                  <tr><td colSpan={7}><LoadingState /></td></tr>
                ) : (
                  auditLogs.length ? (
                    auditLogs.map((log, idx) => (
                      <tr key={idx}>
                        <td>{log.docname || ''}</td>
                        <td>{log.f_s_edit_author || ''}</td>
                        <td>{log.f_dt_creation_date || ''}</td>
                        <td>{log.f_s_field || ''}</td>
                        <td>{log.f_s_original_value || ''}</td>
                        <td>{log.f_s_new_value || ''}</td>
                        <td>{log.name || ''}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={7}>Нет данных</td></tr>
                  )
                )}
              </tbody>
            </table>

            <div className={cls.paginationBar}>
              <button onClick={handlePrev} disabled={page <= 1} className={cls.pageButton}>Пред</button>
              <span className={cls.pageInfo}>Стр. {page}</span>
              <button onClick={handleNext} disabled={!hasNext} className={cls.pageButton}>След</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AuditModal