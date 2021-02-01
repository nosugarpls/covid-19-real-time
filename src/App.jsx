import './App.css';
import {
  useState,
  useEffect
} from 'react';
import {
  fetchMessages,
  endSession,
  checkSession
} from './services';

import Nav from './Nav';
import Login from './Login';
import Menu from './Menu';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import Chat from './Chat';

function App() {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    isPending: true
  });

  const [country, setInputCountry] = useState("all");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]); 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    checkSession()
      .then(username => {
        setUserState({
          isLoggedIn: true,
          isPending: false,
          username: username,
        });
        fetchLatest({country});
      })
      .catch(() => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      });
  }, [country]); 

  const login = function ({
    username
  }) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      username: username
    });
    fetchLatest({country});
  };

  const fetchLatest = function ({country}) {
    const url = country === "all" ? 
    `https://disease.sh/v3/covid-19/all` :
    `https://disease.sh/v3/covid-19/countries/${country}`;

    fetch(url)
      .then((response) => response.json())
      .then((countryInfo) => {
        setCountryInfo(countryInfo);
      }).catch(() => {
        setCountryInfo({});
      });

    fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
          }));
          setCountries(countries);   
        }).catch(() => {
          setCountries([]);
        });

    fetchMessages()
      .then(messages => {
        setMessages(messages);
      })
      .catch(() => {
        setMessages([]);
      });
  };

  const fetchLatestMessages = () => {
    fetchMessages()
      .then(messages => {
        setMessages(messages);
      })
      .catch(() => {
        setMessages([]);
      })
      .then(setTimeout(fetchLatestMessages, 1000));
  };

  const logout = function () {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
      .then(() => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      })
      .catch(() => {
        setUserState({
          ...userState,
          isPending: false,
        });
      });
  };

  const onCountryChange = (e) => {
    const country = e.target.dataset.name;
    setInputCountry(country);
  };

  if (userState.isPending) {
    return ( <div>Loading...</div> );
  }

  let content;

  if (userState.isLoggedIn) {
    content = 
    <div className="app">
      <div className="top-container">
        <div className="left-container">
          <Header />
          <Menu countries={countries} onClick={onCountryChange}/>
          <Card countryInfo={countryInfo}/>
        </div>
        <div className="right-container">
          <Chat messages={messages} onUpdate={fetchLatestMessages}/>
        </div>
      </div>
      <Nav user={userState} onLogout={logout}/>  
      <Footer />    
    </div>
  } else {
    content = <Login onLogin = {login}/>;  
  }
  return ( <div>{content}</div>);
}

export default App;