import Home from './Home'
import Profile from './Profile'
import {Routes, Route} from "react-router-dom"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
