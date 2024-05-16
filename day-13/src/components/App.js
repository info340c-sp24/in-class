import React from 'react';
import { Header } from './Header';
import { ChannelList } from './ChannelList';

import CHAT_LOG from '../data/chat_log.json';
import { MessagePanel } from './MessagePanel';

function App(props) {
  return (
    <div>
      <Header />
      <div className='d-flex'>
        <ChannelList />
        <MessagePanel chatLog={CHAT_LOG} />
      </div>
    </div>
  );
}

export default App;