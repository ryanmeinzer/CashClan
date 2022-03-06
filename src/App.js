import React, {useLayoutEffect} from 'react'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Home from './Home'
import {Routes, Route} from "react-router-dom"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="editprofile" element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App
