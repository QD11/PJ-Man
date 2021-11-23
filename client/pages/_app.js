import '../styles/globals.css'
import  { ActionCableWrapper } from '../src/context/ActionCableContext'
import  { Provider } from 'react-redux'
// import store from '..//redux/store'
import store from '../src/redux/store'

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
