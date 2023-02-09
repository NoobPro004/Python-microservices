import type { AppProps } from 'next/app'
import {Auth} from "../context/auth"
import '../styles/globals.css'
import '../styles/ant.css'
import { ConfigProvider } from 'antd'

ConfigProvider.config({
  theme:{
    primaryColor: '#33CCFF',
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth>
      <ConfigProvider>
        <Component {...pageProps}></Component>
      </ConfigProvider>
    </Auth>
  )
}
