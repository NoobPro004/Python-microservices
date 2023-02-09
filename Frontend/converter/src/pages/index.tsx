import Head from 'next/head'
import Image from 'next/image'
import { useAuth } from '../context/auth'
import {  Spin } from 'antd'
import styles from '../styles/home.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const {user} = useAuth()
  const router = useRouter()

  useEffect(()=>{
    if(!user){
      router.push('/login?error=please login first')
      return 
    }

    router.push('/home')
  },[user])

  return (
    <div className={styles.allCenter}>
      <Spin style={{fontSize:"30%"}}></Spin>
    </div>
  )
}
