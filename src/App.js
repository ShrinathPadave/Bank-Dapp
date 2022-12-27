import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Balance from './Balance';
import Withdraw from './withdraw';
import Transfer from './transfer';
import Deposit from './deposit';
import abi from "./abi/bankabi.json";


function App() {
  const [accountAddress, setAccountAddress] = useState('');
  const [state, setState] = useState({
    Bank: null,
    signer: null,
    provider: null
  });
  const [render,setRender] = useState({
    balanceOf:true,
    deposit:false,
    withdraw:false,
    transfer:false
  });
  
  const [accountBalance, setAccountBalance] = useState('');
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  async function connectMetamask() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccountAddress(accounts);
      const signer = provider.getSigner();
      const address1 = await signer.getAddress();

      const Bank = new ethers.Contract(contractAddress, abi, signer);
      //For getting address and Balance of connected wallet address.
      /*console.log(ethers.utils.getAddress(accounts[0]));
      setAccountBalance(ethers.utils.formatEther(Balance));
      console.log(accountBalance); */

      setState({ Bank, signer, provider });
    } else {
      alert("install metamask extension!!")
    }
    /* const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider()); */

  }


  return (
    <>
    <div className='bg'>

    
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">BANK</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navpos" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={()=>{
                  setRender({
                    balanceOf: true,
                    deposit: false,
                    withdraw: false,
                    transfer: false
                  })
                }}>BALANCE</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={()=>{                  
                  setRender({
                    balanceOf: false,
                    deposit: true,
                    withdraw: false,
                    transfer: false
})
                }}>DEPOSIT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={()=>{
                  setRender({
                    balanceOf: false,
                    deposit: false,
                    withdraw: true,
                    transfer: false
                  })

                }}>WITHDRAW</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={()=>{
                  setRender({
                    balanceOf: false,
                    deposit: false,
                    withdraw: false,
                    transfer: true
                  })
                }}>TRANSFER</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <button id='connect' onClick={connectMetamask} className="buttonClass "> {accountAddress ? accountAddress : "CONNECT"}</button>
        {render.balanceOf ? <Balance state={state} /> : " "}
        {render.deposit ? <Deposit state={state} /> : ""}
        {render.withdraw ? <Withdraw state={state} /> : ""}
        {render.transfer ? <Transfer state={state} /> : ""}

      </div>
      </div>
    </>
  );
}

export default App;
