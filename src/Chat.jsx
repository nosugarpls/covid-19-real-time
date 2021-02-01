import './Chat.css';
import React from 'react';
import { useState } from 'react';

function Chat({ messages, onUpdate}) {
  return (
    <div className="chat-app">
      <ShowMessages className="display-panel" messages={messages}/>
      <ShowOutgoing className="outgoing-panel" onUpdate={onUpdate}/> 
    </div>
  );
}

const ShowMessages = ( {messages} ) => {
  return ( 
    <ol className="messages">
      { messages.map( message => ( 
      <li>
      <div className="stamp">
        <span className="sender">{message.sender}</span>
        <span className="timestamp">{message.timestamp}</span>
      </div>
      <div className="message">{message.text}</div>
      </li>
      ) ) }
    </ol>
  );
};

const ShowOutgoing = ({onUpdate}) => {
  const [text, setText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
    setIsDisabled(!e.target.value);
  };

  const send = () => {
    if(!text) return;
    setIsPending(true);
    fetch('/api/messages',  {
      method: 'POST',
      headers: new Headers({
      'content-type': 'application/json',
    }),
      body: JSON.stringify({ text: text }),
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    })
    .then( 
      res => { 
        onUpdate();
        setIsPending(false);
        setText('');
      })
    .catch( 
      err => {
        onUpdate();
        setIsPending(false);
        setText('');
    });
  };

  return (
    <div>
      <input className="type-area" placeholder="Type message" disabled={isPending} onChange={onChange} value={text} />
      <button onClick={send} disabled={isDisabled || isPending} >{ isPending ? "..." : "Send"}</button>
    </div>
  );
};

export default Chat;