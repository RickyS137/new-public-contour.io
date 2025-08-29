import { useNavigate } from 'react-router-dom'
import cls from './MicrofloraCard.module.css'

const MicrofloraCard = ({ flora }) => {
  const {
    organization,
    kind,
    view,
    name,
    culture_type,
    culture_props,
    enzyme_activity,
    antigenic_structure,
    stability_profile,
    specific_activity,
    other,
    s_rrna,
    sequencing,
    object_of_symbiosis,
  } = flora

  const navigate = useNavigate()
  
  return (
    <tr className={cls.customRow} onClick={() => navigate('/open-microflora/1')}>
        <td>{organization || 'Не указано'}</td>
        <td>{kind || 'Не указано'}</td>
        <td>{view || 'Не указано'}</td>
        <td>{name || 'Не указано'}</td>
        <td>{culture_type || 'Не указано'}</td>
        <td>{culture_props || 'Не указано'}</td>
        <td>{enzyme_activity || 'Не указано'}</td>
        <td>{antigenic_structure || 'Не указано'}</td>
        <td>{stability_profile || 'Не указано'}</td>
        <td>{specific_activity || 'Не указано'}</td>
        <td>{other || 'Не указано'}</td>
        <td>{s_rrna || 'Не указано'}</td>
        <td>{sequencing || 'Не указано'}</td>
        <td>{object_of_symbiosis || 'Не указано'}</td>
      </tr>
  )
}

export default MicrofloraCard