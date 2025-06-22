import Header from "../Common/Header.tsx"
import Footer from "../Common/Footer.tsx"
import { Outlet } from "react-router-dom"
const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header/>
      {/* Main Component */}
      <main>
        <Outlet/>
      </main>
      {/* Footer */}
      <Footer/>
    </>
  )
}

export default UserLayout
