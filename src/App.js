import Home from './Home'
import Profile from './Profile'
import EditProfile from './EditProfile'
import About from './About'
import Splash from './Splash'
import {Routes, Route} from "react-router-dom"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="about" element={<About />} />
        <Route path="splash" element={<Splash />} />
      </Routes>
    </>
  )
}

export default App
