let initialState = {
    issuesList: [],
    error: '',
    isFetching: false,
    pages: {
        pagination: {},
        issuesPerPage: 30,
        currentPage: 1,
        owner: undefined,
        repo: undefined
    }
}

const issues = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return({
                ...state,  
                issuesList: [],
                pages: {
                    ...state.pages,
                    pagination: {},
                    owner: undefined,
                    repo: undefined,
                    currentPage: 1
                },
                error: action.error,
                isFetching: false
            })
        case 'SAVE_ISSUES':
            return({
                ...state,
                issuesList: action.issues,
                pages: {
                    ...state.pages,
                    pagination: action.pagination,
                    owner: action.owner,
                    repo: action.repo,
                    currentPage: action.currentPage
                },
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