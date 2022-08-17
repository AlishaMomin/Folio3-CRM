import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
// import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('ROLE')
        localStorage.removeItem('ID')
        localStorage.removeItem('EMAILID')
        localStorage.removeItem('Name')
        localStorage.removeItem('RoleName')
        localStorage.removeItem('CompanyName')
        localStorage.removeItem('HostCompanyName')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }

        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (body) => {
        try {
            await axios.post("http://localhost:5000/auth/login", body)
              .then((response) => {
                console.log("Data recieved");
                const results = response.data; 
                const accessToken = response.data[0].access_token;
                localStorage.setItem('ROLE',response.data[0].roleId);
                localStorage.setItem('ID',response.data[0].companyId);
                localStorage.setItem('EMAILID',jwtDecode(accessToken).Email)
                localStorage.setItem('Name',jwtDecode(accessToken).Name)
                localStorage.setItem('RoleName',jwtDecode(accessToken).RoleName)
                localStorage.setItem('CompanyName',response.data[0].companyName)
                localStorage.setItem('HostCompanyName',response.data[0].hostCompanyName)
                let roleo = '';
                if (response.data[0].roleId === 1)
                {
                    roleo = 'admin';
                }
                else if (response.data[0].roleId === 2)
                {
                    roleo = 'host';
                }
                else
                {
                    roleo = 'client';
                }
                const user = {role: roleo};
                    setSession(accessToken)

                    console.log(accessToken)
                    console.log(user)
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            user,
                        },
                    })
              })
      
          } catch (err) {
            console.log(err);
            window.alert('Incorrect Credential');
          }

    }

    const logout = () => {
        console.log("LogOut mein Aa gaya")
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = localStorage.getItem('accessToken')
                if (accessToken && isValidToken(accessToken))
                {
                    console.log("USE EFFECT  ",parseInt(localStorage.getItem('ROLE'),10))
                    let roleo = "";
                    if (parseInt(localStorage.getItem('ROLE'),10) === 1)
                    {
                        
                        roleo = 'admin';
                    }
                    else if (parseInt(localStorage.getItem('ROLE'),10) === 2)
                    {
                        roleo = 'host';
                    }
                    else
                    {
                        roleo = 'client';
                    }
                    const user = {role: roleo};
                    setSession(accessToken)

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } 
                else 
                {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <></>
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
