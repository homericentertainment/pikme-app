import { Provider } from 'react-redux'
import {store}  from './store/index'
import Root from './root'

export default function App() {
  
  return (
    <Provider store={store}>
    <Root />
  </Provider>
  )
}
