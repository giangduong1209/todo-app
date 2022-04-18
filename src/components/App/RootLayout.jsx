import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import { NotificationContainer } from 'react-notifications'
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <NotificationContainer />
    </>
  )
}

export default RootLayout
