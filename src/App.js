
import { useEffect, useState } from 'react';
import Sign from './components/Sign';
import Web3 from 'web3';


function App() {

  const [connectState, setConnectState] = useState(false)
  const [hasWallet, setHasWallet] = useState(false)
  const [nonce, setNonce] = useState()

  const connect=async()=>{

    const web3 = new Web3(window.ethereum)

    try {
      const { ethereum } = window

      await ethereum.request({method: 'eth_requestAccounts'})
      const accounts = await web3.eth.getAccounts()
      accounts.length > 0 && setConnectState(true)

    } catch (err) {

      console.log(err)

    }
    
  }

  const checkWallet=async()=>{

    
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()

    accounts.length > 0 && setConnectState(true)

    try {
      const { ethereum } = window
      ethereum.isMetaMask && setHasWallet(true)
    } catch (err) {
      console.log(err)
    }



  }

  useEffect(()=>{
    checkWallet()
  })

  

 

  return (
    <div className="App">

      <button onClick={hasWallet ? connect : ()=>alert("install metamask")}>{"connect wallet"}</button>

      <Sign />

    </div>
  );
}

export default App;
