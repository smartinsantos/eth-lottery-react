import React from 'react'
import logo from './logo.svg'
import './App.css'
import { web3i } from 'web3i'

function App() {
  web3i.eth.getAccounts().then(accounts => console.log('accounts => ', accounts))
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
