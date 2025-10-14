import cls from './Form.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { forms } from './FormFields';
import FieldInput from 'components/FieldInput/FieldInput';
import CustomButton from 'components/CustomButton/CustomButton';

const Form = () => {
  const navigate = useNavigate();

  const { name } = useParams();

  const renderFormTitle = () => {
    switch(name) {
      case 'new':
        return 'Добавление новости';
      case 'document':
        return 'Добавление документа';
      case 'flora':
        return 'Добавление карты микрофлоры';
      default:
        return 'Неизвестная форма';
    }
  }

  const renderFormFields = () => {
    let formKey = null;
    if (name === 'new') formKey = 'news';
    else if (name === 'document') formKey = 'document';
    else if (name === 'flora') formKey = 'microflora';

    if (!formKey || !forms[formKey]) {
      return (<div className={cls.unknown}>Страница не найдена</div>);
    }

    return (
      <div className={cls.fields}>
        {forms[formKey].fields.map((field) => (
          <div key={field.name} className={cls.formField}>
            <FieldInput title={field.label} type={field.type} isEdit={true}/>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cls.formContainer}>
      <form className={cls.form}>
        <div className={cls.formTitle}>
          <h1 className={cls.titleText}>
            {renderFormTitle()}
          </h1>
          <hr className={cls.hr}/>
        </div>
        <div className={cls.formFields}>
          {renderFormFields()}
          <div className={cls.formActions}>
            <CustomButton type={'submit'} variant={'secondary'} onclick={() => navigate(-1)}>Вернуться</CustomButton>
            <CustomButton type="submit" variant={'primary'}>Сохранить</CustomButton>
          </div>
        </div> 
      </form>
    </div>
  )
}

export default Form