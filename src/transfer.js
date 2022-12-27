import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function Transfer(props) {

    const [recipient,setRecipient] = useState('');
    const [inputValue, setInputValue] = useState('');
    let amount;
    let recipientaddress;
    const provider = props.state.provider;
    const signer = props.state.signer;
    const Bank = props.state.Bank;

    const formSubmitHandler = (event) => {
        event.preventDefault();

        recipientaddress = recipient;
        console.log(recipientaddress);
        amount = ethers.utils.parseEther(inputValue);
        console.log(amount);
        transfer();
        setInputValue("");
        setRecipient("");

    }

    const onRecipientHandler = (event)=>{
        setRecipient(event.target.value);
       
    }

    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
      

    }

    const transfer = async () => {
        let transferTx = await Bank.transferAmount(recipientaddress.toString(), amount);
    }

    return (
        <>
            <form className='form' onSubmit={formSubmitHandler}>
                <div className="form-group title">
                    <label >RECIPIENT ADDRESS</label>
                    <input onChange={onRecipientHandler} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="address" placeholder="Enter Address" value={recipient}/>
                </div>
                <div className="form-group title">
                    <label >Amount</label>
                    <input onChange={inputChangeHandler} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="address" placeholder="Enter Amount"  value={inputValue}/>
                </div>

                <div className='text-center'>
                    <button type="submit" className="btnBalance btn btn-primary">TRANSFER</button>
                </div>
            </form>
        </>
    );

}
export default Transfer;