
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import getLocalStorageInfo from './utils/getLocalStorageInfo'
import { useState,useEffect }  from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    fetch('http://localhost:4000/user/auth' , {
      method:'POST',
      headers: { 
        authorization: getLocalStorageInfo,
        'Content-Type': 'application/json' },

    })
    .then(response => response.json())
    .then(data => setIsAuth(data.isAuthenticated))},
     [])
  
  return (
    <div className="App">
      {isAuth?
      <Home />:
      <Login />
       } 
      <getLocalStorageInfo />
    </div>
  );
}

export default App;
