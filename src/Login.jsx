import './Login.css';
import { useState } from 'react';
import { createSession } from './services';

const Login = function({ onLogin }) {
  const [username, setUsername] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState('');

  const onChange = (e) => {
    setStatus('');
    setUsername(e.target.value);
    setIsDisabled(!e.target.value);
  };

  const login = () => {
    setIsPending(true);
    createSession({ username })
    .then( username => {
      onLogin({ username });
      setStatus('');
      setIsPending(false);
    })
    .catch( err => {
      setStatus('Username Invalid');
      setIsPending(false);
    });
  };

  return (
    <div className="login-page">
      <h1>COVID-19 Real-Time</h1>
      <img src="https://deadline.com/wp-content/uploads/2020/03/coronavirus-drawing-covid-19-covid-19.jpg?w=681&h=383&crop=1" alt="pic"/>
      <div className="status">{status}</div>
      <input className="type-area" placeholder="Enter username" disabled={isPending} onChange={onChange} value={username} />
      <button onClick={login} disabled={isDisabled || isPending} >{ isPending ? "..." : "Login"}</button>
     
    </div>
  );
};
export default Login;