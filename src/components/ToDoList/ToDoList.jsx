import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutUserAccount } from '../../store/auth'
import './ToDoList.scss'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  addNewTask,
  deleteTask,
  getAllTask,
  updateStatusTask,
} from '../../store/tasks'
import { getTokenInLocalStorage } from '../../services/storage'
import { getUserAvatar } from '../../store/profile'
import avatarDefault from '../../image/avatar.png'

const ToDoList = () => {
  const [logoutBoxStatus, setLogoutBoxStatus] = useState(false)
  const [userBoxStatus, setUserBoxStatus] = useState(false)
  const [addNewTaskStatus, setAddNewTaskStatus] = useState(false)
  const [editTaskStatus, setEditTaskStatus] = useState(false)
  const [avatar, setAvatar] = useState()
  const [dataEdit, setDataEdit] = useState(false)
  const [idTask, setIdTask] = useState()
  const [descriptionStatusBox, setDescriptionStatusBox] = useState(false)
  const [deleteTaskBox, setDeleteTaskBox] = useState(false)
  const [checkedStatus, setCheckedStatus] = useState(false)
  const [descriptionInput, setDescriptionInput] = useState('')
  const [dataDescriptionEdit, setDataDescriptionEdit] = useState('')
  const loading = useSelector((state) => state.tasks.loading)

  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const formSchema = Yup.object().shape({
    description: Yup.string().required(
      t('description.taskDescriptionRequired')
    ),
  })
  const validationOpt = { resolver: yupResolver(formSchema) }
  const userDetails = getTokenInLocalStorage('auth')

  const id = userDetails.user._id

  useEffect(() => {
    dispatch(
      getUserAvatar({
        idUser: id,
        callback: (value) => {
          setAvatar(value)
        },
      })
    )
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getAllTask())
  }, [dispatch])

  const allTasks = useSelector((state) => state.tasks.data)
  const dataAllTask = allTasks.data

  const dataAllTaskArr = dataAllTask?.data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt)

  const logoutUser = () => {
    dispatch(
      logOutUserAccount({
        callback: (res) => {
          if (res) navigate('/login')
        },
      })
    )
  }

  const handleDescriptionInputField = (e) => {
    setDescriptionInput(e.target.value)
  }

  const onSubmit = () => {
    dispatch(
      addNewTask({
        dataTask: descriptionInput,
        callback: (value) => {
          if (value) {
            setAddNewTaskStatus(false)
            setDescriptionInput('')
          }
        },
      })
    )
  }

  const handleCheckedBox = (e) => {
    setDataEdit(e.target.checked)
    setCheckedStatus(e.target.checked)
  }

  const handleValueInputField = (e) => {
    setDataDescriptionEdit(e.target.value)
  }

  const onEditTaskSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateStatusTask({
        id: idTask,
        // dataDescription: dataDescriptionEdit,
        dataStatusTask: dataEdit,
        callback: (value) => {
          if (value) {
            setEditTaskStatus(false)
            setCheckedStatus(false)
            navigate('/todo-list')
          }
        },
      })
    )
  }

  const handleDeleteTask = () => {
    dispatch(
      deleteTask({
        id: idTask,
        callback: (val) => {
          if (val) {
            navigate('/todo-list')
            setDeleteTaskBox(false)
          }
        },
      })
    )
  }

  return (
    <div className="todo">
      {loading && (
        <div className="loader">
          <div className="pencil">
            <div className="pencil__ball-point"></div>
            <div className="pencil__cap"></div>
            <div className="pencil__cap-base"></div>
            <div className="pencil__middle"></div>
            <div className="pencil__eraser"></div>
          </div>
          <div className="line"></div>
          <h2>Page Loading...Please Wait</h2>
        </div>
      )}

      <div className="todoHeader">
        <h1 className="todoHeader__header">To Do</h1>
        <div className="todoHeaderUser">
          <div className="changeLanguagePri-btn">
            <button
              className="changeLanguagePri-btn__en"
              onClick={() => changeLanguage('en')}
            >
              En
            </button>
            <button
              className="changeLanguagePri-btn__vi"
              onClick={() => changeLanguage('vi')}
            >
              Vi
            </button>
          </div>
          <div className="todoHeaderUser__info">
            {avatar ? (
              <img src={avatar} alt="Avatar" />
            ) : (
              <img src={avatarDefault} alt="Avatar Default" />
            )}
            <span className="userInfo" onClick={() => setUserBoxStatus(true)}>
              {userDetails.user.name} &#128315;
            </span>
          </div>

          {userBoxStatus && (
            <div className="todoHeaderUser__menu">
              <div className="todoHeaderUser__link">
                <Link to="/profile">
                  &#128100;{t('description.profileUser')}
                </Link>
              </div>
              <div
                className="todoHeaderUser__LogoutBtn"
                onClick={() => {
                  setLogoutBoxStatus(true)
                  setUserBoxStatus(false)
                }}
              >
                &#10145; {t('description.logout')}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="overlayUserBox"
        onClick={() => setUserBoxStatus(false)}
      ></div>

      {logoutBoxStatus && (
        <div className="notify-block">
          <div className="notify-block__background">
            <div className="notify-content">
              <h1 className="notify-content__header">
                {t('description.logoutBoxHeader')}
              </h1>
              <div className="notify-content__btn">
                <button
                  className="notify-content__btn--success"
                  onClick={logoutUser}
                >
                  {t('description.logoutBoxYes')}
                </button>
                <button
                  className="notify-content__btn--failed"
                  onClick={() => setLogoutBoxStatus(false)}
                >
                  {t('description.logoutBoxNo')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="todoBody" onClick={() => setUserBoxStatus(false)}>
        <div className="todoGroup">
          <div className="todoGroupList">
            <div className="listHeader">
              <h1>{t('description.task')}</h1>
              <button
                className="listHeader__btn"
                onClick={() => {
                  setAddNewTaskStatus(true)
                }}
              >
                {t('description.newTask')}
              </button>
            </div>
            <div className="listGroup-box">
              <table className="listGroup">
                <thead>
                  <tr>
                    <th>{t('description.idTask')}</th>
                    <th>{t('description.taskName')}</th>
                    <th>{t('description.new')}</th>
                    <th>{t('description.completed')}</th>
                    <th>{t('description.update')}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAllTaskArr &&
                    dataAllTaskArr.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td className="nameTask-item">{value.description}</td>
                          {!value.completed ? (
                            <td className="new-status">
                              <span>&#10004;</span>
                            </td>
                          ) : (
                            <td className="new-status">
                              <span></span>
                            </td>
                          )}
                          {value.completed ? (
                            <td className="done-status">
                              <span>&#10004;</span>
                            </td>
                          ) : (
                            <td className="done-status">
                              <span></span>
                            </td>
                          )}
                          {!value.completed ? (
                            <td className="edit">
                              <span
                                onClick={() => {
                                  setIdTask(value._id)
                                  setEditTaskStatus(true)
                                  setDescriptionStatusBox(false)
                                }}
                              >
                                {t('description.edit')}
                              </span>
                              <span></span>
                              <span
                                onClick={() => {
                                  setDeleteTaskBox(true)
                                  setIdTask(value._id)
                                }}
                              >
                                {t('description.delete')}
                              </span>
                            </td>
                          ) : (
                            <td className="delete">
                              <span
                                onClick={() => {
                                  setDeleteTaskBox(true)
                                  setIdTask(value._id)
                                }}
                              >
                                {t('description.delete')}
                              </span>
                            </td>
                          )}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {addNewTaskStatus && (
        <div className="overlayAddTask" onClick={() => setUserBoxStatus(false)}>
          <div className="addTask-box">
            <div className="addTask-background">
              <div className="addTask-box__header">
                <h2>{t('description.addNewTask')}</h2>
              </div>
              <div className="addTask-box__content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="addTask-box__field">
                    <label htmlFor="taskDescription">
                      {t('description.description')}
                    </label>
                    <input
                      name="description"
                      id="description"
                      value={descriptionInput}
                      {...register('description')}
                      onChange={handleDescriptionInputField}
                    />
                  </div>
                  <div className="invalid-feedback__content">
                    {errors.description?.message}
                  </div>
                  <div className="addTask-box__btn">
                    <button className="addTask-box__btn--create">
                      {t('description.create')}
                    </button>
                    <button
                      className="addTask-box__btn--cancel"
                      onClick={() => setAddNewTaskStatus(false)}
                    >
                      {t('description.cancel')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {editTaskStatus && (
        <div className="overlayAddTask">
          <div className="addTask-box">
            <div className="addTask-background">
              <div className="addTask-box__header">
                <h2>{t('description.updateTask')}</h2>
              </div>
              <div className="addTask-box__content">
                <form onSubmit={onEditTaskSubmit}>
                  <div className="checkBoxShowField">
                    <div className="checkBoxShowField-label">
                      <label htmlFor="">{t('description.description')}</label>
                      <span
                        htmlFor="checkBoxDes"
                        onClick={() => setDescriptionStatusBox(true)}
                      >
                        &#9997; {t('description.updateTask')}
                      </span>
                    </div>
                  </div>
                  {descriptionStatusBox && (
                    <>
                      <div className="addTask-box__field">
                        <input
                          name="description"
                          id="description"
                          required
                          onChange={handleValueInputField}
                        />
                      </div>
                    </>
                  )}

                  <div className="addTask-box__field-check">
                    <label htmlFor="taskStatus">
                      {t('description.status')}
                    </label>
                    <div className="input-checked__box">
                      <input
                        type="checkbox"
                        name="completed"
                        id="completed"
                        value={checkedStatus}
                        onChange={handleCheckedBox}
                      />
                      <span>{t('description.completed')}</span>
                    </div>
                  </div>
                  <div className="invalid-feedback__content">
                    {errors.status?.message}
                  </div>
                  <div className="addTask-box__btn">
                    <button className="addTask-box__btn--create">
                      {t('description.update')}
                    </button>
                    <button
                      className="addTask-box__btn--cancel"
                      onClick={() => {
                        setEditTaskStatus(false)
                        setCheckedStatus(false)
                      }}
                    >
                      {t('description.cancel')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteTaskBox && (
        <div className="notify-block">
          <div className="notify-block__background">
            <div className="notify-content">
              <h1 className="notify-content__header">
                {t('description.deleteTask')}
              </h1>
              <div className="notify-content__btn">
                <button
                  className="notify-content__btn--success"
                  onClick={handleDeleteTask}
                >
                  {t('description.delete')}
                </button>
                <button
                  className="notify-content__btn--failed"
                  onClick={() => setDeleteTaskBox(false)}
                >
                  {t('description.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToDoList
