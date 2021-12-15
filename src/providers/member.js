import React, {createContext, useState} from 'react'

export const MemberContext = createContext()

export const MemberProvider = ({children}) => {
    const [member, setMember] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    return (
        <MemberContext.Provider value={{member, setMember, isLoggedIn, setIsLoggedIn}}>
            {children}
        </MemberContext.Provider>
    )
}

export const useMemberContext = () => {
    const context = React.useContext(MemberContext)
    if (context === undefined) {
        throw new Error('useMemberContext must be used within a MemberProvider')
    }
    return context
}