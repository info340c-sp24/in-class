import React from 'react';

import { ComposeForm } from './ComposeForm.js';

import INITIAL_CHAT_LOG from '../data/chat_log.json'

export function ChatPane(props) {
  console.log("rendering the ChatPane")

  const handleClick = function(event) {
    console.log("You clicked me!");

  }

  //data: an array of message objects [{}, {}]
  const messageObjArray = INITIAL_CHAT_LOG
    .sort((m1, m2) => m2.timestamp - m1.timestamp); //reverse chron order

  //DOM content [<MessageItem/>, <MessageItem/>]
  const messageItemArray = messageObjArray.map((chatObj) => {
      const elem = <MessageItem key={chatObj.timestamp} messageData={chatObj} />
      return elem; //put it in the new array!
  });

  return (
    <div className="scrollable-pane">
      {/* button demo */}
      <div className="pt-2 my-2">
        {/* button.addEventListener('click', handleClick) */}
        <button 
          className="btn btn-success"
          onClick={handleClick} 
        >Click me!</button>
        <p>You clicked me X times</p>
      </div>
      <hr/>

      {/* Messages */}
      {messageItemArray}

      <ComposeForm />
    </div>
  )
}

function MessageItem(props) {
  const msgObj = props.messageData;
  const {userName, userImg, text} = msgObj;

  const handleClick = (event) => {
    console.log("You like a post by "+userName);
  }

  let buttonColor = "grey";

  return (
   <div className="message d-flex mb-3">
    <div className="me-2">
      <img src={userImg} alt={userName+"'s avatar"}/>
    </div>
    <div className="flex-grow-1">
      <p className="user-name">{userName}</p>
      <p>{text}</p>
      <button className="btn like-button" onClick={handleClick}>
          <span className="material-icons" style={{ color: buttonColor }}>favorite_border</span>
      </button>
    </div>
   </div> 
  )
}
