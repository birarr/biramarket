import { initializeApp } from 'firebase/app'
import { useState } from 'react'
import { AppContext } from './components/context'

import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { Home } from './views/Home'

import './styles.css'

function App() {
  const [listItems, setListItems] = useState([])

  const firebaseConfig = {
    apiKey: 'AIzaSyChAwkLKHHloFXuzwRRAcavYcdxghyWwdQ',
    authDomain: 'biramarket-49981.firebaseapp.com',
    projectId: 'biramarket-49981',
    storageBucket: 'biramarket-49981.appspot.com',
    messagingSenderId: '945730541571',
    appId: '1:945730541571:web:765452ad7f605b18521636',
  }

  initializeApp(firebaseConfig)

  return (
    <div className="App">
      <AppContext.Provider value={{ listItems, setListItems }}>
        <Navbar className="navbar" />
        <div className="appList">
          <Header className="header" />
          <Home className="home" />
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
