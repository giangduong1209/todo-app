import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUserPostAPI } from '../../store/auth'
import { useTranslation } from 'react-i18next'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('description.validEmail'))
      .required(t('description.requiredEmail')),
    password: Yup.string()
      .required(t('description.requiredPassword'))
      .min(8, t('description.requiredMinPassword')),
  })

  const validationOpt = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt)

  const onSubmit = (data) => {
    dispatch(
      loginUserPostAPI({
        dataUser: data,
        callback: (value) => {
          if (value) {
            navigate('/todo-list')
          }
        },
      })
    )
  }
  return (
    <div>
      <div className="login-box">
        <h2>{t('description.login')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-box">
            <input type="text" name="email" {...register('email')} />
            <label>Email</label>
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="user-box">
            <input type="password" name="password" {...register('password')} />
            <label>{t('description.password')}</label>
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="button-block">
            <button className="button-1">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {t('description.submitLogin')}
            </button>
            <button className="button-2">
              <Link to="/register">{t('description.register')}</Link>
            </button>
          </div>
        </form>
        <div className="changeLanguage-btn">
          <button
            className="changeLanguage-btn__en"
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className="changeLanguage-btn__vi"
            onClick={() => changeLanguage('vi')}
          >
            Vietnamese
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
