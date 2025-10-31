import Auth from 'components/Auth/Auth'
import React from 'react'
import cls from './AuthPage.module.css'
import { NavLink } from 'react-router-dom';
import logo from 'assets/gisbb_fav.png'

const AuthPage = () => {

  return (
    <div className={cls.AuthPage}>
      <header className={cls.header}>
        <div className={cls.headerContainer}>
          <button
            className={cls.button}
          >
            <NavLink to={'/main'}>Главная</NavLink>
          </button>
        </div>
      </header>
      <div className={cls.AuthContent}>
        <div className={cls.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h2>Авторизация в систему</h2>
        <Auth/>
      </div>
    </div>
  )
}

export default AuthPage