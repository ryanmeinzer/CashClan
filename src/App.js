import React, {useEffect, useState} from 'react'
import NewMember from './NewMember'
import Members from './Members'
import Transactions from './Transactions'

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

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((obj) => obj.json())
      .then(json => setTransactions(json))
  }, [])

  const getTransactionSellerName = (id) => {
    fetch(`http://localhost:3000/transactions/${id}`)
      .then(response => response.text())
      // .then(text => console.log(text))
      .then(text => text)
  }

  return (
    <>
      <h1 align="center">CashClan</h1>
      <NewMember refresh={refreshMembersUponFormSubmit} />
      <Members members={members} />
      <Transactions transactions={transactions} sellerName={getTransactionSellerName}/>
    </>
  )
}

export default App
