import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(); //creating context

const UserContextProvider = ({ children }) => {
    const [Auth, setAuth] = useState(false)
    const [userData, setUserData] = useState({})
    useEffect(() => {
        const UserAuthorityTest = (async () => {
            try {
                const res = await fetch('/api/Tokentest', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
                if (res.status === 200) {
                    setAuth(true)
                    return true
                }
                else {
                    setAuth(false)
                    return false
                }
            } catch (error) {
                setAuth(false)
                console.log(error)
                return false
            }
        })
        UserAuthorityTest()
        return
    }, [])
    useEffect(() => {
        const getUserData = (async () => {
            try {
                const res = await fetch('/api/userProfile', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
                const data = await res.json()
                if (res.status === 200) {
                    setAuth(true)
                    setUserData(data)
                    return
                }
                else {
                    return
                }
            } catch (error) {
                return
            }
        })
        return () => {
            getUserData()
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                Auth,
                setAuth,
                userData
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
