import React from 'react'
import cls from './CustomButton.module.css'

const CustomButton = ({children, onclick, variant, type}) => {
  return (
    <button type={type} className={variant === 'primary' ? cls.primaryButton : cls.secondaryButton} onClick={onclick}>
      {children}
    </button>
  )
}

export default CustomButton