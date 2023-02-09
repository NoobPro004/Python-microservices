import React,{createContext,useState,useEffect,useCallback, useMemo, useContext} from 'react'
import { useRouter } from 'next/router'
import api from "../service/axios"
import { error } from 'console'
import { useCompactItemContext } from 'antd/es/space/Compact'

type ContextProps ={
    user: any;
    setUser: Function;
    login: Function;
    logout: Function;
    signup: Function;
}

const AuthContext = createContext({} as ContextProps)

export const Auth = ({children} : any) => {
    const [user,setUser] = useState<any>(null)
    const router = useRouter()

    const login = useCallback(async (username: string,password: string)=>{
        if(!username || !password){
            throw new Error("Please provide both credentials")
        }
        const res = await api.post("/login",{
            username: username,
            password: password
        })
        if(res.status!==200){
             throw new Error(res.error);
        }
        setUser(username)
        localStorage.setItem('accessToken',res.data)
        router.push('/home')
    },[])

    const logout = useCallback(() => {
        localStorage.remove("accessToken")
        setUser(null)
        router.push('/login')
    },[])

    const signup = useCallback(()=>{

    },[])

    const valuePass = useMemo(()=>{
        return {
            user,
            setUser,
            login,
            logout,
            signup
        }
    },[user,login,logout,signup])

  return (
    <AuthContext.Provider
        value={valuePass}
    >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
