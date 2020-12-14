import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import React from 'react';
import SearchPage from './components/SearchPage';
import ProfilesContextProvider from './components/ProfilesContextProvider';
import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path="/profiles/:id" component={ProfilePage} />
        </Switch>
      </Router>
    </ProfilesContextProvider>
  );
}

export default App;
