
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function Balance(props){

    const [inputValue, setInputValue] = useState('');
    const [address,setAccountAddress] = useState('');
    const [accountBalance,setAccountBalance] = useState('');
    const provider = props.state.provider;
    const signer = props.state.signer;
    const Bank = props.state.Bank; 
    let ACBalance;   
    let tempAddress;

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setAccountAddress(inputValue);
        tempAddress = inputValue;

        balanceOf();
        setInputValue("");
        
    }

    let balanceOf = async () => {
        if (window.ethereum) {
            ACBalance = await Bank.balanceOf(tempAddress.toString());
            console.log('Balance ' + ACBalance);
            console.log(address);
            setAccountBalance(ethers.utils.formatEther(ACBalance));
        }
        else {
            alert("install metamask extension!!");
        }

    }

    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
    }   

    return(
        <>
            <form className='form' onSubmit={formSubmitHandler}>
                <div className="form-group title">
                    <label >ACCOUNT ADDRESS</label>
                    <input onChange={inputChangeHandler} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="address" placeholder="Enter Address" value={inputValue}/>
                </div>


                <div className='text-center'>
                    <button type="submit" className="btnBalance btn btn-primary">GET BALANCE</button>
                </div>
                <div className='btnBalance'> 
                    Account:{address}
                    
                    <br/>
                    Balance:{accountBalance ? accountBalance + " ETH": " "} 
                
                </div>

            </form>
        </>
    );
}

export default Balance;