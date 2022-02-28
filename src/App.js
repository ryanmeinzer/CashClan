import React, {useEffect, useState} from 'react'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Home from './Home'
// uncommenting the below, used merely for testing and development purposes
// import Members from './Members'
// import Transactions from './Transactions'
import {Routes, Route} from "react-router-dom"

const App = () => {

  const [members, setMembers] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch('https://cashclan-backend.herokuapp.com/members')
      .then((obj) => obj.json())
      .then(json => setMembers(json))
  }, [])

  useEffect(() => {
    fetch('https://cashclan-backend.herokuapp.com/transactions')
      .then((obj) => obj.json())
      .then(json => setTransactions(json))
  }, [])

  const refreshMembersUponFormSubmit = () => {
    fetch('https://cashclan-backend.herokuapp.com/members')
      .then((obj) => obj.json())
      .then(json => setMembers(json))
  }

  const refreshMembersUponSignUp = () => {
    fetch('https://cashclan-backend.herokuapp.com/members')
      .then((obj) => obj.json())
      .then(json => setMembers(json))
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home refreshMembersUponSignUp={refreshMembersUponSignUp} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="editprofile" element={<EditProfile refreshMembersUponFormSubmit={refreshMembersUponFormSubmit} transactions={transactions} members={members} />} />
        {/* uncommenting the below, used merely for testing and development purposes */}
        {/* <Route path="members" element={<Members members={members} />} />
        <Route path="transactions" element={<Transactions transactions={transactions} />} /> */}
      </Routes>
    </>
  )
}

export default App
