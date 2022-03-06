import React, {useLayoutEffect} from 'react'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Home from './Home'
import {Routes, Route} from "react-router-dom"

const App = () => {

  // hard refresh if member has left app/page and returns
  // const onVisibilityChange = () => {
  //   if (document.visibilityState === 'visible') {
  //     window.location.reload(true)
  //   }
  // }
  // useLayoutEffect(() => {
  //   document.addEventListener("visibilitychange", onVisibilityChange)
  //   return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  // }, [])

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
