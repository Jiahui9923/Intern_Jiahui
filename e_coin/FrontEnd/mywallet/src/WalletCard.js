import React, {useState} from "react";

import {ethers} from 'ethers';

const WalletCard =() =>{
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

    // const getUserNet = (address) =>{
    //     if(window.ethereum){
    //         setUserNet(window.ethereum.networkVersion)
    //     }else{
    //         console.log("Not Find MetaMask")
    //         setErrorMessage('Please Install MetaMask');
    //     }
    // }

    window.ethereum.on('accountsChanged',accountChangeHandler);

    return (
        <div>
            <button onClick={connectWallethandler}> {connButtonText}</button>
            <div>
                <h3> Address:{defaultAccount}</h3>
            </div>
            <div>
                <h3> Balance: {userBalance}</h3>
                <h3> Net Type: {userNet}</h3>
            </div>
            {errorMessage}
        </div>
    )
}
export default WalletCard;