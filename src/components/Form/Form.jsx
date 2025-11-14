import { useState, useEffect } from 'react';
import cls from './Form.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { forms } from './FormFields';
import FieldInput from 'components/FieldInput/FieldInput';
import CustomButton from 'components/CustomButton/CustomButton';
import { frappe } from 'shared/frappeService';
import { useFormStore } from 'store/form.store';

const Form = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { formData, setField, resetForm, getFormData } = useFormStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterOptions, setFilterOptions] = useState({});

  const getDoctype = () => {
    switch(name) {
      case 'new':
        return 'Cat News';
      case 'document':
        return 'Cat NPA Document';
      case 'flora':
        return 'Cat Microflora';
      default:
        return null;
    }
  };

  useEffect(() => {
    return () => resetForm();
  }, [resetForm]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await frappe.client.get('api/method/gisbb_public_contour.www.public.index.get_microflora_filters');
        const msg = res?.data?.message || {};
        console.log(msg);
        
        const opts = {};

        if (msg.f_s_organizations && Array.isArray(msg.f_s_organizations)) opts['f_s_organization'] = msg.f_s_organizations;
        if (msg.f_s_kinds && Array.isArray(msg.f_s_kinds)) opts['f_s_kind'] = msg.f_s_kinds;
        if (msg.f_s_views && Array.isArray(msg.f_s_views)) opts['f_s_view'] = msg.f_s_views;
        if (msg.f_s_culture_types && Array.isArray(msg.f_s_culture_types)) opts['f_s_culture_type'] = msg.f_s_culture_types;
        if (msg.f_s_object_of_symbiosiss && Array.isArray(msg.f_s_object_of_symbiosiss)) {
          opts['f_s_object_of_symbiosis'] = msg.f_s_object_of_symbiosiss;
        } else if (msg.f_s_object_of_symbiosis && Array.isArray(msg.f_s_object_of_symbiosis)) {
          opts['f_s_object_of_symbiosis'] = msg.f_s_object_of_symbiosis;
        }

        if (mounted) setFilterOptions(opts);
      } catch (e) {
        console.error('Error loading filter options for form:', e);
      }
    })();
    return () => { mounted = false; };
  }, []);

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
  };

  const handleFieldChange = (fieldName, value) => {
    setField(fieldName, value);
    setError('');
  };

  const processFileFields = async (data, formConfig) => {
    const processedData = { ...data };
    
    for (const field of formConfig.fields) {
      if (field.type === 'file' && processedData[field.name]) {
        const fieldValue = processedData[field.name];
        
        if (field.multiple && Array.isArray(fieldValue)) {
          const uploadResults = await frappe.uploadMultipleFiles(fieldValue);
          const successfulUploads = uploadResults.filter(result => result.success);
          
          if (successfulUploads.length > 0) {
            processedData[field.name] = successfulUploads.map(result => result.file_url);
          } else {
            processedData[field.name] = null;
          }
        } else if (fieldValue instanceof File) {
          const uploadResult = await frappe.uploadFile(fieldValue);
          if (uploadResult.success) {
            processedData[field.name] = uploadResult.file_url;
          } else {
            processedData[field.name] = null;
          }
        }
      }
    }
    
    return processedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const doctype = getDoctype();
    if (!doctype) {
      setError('Неизвестный тип формы');
      return;
    }

    let data = getFormData();
    const formKey = name === 'new' ? 'news' : name === 'document' ? 'document' : 'microflora';
    const formConfig = forms[formKey];
    
    const requiredFields = formConfig.fields.filter(field => field.required);
    
    for (const field of requiredFields) {
      const fieldValue = data[field.name];
      
      if (!fieldValue || 
          (typeof fieldValue === 'string' && fieldValue.trim() === '') ||
          (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        setError(`Поле "${field.label}" обязательно для заполнения`);
        return;
      }
    }

    setIsLoading(true);
    setError('');

    try {
      data = await processFileFields(data, formConfig);
      
      await frappe.createDoc(doctype, data);
      
      resetForm();
      navigate(-1);
      
    } catch (error) {
      console.error('Error creating document:', error);
      const errorMessage = error.response?.data?.message || 'Ошибка при создании документа';
      
      if (errorMessage.includes('can\'t adapt type')) {
        setError('Ошибка обработки файлов. Попробуйте еще раз.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = () => {
    let formKey = null;
    if (name === 'new') formKey = 'news';
    else if (name === 'document') formKey = 'document';
    else if (name === 'flora') formKey = 'microflora';

    if (!formKey || !forms[formKey]) {
      return <div className={cls.unknown}>Страница не найдена</div>;
    }

    return (
      <div className={cls.fields}>
        {forms[formKey].fields.map((field) => (
          <div key={field.name} className={cls.formField}>
              <FieldInput 
              title={field.label}
              type={field.type}
              isEdit={true}
              value={formData[field.name] || ''}
              onChange={(value) => handleFieldChange(field.name, value)}
              required={field.required}
              options={filterOptions[field.name] ?? (field.options ? field.options : [])}
              placeholder={field.placeholder}
              fieldname={field.name}
              doctype={field.doctype}
              accept={'application/pdf, .docx, image/png, image/jpeg'}
              multiple={false}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cls.formContainer}>
      <form className={cls.form} onSubmit={handleSubmit}>
        <div className={cls.formTitle}>
          <h1 className={cls.titleText}>
            {renderFormTitle()}
          </h1>
          <hr className={cls.hr}/>
        </div>
        {error && (
          <div className={cls.error}>
            {error}
          </div>
        )}
        <div className={cls.formFields}>
          {renderFormFields()}
          <div className={cls.formActions}>
            <CustomButton 
              type="button" 
              variant="secondary" 
              onclick={() => navigate(-1)}
            >
              Вернуться
            </CustomButton>
            <CustomButton 
              type="submit" 
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </CustomButton>
          </div>
        </div> 
      </form>
    </div>
  );
};

export default Form;