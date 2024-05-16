import React, { useState } from 'react';

import { ComposeForm } from './ComposeForm.js';

import INITIAL_CHAT_LOG from '../data/chat_log.json'

export function ChatPane(props) {
  console.log("rendering the ChatPane")

  const [currentCount, setCurrentCount] = useState(0);
  const [chatLog, setChatLog] = useState(INITIAL_CHAT_LOG);

  const handleClick = function(event) {
    setCurrentCount(currentCount + 1);
    console.log(currentCount)
  }

  const addMessage = (userName, text, channel) => {
    const newMessage ={
      "userId": userName,
      "userName": userName,
      "userImg": "/img/" + userName + ".png",
      "text": text,
      "timestamp": Date.now(),
      "channel": channel
    }
    const newArray = [...chatLog, newMessage];

    setChatLog(newArray);
  }

  //data: an array of message objects [{}, {}]
  const messageObjArray = chatLog
    .sort((m1, m2) => m1.timestamp - m2.timestamp); //reverse chron order

  if (messageObjArray.length === 0) {
    return (
      <p>No messages found!</p>
    )
  }
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
        <p>You clicked me {currentCount} times</p>
      </div>
      <hr/>

      {/* Messages */}
      {messageItemArray}

      <ComposeForm addMessage={addMessage} />
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
