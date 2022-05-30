import React, { Component } from "react";

class ShowHistory extends Component {
    render() {
    //   const messages = this.props.History.map((msg, index) => (
    //     <p key={index}>{msg.data}</p>
    //   ));
      const messages = this.props.History;

      return (
        <div className="GetHistory">
          {messages}
        </div>
      );
    }
  }

export default ShowHistory;
