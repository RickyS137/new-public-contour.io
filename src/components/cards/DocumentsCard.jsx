import { Link } from 'react-router-dom'
import cls from './DocumentsCard.module.css'
import { useState } from 'react'

const DocumentsCard = ({ document }) => {
  const [isDocActive, setIsDocActive] = useState(false);
  const [isDescActive, setIsDescActive] = useState(false);

  const {
    f_s_title,
    f_opt_kind,
    f_opt_status,
    f_opt_author,
    f_s_num,
    f_dt_effective_date,
    f_s_description,
    f_a_doc,
    name,
  } = document

  const statusCheck = (status) => {
    if (status === 'Действует') {
      return cls.active;
    } else if (status === 'Утратил силу или отменен') {
      return cls.inactive;
    }
    return '';
  }

  const toggleDoc = () => {
    setIsDocActive(!isDocActive)
  }

  const toggleDesc = () => {
    setIsDescActive(!isDescActive)
  }

  return (
    <div className={cls.documentItem}>
        <div className={cls.kindSection}>
          <span className={cls.kind}>{f_opt_kind}</span>
          <span className={`${cls.status} ${statusCheck(f_opt_status)}`}>{f_opt_status}</span> 
        </div>
        <div className={cls.authorSection}>
          <span className={cls.author}>{f_opt_author}</span>
        </div>
        <h5 className={cls.documentTitle}>
          <Link to={`/open-document/${name}`}>{f_s_title}</Link>
        </h5>
        <h6 className={cls.documentText}>
          №{f_s_num} от {f_dt_effective_date}
        </h6>
        <div className={cls.documentButtons}>
          <div className={cls.documentActions}>
            <span className={`${cls.action} ${cls.descriptionButton}`} onClick={toggleDesc}>Описание</span>
            <span className={`${cls.action} ${cls.filesButton}`} onClick={toggleDoc}>Файлы</span>
          </div>
        </div>
        <div className={cls.description}>
          <p className={`${cls.documentDescription} ${isDescActive ? cls.toggleActive : cls.toggleInactive}`}>{f_s_description}</p>
          <Link className={`${cls.documentFiles} ${isDocActive ? cls.toggleActive : cls.toggleInactive}`} download="" href="">
             {f_a_doc}
          </Link>
        </div>
    </div>
  )
}

export default DocumentsCard