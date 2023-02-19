import type { AppProps } from 'next/app'
import {Auth} from "../context/auth"
import '../styles/globals.css'
import '../styles/ant.css'
import { ConfigProvider } from 'antd'

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
};

const data: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#3457D5',
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth>
      <ConfigProvider theme={{ token: { colorPrimary: data.colorPrimary, borderRadius: data.borderRadius } }}>
        <Component {...pageProps}></Component>
      </ConfigProvider>
    </Auth>
  )
}
