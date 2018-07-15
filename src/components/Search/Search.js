import React, { Component } from 'react';
import './Search.css';
import fetchIssues from '../../utils/fetchIssues';

class Search extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchInput: ''
        }; 
    }

    handleChange(e) {
        this.setState({
            searchInput: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        let input = this.state.searchInput.split('/');
        this.props.fetchStarted();
        let issues = await fetchIssues(input[0], input[1])
            .catch(error => {
                this.props.addError(error);
            });

        if (issues) {
            this.props.saveIssues(issues);
        }
    }

    render() {
        return (
            <form className="repo-search" onSubmit={this.handleSubmit}>
                <label htmlFor="user_repo">Поиск issues</label>
                <input type="text" id="user_repo" name="user_repo" placeholder="username/repository" defaultValue={this.state.searchInput} onChange={this.handleChange} pattern="[0-9A-Za-z_ ]+\/[0-9A-Za-z_ ]+" required />
                <button type="submit">Найти</button>
            </form>
        )
    }
}

export default Search;