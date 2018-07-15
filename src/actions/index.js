export const addError = (error) => 
    ({
        type: 'ADD_ERROR',
        error
    })

export const saveIssues = (issues) =>
    ({
        type: 'SAVE_ISSUES',
        issues
    })

export const fetchStarted = () =>
    ({
        type: 'FETCH_STARTED'
    })