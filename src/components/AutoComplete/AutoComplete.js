import React from 'react'
import './AutoComplete.css' 

const AutoComplete = ({showAutocomplete, isFetching, autocomplete, loadedRepoOwner, loadIssues, searchInput, setSearchInput }) => { 
    
    function highlightMatch(repoName) {
        let repoInput = searchInput.substr(searchInput.lastIndexOf('/') + 1);
        if (repoInput) {
            let repoArr = repoName.split('');
            repoArr.splice(repoName.indexOf(repoInput), 0, '<b>');
            repoArr.splice(repoName.indexOf(repoInput) + repoInput.length + 1, 0, '</b>');
            return(
                { __html: repoArr.join('') }
            )
        } else {
            return { __html: repoName } 
        }
    }

    function handleClick(owner, repo) {
        setSearchInput(`${owner}/${repo}`);
        loadIssues(owner, repo);
    }

    if (isFetching) {
        return(
            <ul className="autocomplete-list">
                <li>Loading...</li>
            </ul>
        )
    }

    if (!showAutocomplete) {
        return null
    }

    if (!autocomplete.length) {
        return null
    } else {
        return(
            <ul className="autocomplete-list">
                    { 
                        autocomplete.map((item, i)=>
                            <li key={i} onClick={() => handleClick(loadedRepoOwner, item.name)} dangerouslySetInnerHTML={highlightMatch(item.name)} />
                        )
                    }
            </ul>
        )

    }
}


export default AutoComplete;