import { Link } from 'react-router-dom'
import cls from './DocumentsCard.module.css'
import { useState } from 'react'

const DocumentsCard = ({ document }) => {
  const [isDocActive, setIsDocActive] = useState(false);
  const [isDescActive, setIsDescActive] = useState(false);

  const {
    title,
    kind,
    status,
    document_author,
    num,
    effective_date,
    description,
    doc,
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
          <span className={cls.kind}>{kind}</span>
          <span className={`${cls.status} ${statusCheck(status)}`}>{status}</span> 
        </div>
        <div className={cls.authorSection}>
          <span className={cls.author}>{document_author}</span>
        </div>
        <h5 className={cls.documentTitle}>
          <Link to="/open-document/2">{title}</Link>
        </h5>
        <h6 className={cls.documentText}>
          №{num} от {effective_date}
        </h6>
        <div className={cls.documentButtons}>
          <div className={cls.documentActions}>
            <span className={`${cls.action} ${cls.descriptionButton}`} onClick={toggleDesc}>Описание</span>
            <span className={`${cls.action} ${cls.filesButton}`} onClick={toggleDoc}>Файлы</span>
          </div>
        </div>
        <div className={cls.description}>
          <p className={`${cls.documentDescription} ${isDescActive ? cls.toggleActive : cls.toggleInactive}`}>{description}</p>
          <Link className={`${cls.documentFiles} ${isDocActive ? cls.toggleActive : cls.toggleInactive}`} download="" href="">
             {doc}
          </Link>
        </div>
    </div>
  )
}

export default DocumentsCard