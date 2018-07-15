import React, { Component } from 'react';
import Search from './containers/Search/Search';
import IssuesList from './containers/IssuesList/IssuesList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <IssuesList />
      </div>
    );
  }
}

export default App;
