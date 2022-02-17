import React, {useEffect, useState} from 'react'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Home from './Home'
import Members from './Members'
import Transactions from './Transactions'
import {Routes, Route} from "react-router-dom"

const App = () => {

  const [members, setMembers] = useState([])
  const [transactions, setTransactions] = useState([])

  // ToDo - implement below or another props-based approach to refreshing for new matches
  // const [time, setTime] = useState(Date.now())

  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 5000)
  //   fetch('https://cashclan-backend.herokuapp.com/members')
  //     .then((obj) => obj.json())
  //     .then(json => setMembers(json))
  //     .finally(console.log('inside App - refetched'))
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [time])

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

  useEffect(() => {
    fetch('https://cashclan-backend.herokuapp.com/transactions')
      .then((obj) => obj.json())
      .then(json => setTransactions(json))
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home members={members} refreshMembersUponSignUp={refreshMembersUponSignUp} transactions={transactions} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="editprofile" element={<EditProfile refreshMembersUponFormSubmit={refreshMembersUponFormSubmit} />} />
        <Route path="members" element={<Members members={members} />} />
        <Route path="transactions" element={<Transactions transactions={transactions} />} />
      </Routes>
    </>
  )
}

export default App
