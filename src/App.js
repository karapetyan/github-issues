import React, { Component } from 'react';
import Search from './containers/Search/Search';
import IssuesList from './containers/IssuesList/IssuesList';
import Pagination from './containers/Pagination/Pagination';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <IssuesList />
        <Pagination />
      </div>
    );
  }
}

export default App;
