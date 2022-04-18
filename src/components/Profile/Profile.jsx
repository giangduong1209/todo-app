import React, { useEffect, useState } from 'react'
import './Profile.scss'
import avatarDefault from '../../image/avatar.png'
import { Link, useNavigate } from 'react-router-dom'
import {
  getTokenInLocalStorage,
  saveTokenInLocalStorage,
} from '../../services/storage'
import { deleteAvatar, getUserAvatar, uploadAvatar } from '../../store/profile'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateUserInfo } from '../../store/user'
import { useTranslation } from 'react-i18next'
const Profile = () => {
  const [imgBoxStatus, setImgBoxStatus] = useState(false)
  const [imgUpdateBoxStatus, setImgUpdateBoxStatus] = useState(false)
  const [infoBoxStatus, setInfoBoxStatus] = useState(false)
  const userDetail = getTokenInLocalStorage('auth')
  const [avatar, setAvatar] = useState()
  const [userAvatar, setUserAvatar] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation()

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
  })

  const validationOpt = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt)

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.review)
    }
  }, [avatar])

  const id = userDetail.user._id

  useEffect(() => {
    dispatch(
      getUserAvatar({
        idUser: id,
        callback: (value) => {
          setUserAvatar(value)
        },
      })
    )
  }, [dispatch, id, userAvatar])

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0]
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|)$/i
    if (allowedExtensions.exec(file.name)[0]) {
      file.review = URL.createObjectURL(file)
      setAvatar(file)
      e.target.value = null
    } else {
      alert('Invalid File')
      setAvatar()
    }
  }

  const handleSubmitAvatar = () => {
    dispatch(
      uploadAvatar({
        dataAvatar: avatar,
        callback: (value) => {
          if (value) navigate('/todo-list')
        },
      })
    )
  }

  const handleDeleteAvatar = () => {
    dispatch(
      deleteAvatar({
        callback: (value) => {
          if (value) setUserAvatar()
        },
      })
    )
  }

  const handleSubmitUserInfo = (data) => {
    dispatch(
      updateUserInfo({
        dataUser: data,
        callback: (value) => {
          if (value) {
            userDetail.user = value.data
            saveTokenInLocalStorage('auth', userDetail)
            navigate('/todo-list')
          }
        },
      })
    )
  }

  return (
    <div className="wrapper">
      <div className="profile-card">
        <div
          className="profile-card__img"
          onClick={() => setImgBoxStatus(true)}
        >
          {userAvatar ? (
            <img src={userAvatar} alt="Avatar" />
          ) : (
            <img src={avatarDefault} alt="Avatar" />
          )}
        </div>
        {imgBoxStatus && (
          <div>
            <div className="img-box">
              <button className="img-box__delete" onClick={handleDeleteAvatar}>
                {t('description.deleteAvatar')}
              </button>
              <button
                className="img-box__update"
                onClick={() => {
                  setImgUpdateBoxStatus(true)
                  setImgBoxStatus(false)
                }}
              >
                {t('description.updateAvatar')}
              </button>
            </div>
            <div
              className="imgBox-overlay"
              onClick={() => setImgBoxStatus(false)}
            ></div>
          </div>
        )}

        <div className="profile-card__info">
          <div className="profile-card__name">{userDetail.user.name}</div>
          <div className="profile-card__age">
            {t('description.age')}: {userDetail.user.age}
          </div>
          <div className="profile-card__gmail">
            &#128231; {userDetail.user.email}
          </div>
        </div>
        <div className="profile-card__btn">
          <button
            className="profile-card__btn--editor"
            onClick={() => {
              setInfoBoxStatus(true)
              setImgBoxStatus(false)
            }}
          >
            {t('description.updateUserInfo')}
          </button>
          <div className="profile-card__btn--link">
            <Link to="/todo-list">&larr; {t('description.back')}</Link>
          </div>
        </div>
      </div>

      {infoBoxStatus && (
        <div className="edit-form">
          <div className="container">
            <div className="form">
              <h1 className="form__heading">
                {t('description.editUserInfoHeader')}
              </h1>
              <form
                className="form__block"
                onSubmit={handleSubmit(handleSubmitUserInfo)}
              >
                <label>{t('description.nameRegister')}</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register('name')}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  {...register('email')}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
                <label>{t('description.age')}</label>
                <input type="number" name="age" id="age" {...register('age')} />
                <div className="invalid-feedback">{errors.age?.message}</div>

                <button className="edit-button__upload">
                  <span>{t('description.editUserInfoUpload')}</span>
                </button>
              </form>
              <button
                className="edit-button__cancel"
                onClick={() => setInfoBoxStatus(false)}
              >
                {t('description.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {imgUpdateBoxStatus && (
        <div className="overlay-imgBox">
          <div className="update-img">
            <div className="update-img__header">
              <span></span>
              <h1>{t('description.updateAvatarHeader')}</h1>
              <button onClick={() => setImgUpdateBoxStatus(false)}>
                <span className="line-1"></span>
                <span className="line-2"></span>
              </button>
            </div>
            <div className="input-img">
              <label htmlFor="upload-img">
                {t('description.uploadAvatar')}
              </label>
              <input
                id="upload-img"
                type="file"
                onChange={handlePreviewAvatar}
              ></input>
            </div>
            <div className="review-imgBox">
              {avatar && (
                <div>
                  <img src={avatar.review} alt="avatar" />
                  <div className="line"></div>
                  <div className="btn-group">
                    <button
                      className="btn-group__upload"
                      onClick={handleSubmitAvatar}
                    >
                      {t('description.uploadAvatarSave')}
                    </button>
                    <button
                      className="btn-group__cancel"
                      onClick={() => setAvatar()}
                    >
                      {t('description.cancel')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
