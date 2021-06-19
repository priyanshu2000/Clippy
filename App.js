import React, { useEffect } from 'react'
import Navigator from './app/navigators'
import Toast from 'react-native-toast-message'
import SplashScreen from 'react-native-splash-screen'
import NetWorkStatus from './app/components/NetworkStatus'
import { ToastConfig } from './app/components/ToastMessage'
import { CollectionProvider } from './app/utils/CollectionContext'

const App = () => {

  useEffect(() => {
        SplashScreen.hide()
  }, [])

  return (
    <CollectionProvider>
       <Navigator/>
       <NetWorkStatus/>
       <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)}/>
    </CollectionProvider>
  )
}

export default App
