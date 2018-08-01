import React, { Component } from 'react';
import './Search.css';
import fetchRepos from '../../utils/fetchRepos';
import AutoComplete from '../AutoComplete/AutoComplete';
import { debounce } from 'lodash';

class Search extends Component {

    constructor() {
        super();
        this.fetchRepos = debounce(fetchRepos, 5000, {leading: true, trailing: false});
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.loadIssues = this.loadIssues.bind(this);
        this.setSearchInput = this.setSearchInput.bind(this);
        this.state = {
            searchInput: '',
            loadedRepoOwner: '',
            loadedRepos: [],
            autocomplete: [],
            isFetching: false,
            showAutocomplete: false
        }; 
    }

    setSearchInput(searchInput) {
        this.setState({
            searchInput
        })
    }

    loadIssues(owner, repo) {
        this.props.getIssues(owner, repo);
        this.setState({
            isFetching: false,
            showAutocomplete: false,
            autocomplete: []
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                showAutocomplete: false
            });
        }
        
      }

    async loadReposIfNecessary(owner) {
        if (owner && owner !== this.state.loadedRepoOwner && owner !== this.state.isFetching.owner) {
            this.setState({
                isFetching: owner
            })
            await this.fetchRepos(owner)
                .then(response => {
                    this.setState({
                        loadedRepoOwner: response.owner,
                        loadedRepos: response.repos,
                        autocomplete: [],
                        isFetching: false
                    })
                })
                .catch(e => {
                    this.setState({
                        autocomplete: [],
                        isFetching: false
                    })
                });
        }
    }

    setAutoComplete(repoSearchInput, suggestionsCount = 10) {
        if (repoSearchInput && this.state.loadedRepos.length) {
            let autocomplete = this.state.loadedRepos
                    .filter(repo => 
                        repo.name.indexOf(repoSearchInput) === 0
                    ).sort(byLength)
                    .slice(0, suggestionsCount)

            if (autocomplete.length < suggestionsCount) {
                autocomplete = autocomplete.concat(this.state.loadedRepos
                    .filter(repo => 
                        (repo.name.indexOf(repoSearchInput) !== 0 && repo.name.indexOf(repoSearchInput) !== -1)
                    ).sort(byLength)
                    .slice(0, suggestionsCount - autocomplete.length)
                );
            }
            this.setState({
                autocomplete,
                showAutocomplete: true
            });
        } else {
            let autocomplete = this.state.loadedRepos.sort((a, b) => b.watchers - a.watchers).slice(0, suggestionsCount);
            this.setState({
                autocomplete,
                showAutocomplete: true
            });
        }

        function byLength(a, b) {
            if (a.name.length < b.name.length) return  -1
            if (a.name.length > b.name.length) return  1
            return 0;
        }
    }

    async handleChange(input) {
        input = input.toLowerCase();
        this.setSearchInput(input);

        await this.loadReposIfNecessary(input.substr(0, input.indexOf('/')));
        if (input.lastIndexOf('/') !== -1 ) {
            this.setAutoComplete(input.substr(input.lastIndexOf('/') + 1));
        } else {
            this.setState({
                showAutocomplete: false
            })
        }   
    }

    async handleSubmit(e) {
        e.preventDefault();
        let input = this.state.searchInput.split('/');
        this.loadIssues(input[0], input[1]);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                    <label className="search-label" htmlFor="user_repo">Поиск issues</label>
                    <div ref={this.setWrapperRef} className="autocomplete-container">
                        <input type="text" id="user_repo" name="user_repo" placeholder="username/repository" value={this.state.searchInput} onChange={event => this.handleChange(event.target.value)} pattern="[0-9A-Za-z_\- ]+\/[0-9A-Za-z_\- ]+" required />
                        <AutoComplete showAutocomplete = {this.state.showAutocomplete} isFetching = {this.state.isFetching} autocomplete = {this.state.autocomplete} loadedRepoOwner = {this.state.loadedRepoOwner} loadIssues = {this.loadIssues} searchInput = {this.state.searchInput} setSearchInput = {this.setSearchInput}/>
                    </div>
                <button type="submit">Найти</button>
            </form>
        )
    }
}

export default Search;