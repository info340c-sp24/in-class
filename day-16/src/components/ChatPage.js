import React from 'react';

import { ChannelList } from './ChannelList.js';
import { ChatPane } from './ChatPane.js';

export default function ChatPage(props) {
  const {currentUser, messageArray, addMessageFunction} = props;
 
  const channelNames = ["general", "channel-2", "birds", "dank-memes", "random"];

  return (
    <div className="row flex-grow-1">
      <div className="col-3">
        <ChannelList channelNames={channelNames} />
      </div>
      <div className="col d-flex flex-column">
        <ChatPane
          currentUser={currentUser}
          messageArray={messageArray}
          addMessageFunction={addMessageFunction}
        />
      </div>
    </div>
  )
}