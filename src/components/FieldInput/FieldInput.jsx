import { useState, useEffect } from 'react'
import cls from './FieldInput.module.css'

const FieldInput = ({ 
  isEdit = false, 
  value = '', 
  title, 
  type = 'input', 
  options = [], 
  onChange 
}) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleChange = (e) => {
    const newVal = e.target.value
    setCurrentValue(newVal)
    onChange && onChange(newVal)
  }

  const renderEditField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            className={cls.fieldNewValue}
            value={currentValue}
            onChange={handleChange}
            style={{ width: '100%', height: '400px' }}
          />
        )
      case 'radio':
        return (
          <div className={cls.radioGroup}>
            {options.map(opt => (
              <label key={opt.value} className={cls.radioLabel}>
                <input
                  type="radio"
                  value={opt.value}
                  checked={currentValue === opt.value}
                  onChange={handleChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )
      case 'select':
        return (
          <select
            className={cls.fieldNewValue}
            value={currentValue}
            onChange={handleChange}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )
      case 'input':
      default:
        return (
          <input
            type="text"
            className={cls.fieldNewValue}
            value={currentValue}
            onChange={handleChange}
          />
        )
    }
  }

  return (
    <div className={cls.field}>
      <span className={cls.fieldName}>{title}</span>
      {isEdit ? (
        <div>
          {renderEditField()}
        </div>
      ) : (
        <p className={cls.fieldValue}>{currentValue}</p>
      )}
    </div>
  )
}

export default FieldInput
