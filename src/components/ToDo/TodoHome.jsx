import { Link } from 'react-router-dom'
import './TodoHome.scss'
import { useTranslation } from 'react-i18next'

const ToDoHome = () => {
  const { t } = useTranslation()

  return (
    <div className="home">
      <div className="home__header">
        <h1>{t('description.welcomeHeader')}</h1>
        <div className="home__header--login">
          <Link to="todo-list">{t('description.redirectToDoList')}</Link>
        </div>
      </div>
    </div>
  )
}

export default ToDoHome
