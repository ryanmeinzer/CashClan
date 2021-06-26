import React, {useEffect, useState} from 'react'
import NewGiver from './NewGiver'
import Givers from './Givers'
import Getters from './Getters'
import Transactions from './Transactions'

const App = () => {

  const [givers, setGivers] = useState([])
  const [getters, setGetters] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/getters')
      .then((obj) => obj.json())
      .then(json => setGetters(json))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/givers')
      .then((obj) => obj.json())
      .then(json => setGivers(json))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((obj) => obj.json())
      .then(json => setTransactions(json))
  }, [])

  return (
    <>
      <NewGiver />
      <Givers givers={givers} />
      <Getters getters={getters}/>
      <Transactions transactions={transactions}/>
    </>
  )
}

export default App
