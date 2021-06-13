import React, { useEffect } from 'react'
import Navigator from './app/navigators'
import Toast from 'react-native-toast-message'
import SplashScreen from 'react-native-splash-screen'
import NetWorkStatus from './app/components/NetworkStatus'
import { ToastConfig } from './app/components/ToastMessage'
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
