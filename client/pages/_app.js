import '../styles/globals.css'
import  { ActionCableWrapper } from '../context/ActionCableContext'
import  { Provider } from 'react-redux'
import store from '../redux/store'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ActionCableWrapper>
        <Component {...pageProps} />
      </ActionCableWrapper>
    </Provider>
  )
}

export default MyApp
