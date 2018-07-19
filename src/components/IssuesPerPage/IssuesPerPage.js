import React from 'react';
import './IssuesPerPage.css';

const IssuesPerPage = ({issuesLoaded, isFetching, issuesCount, setIssuesPerPage}) => {
    let selectOptions = [10, 20, 30, 50, 100, 300];  //! 300 - max pageScope in github API! 

    if (issuesLoaded && !isFetching) {
        return(
            
            <div className="issues-count-container">
                <label htmlFor="counter-select">количество issues:</label>
                <select id="counter-select" value={issuesCount} onChange={(event) => setIssuesPerPage(event.target.value)}>
                    {selectOptions.map((option, i) =>
                        <option key={i} value={option}>{option}</option>
                    )}
                </select>
            </div>
        )
    } else {
        return null;
    }
}

export default IssuesPerPage;
