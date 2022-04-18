import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-notifications/lib/notifications.css'
import './Register.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { userPostAPI } from '../../store/auth'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
const Register = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let navigate = useNavigate()
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('description.requiredName'))
      .min(4, t('description.requiredMinName'))
      .max(128, t('description.requiredMaxName')),
    email: Yup.string()
      .email(t('description.validEmail'))
      .required(t('description.requiredEmail')),
    age: Yup.number()
      .typeError(t('description.numberAge'))
      .min(10, t('description.requiredMinAge'))
      .required(t('description.requiredAge')),
    password: Yup.string()
      .required(t('description.requiredPassword'))
      .min(8, t('description.requiredMinPassword')),
    confirmPassword: Yup.string()
      .required(t('description.requiredConfirmPassword'))
      .oneOf(
        [Yup.ref('password')],
        t('description.requiredConfirmPasswordMatch')
      ),
  })

  const validationOpt = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt)

  const onSubmit = (data) => {
    dispatch(
      userPostAPI({
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
    <div className="container">
      <div className="form">
        <h1 className="form__heading">{t('description.register')}</h1>
        <form className="form__block" onSubmit={handleSubmit(onSubmit)}>
          <label>{t('description.nameRegister')}</label>
          <input
            type="text"
            name="name"
            id="name"
            className=""
            {...register('name')}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className=""
            {...register('email')}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
          <label>{t('description.age')}</label>
          <input
            type="number"
            name="age"
            id="age"
            className=""
            {...register('age')}
          />
          <div className="invalid-feedback">{errors.age?.message}</div>
          <label>{t('description.password')}</label>
          <input
            type="password"
            name="password"
            id="password"
            className=""
            {...register('password')}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <label>{t('description.confirmPassword')}</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className=""
            {...register('confirmPassword')}
          />

          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
          <button className="register-button">
            <span>{t('description.register')}</span>
          </button>
          <div className="login-block">
            <Link to="/login">{t('description.login')} &rarr;</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
