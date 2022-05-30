import React, {useState} from "react";

import {ethers} from 'ethers';

const Check =() =>{

    const text = "check you NFT";
    const [ethtype,setethtype] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
    const [userNet, setUserNet] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const connectWallethandler =() =>{
        if(window.ethereum){
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result => {
                accountChangeHandler(result[0]);
            })
        }else{
            console.log("Not Find MetaMask")
            setErrorMessage('Please Install MetaMask');
        }
    }

    const accountChangeHandler =(newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
    }

    const getUserBalance = (address) =>{
        window.ethereum.request({method:'eth_getBalance',params:[address,'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
            // userNet = window.ethereum.networkVersion;
            setUserNet(window.ethereum.networkVersion);
        })
        .catch(error => {
            setErrorMessage(error.message)
        });
    }

    window.ethereum.on('accountsChanged',accountChangeHandler);

    return (
        <div>
            <button onClick={connectWallethandler}> {text}</button>
            <div>
                <h3> Result: {ethtype}</h3>
            </div>
            {errorMessage}
        </div>
    )
}
export default Check;
