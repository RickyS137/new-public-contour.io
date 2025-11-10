import { useNavigate } from 'react-router-dom'
import cls from './MicrofloraCard.module.css'

const MicrofloraCard = ({ flora }) => {
  const {
    f_s_organization,
    f_s_kind,
    f_s_view,
    f_s_title,
    f_s_culture_type,
    f_s_culture_props,
    f_s_enzyme_activity,
    f_s_antigenic_structure,
    f_s_stability_profile,
    f_s_specific_activity,
    f_s_other,
    f_s_16s_rrna,
    f_s_sequencing,
    f_s_object_of_symbiosis,
    name
  } = flora

  const navigate = useNavigate()

  return (
    <tr className={cls.customRow} onClick={() => navigate(`/open-microflora/${name}`)}>
        <td>{f_s_organization || 'Не указано'}</td>
        <td>{f_s_kind || 'Не указано'}</td>
        <td>{f_s_view || 'Не указано'}</td>
        <td>{name || 'Не указано'}</td>
        <td>{f_s_culture_type || 'Не указано'}</td>
        <td>{f_s_culture_props || 'Не указано'}</td>
        <td>{f_s_enzyme_activity || 'Не указано'}</td>
        <td>{f_s_antigenic_structure || 'Не указано'}</td>
        <td>{f_s_stability_profile || 'Не указано'}</td>
        <td>{f_s_specific_activity || 'Не указано'}</td>
        <td>{f_s_other || 'Не указано'}</td>
        <td>{f_s_16s_rrna || 'Не указано'}</td>
        <td>{f_s_sequencing || 'Не указано'}</td>
        <td>{f_s_object_of_symbiosis || 'Не указано'}</td>
      </tr>
  )
}

export default MicrofloraCard