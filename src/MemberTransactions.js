import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const MemberTransactions = () => {

    const [transactions, setTransactions] = useState([])
    const {member} = useMemberContext()
    const [memberTransactions, setMemberTransactions] = useState([])

    useEffect(() => {
        fetch('https://cashclan-backend.herokuapp.com/transactions')
            .then((obj) => obj.json())
            .then(json => setTransactions(json))
    }, [])

    useEffect(() => {
        member
            && fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`)
            .then((obj) => obj.json())
            .then(json => transactions.filter(transaction => transaction.status === 'complete' && (transaction.seller_id === json.id || transaction.buyer_id === json.id)))
            .then(memberTransactions => setMemberTransactions(memberTransactions.sort(function (a, b) {return a.created_at - b.created_at})))
            .catch(error => error)
    }, [member, transactions])

    return (
        memberTransactions.length > 0
            ?
            <div>
                <h1>Transactions:</h1>
                <ul>
                    {
                        memberTransactions.map(transaction =>
                            <li key={transaction.id}>${transaction.amount} at {transaction.location}</li>
                        )
                    }
                </ul>
            </div>
            :
            <div>
                <h1>Transactions:</h1>
                <p>You do not have any transactions yet.</p>
            </div>
    )
}

export default MemberTransactions