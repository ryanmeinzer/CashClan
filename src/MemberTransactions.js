import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const MemberTransactions = ({transactions, members}) => {

    const {member} = useMemberContext()
    const [memberTransactions, setMemberTransactions] = useState([])
    const [memberId, setMemberId] = useState()

    useEffect(() => {
        member
            && fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`)
                .then((obj) => obj.json())
                .then(json => transactions.filter(transaction => transaction.status === 'complete' && (transaction.seller_id === json.id || transaction.buyer_id === json.id), setMemberId(json.id)))
                .then(memberTransactions => setMemberTransactions(memberTransactions.sort(function (a, b) {return a.created_at - b.created_at})))
                .catch(error => error)
    }, [member, transactions])

    const findName = (id) => {
        return members && members.find(member => member.id === id) ? members.find(member => member.id === id).name : '[terminated member]'
    }

    return (
        memberTransactions.length > 0
            ?
            <div>
                <h1>Transactions:</h1>
                <ul>
                    {
                        memberTransactions.map(transaction =>
                            <li key={transaction.id}>${transaction.amount} with {findName(transaction.buyer_id === memberId ? transaction.seller_id : transaction.buyer_id)} at {transaction.location} on {new Date(transaction.created_at).toLocaleTimeString('en-us', {weekday: "long", year: "numeric", month: "short"})}</li>
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