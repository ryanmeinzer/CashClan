import React, {useEffect, useState} from 'react'
import './App.css'
import Profile from './Profile'
import Publish from './Publish'
import Members from './Members'
import Transactions from './Transactions'
import Login from './Login'
import Logout from './Logout'
import SignUp from './SignUp'

const App = () => {

  const [members, setMembers] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/members')
      .then((obj) => obj.json())
      .then(json => setMembers(json))
  }, [])

  const refreshMembersUponFormSubmit = () => {
    fetch('http://localhost:3000/members')
      .then((obj) => obj.json())
      .then(json => setMembers(json))
  }

  const refreshMembersUponSignUp = () => {
    fetch('http://localhost:3000/members')
      .then((obj) => obj.json())
      .then(json => setMembers(json))
  }

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((obj) => obj.json())
      .then(json => setTransactions(json))
  }, [])


  return (
    <>
      <h1 align="center">CashClan</h1>
      <SignUp refresh={refreshMembersUponSignUp} />
      <Login />
      <Logout />
      <Profile refresh={refreshMembersUponFormSubmit} />
      <Publish />
      <Members members={members} />
      <Transactions transactions={transactions} />
    </>
  )
}

export default App
