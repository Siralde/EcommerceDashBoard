import './App.scss';
import React from 'react';
import Layout from './components/layout';
import AuthPage from './containers/AuthPage';
import { BrowserRouter as Router } from 'react-router-dom';
import useToken from './customHooks/tokenHook';

function App() {

  const {token, setToken} = useToken(); //My custom hook returns an object instead of an array be carefull

  if(!token) {
    return <AuthPage setToken={setToken} />
  }

  return (
    <Router>
      <Layout>
        
      </Layout>
    </Router>
  );
}

export default App;
