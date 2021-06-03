import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './navigators'
import { ToastConfig } from './components/toast-message'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <NavigationContainer>
       <Navigator/>
       <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)}/>
    </NavigationContainer>
  )
}

export default App
