import React, { useEffect } from 'react'
import Navigator from './navigators'
import Toast from 'react-native-toast-message'
import SplashScreen from 'react-native-splash-screen'
import NetWorkStatus from './components/network-status'
import { ToastConfig } from './components/toast-message'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {

  useEffect(() => {
        SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
       <Navigator/>
       <NetWorkStatus/>
       <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)}/>
    </NavigationContainer>
  )
}

export default App
