// import logo from './logo.svg';
import './App.css';

import WalletCard from './WalletCard';
import {connect, sendMsg} from "./connect";
import React,{Component} from 'react';
import Header from './components/header/header';

import ShowHistory from './components/showHistory/showHistory';
import Check from './check';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      etype: "first"
    }
    // connect((msg) =>{
    //   console.log("New Message")
    // });
  }

  send() {
    console.log("hello");
    sendMsg("You have a fake NFT");
  }
  
  render(){
    return (
      <div className= "App" >
        <Header/>
        <ShowHistory/>
        <Check/>
        <button onClick={this.send}> Check</button>
        <WalletCard/>
      </div>
    );
  }

  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        etype: this.state.etype
      }))
      console.log(this.state);
    });
  }


}

export default App;
