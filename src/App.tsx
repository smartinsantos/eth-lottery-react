import React from 'react'
import './App.css'
import { enter, getBalance, getManager, getPlayers, pickWinner } from 'contracts-api/lottery'
import { web3i } from 'web3i'

function App() {
  const [manager, setManager] = React.useState<string>()
  const [players, setPlayers] = React.useState<string[]>([])
  const [balance, setBalance] = React.useState<string>()
  const [value, setValue] = React.useState<string>()
  const [entering, setEntering] = React.useState<boolean>(false)
  const [pickingWinner, setPickingWinner] = React.useState<boolean>(false)
  const [hydrateCount, setHydrateCount] = React.useState<number>(0)

  React.useEffect(() => {
    const hydrateState = async () => {
      const manager = await getManager()
      setManager(manager)

      const players = await getPlayers()
      setPlayers(players)

      const balance = await getBalance()
      setBalance(balance)
    }
    hydrateState()
  }, [hydrateCount])

  return (
    <div className="lottery-contract-app">
      <h2>Lottery Contract</h2>
      <p>Manager: {manager}</p>
      <div>
        <span>Players: </span>
        {players.length > 0 ? JSON.stringify(players, null, 2) : 'No players yet'}
      </div>
      <p>Balance: {balance} eth</p>
      <hr />
      <form
        onSubmit={async event => {
          event.preventDefault()
          setEntering(true)
          const accounts = await web3i.eth.getAccounts()
          const account = accounts[0]
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const weiValue = web3i.utils.toWei(value, 'ether')
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          await enter(account, weiValue)
          setEntering(false)
          setHydrateCount(hydrateCount + 1)
        }}
      >
        <h4>Want to try your luck ?</h4>
        <div>
          <label>Amount of eth to enter </label>
          <input value={value} onChange={event => setValue(event.target.value)} />
          <button>Enter</button>
        </div>
        {entering ? <div>Entering... Please Wait</div> : null}
      </form>
      <hr />
      <div>
        <h4>Time to pick a winner?</h4>
        <button
          onClick={async () => {
            setPickingWinner(true)
            const accounts = await web3i.eth.getAccounts()
            const account = accounts[0]
            await pickWinner(account)
            setPickingWinner(false)
            setHydrateCount(hydrateCount + 1)
          }}
        >
          Pick Winner
        </button>
        {pickingWinner ? <div>Waiting on transaction success!</div> : null}
      </div>
    </div>
  )
}

export default App
