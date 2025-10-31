import { useState, useEffect } from 'react';
import cls from './FieldInput.module.css';
import { frappe } from 'shared/frappeService';

const FieldInput = ({ 
  title, 
  type = 'text', 
  isEdit = false, 
  value = '', 
  onChange,
  required = false,
  options = [],
  placeholder = '',
  doctype,
  fieldname,
  accept = '*', // для file input
  multiple = false // для file input
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [dynamicOptions, setDynamicOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Загружаем динамические опции если указаны doctype и fieldname
  useEffect(() => {
    if (type === 'select' && doctype && fieldname && options.length === 0) {
      loadDynamicOptions();
    }
  }, [doctype, fieldname, type]);

  // Синхронизируем localValue с value из props
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const loadDynamicOptions = async () => {
    setIsLoading(true);
    try {
      const result = await frappe.getFieldOptions(doctype, fieldname);
      if (result.success && result.options) {
        setDynamicOptions(result.options);
      }
    } catch (error) {
      console.error('Error loading options:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleTextareaChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleRadioChange = (optionValue) => {
    setLocalValue(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (multiple) {
        const fileArray = Array.from(files);
        setLocalValue(fileArray);
        if (onChange) {
          onChange(fileArray);
        }
      } else {
        const file = files[0];
        setLocalValue(file);
        if (onChange) {
          onChange(file);
        }
      }
    }
  };

  const removeFile = () => {
    setLocalValue(null);
    if (onChange) {
      onChange(null);
    }
  };

  const getFileName = () => {
    if (!localValue) return '';
    
    if (multiple && Array.isArray(localValue)) {
      return localValue.map(file => file.name).join(', ');
    }
    
    if (localValue instanceof File) {
      return localValue.name;
    }
    
    return String(localValue);
  };

  const renderInput = () => {
    if (!isEdit) {
      switch (type) {
        case 'file':
          if (value) {
            const fileName = getFileName();
            return (
              <div className={cls.fileDisplay}>
                <span className={cls.fileName}>{fileName}</span>
              </div>
            );
          }
          return <div className={cls.displayValue}>Файл не выбран</div>;
        
        case 'radio':
          const selectedOption = options.find(opt => 
            (opt.value || opt) === value
          ) || dynamicOptions.find(opt => 
            (opt.value || opt) === value
          );
          return <div className={cls.displayValue}>{selectedOption ? (selectedOption.label || selectedOption) : 'Не выбрано'}</div>;
        
        default:
          return <div className={cls.displayValue}>{value || 'Не указано'}</div>;
      }
    }

    switch (type) {
      case 'textarea':
        return (
          <textarea
            className={cls.textarea}
            value={localValue || ''}
            onChange={handleTextareaChange}
            placeholder={placeholder}
            required={required}
            rows={4}
          />
        );

      case 'select':
        const selectOptions = options.length > 0 ? options : dynamicOptions;
        return (
          <select
            className={cls.select}
            value={localValue || ''}
            onChange={handleChange}
            required={required}
            disabled={isLoading}
          >
            <option value="">{isLoading ? 'Загрузка...' : 'Выберите...'}</option>
            {selectOptions.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        const radioOptions = options.length > 0 ? options : dynamicOptions;
        return (
          <div className={cls.radioGroup}>
            {radioOptions.map((option, index) => {
              const optionValue = option.value || option;
              const optionLabel = option.label || option;
              return (
                <label key={index} className={cls.radioLabel}>
                  <input
                    type="radio"
                    name={title}
                    value={optionValue}
                    checked={localValue === optionValue}
                    onChange={() => handleRadioChange(optionValue)}
                    required={required}
                    className={cls.radioInput}
                  />
                  <span className={cls.radioText}>{optionLabel}</span>
                </label>
              );
            })}
          </div>
        );

      case 'file':
        const fileName = getFileName();
        return (
          <div className={cls.fileInputContainer}>
            <input
              type="file"
              className={cls.fileInput}
              onChange={handleFileChange}
              accept={accept}
              multiple={multiple}
              required={required && !localValue}
            />
            
            {fileName && (
              <div className={cls.fileInfo}>
                <span className={cls.fileName}>
                  {fileName}
                </span>
                <button 
                  type="button" 
                  onClick={removeFile}
                  className={cls.removeFileButton}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            className={cls.input}
            value={localValue || ''}
            onChange={handleChange}
            required={required}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            className={cls.input}
            value={localValue || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
          />
        );

      default:
        return (
          <input
            type="text"
            className={cls.input}
            value={localValue || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
          />
        );
    }
  };

  return (
    <div className={cls.fieldInput}>
      <label className={cls.label}>
        {title}
        {required && <span className={cls.required}>*</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FieldInput;