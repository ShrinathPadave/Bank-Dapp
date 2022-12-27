import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function Deposit(props) {
    const [inputValue, setInputValue] = useState('');
    const provider = props.state.provider;
    const signer = props.state.signer;
    const Bank = props.state.Bank;

    let amount;
    const formSubmitHandler = (event) => {
        event.preventDefault();
        amount = ethers.utils.parseEther(inputValue);
        console.log(amount);
        deposit();
        setInputValue("");
    }

    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
    }
    let deposit = async () => {
        const address1 = await signer.getAddress();
        let depositTx = await Bank.deposit({ from: address1, value: amount, nonce: 0 });
    }

    return (
        <>
            <form className='form' onSubmit={formSubmitHandler}>
                <div className="form-group title">
                    <label >Amount</label>
                    <input onChange={inputChangeHandler} type="text" name="amount" className="form-control" id="exampleInputEmail1" aria-describedby="address" placeholder="Enter Amount" value={inputValue} />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btnBalance btn btn-primary">DEPOSIT</button>
                </div>
            </form>
        </>
    );
}

export default Deposit;