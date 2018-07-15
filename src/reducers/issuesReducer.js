let initialState = {
    issuesList: [],
    error: '',
    isFetching: false
}

const issues = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return({
                ...state,  
                issuesList: [],
                error: action.error,
                isFetching: false
            })
        case 'SAVE_ISSUES':
            return({
                ...state,
                issuesList: action.issues,
                isFetching: false,
                error: ''
            })
        case 'FETCH_STARTED':
            return({
                ...state,
                isFetching: true,
                error: ''
            })
            
        default:
            return state
    }
        
}

export default issues;