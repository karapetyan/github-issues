import fetchIssues from '../utils/fetchIssues';

const addError = (error) => 
    ({
        type: 'ADD_ERROR',
        error
    })

const saveIssues = (issues, pagination, owner, repo, currentPage) =>
    ({
        type: 'SAVE_ISSUES',
        issues,
        pagination,
        owner,
        repo,
        currentPage
    })

const fetchStarted = () =>
    ({
        type: 'FETCH_STARTED'
    })


const loadIssues = (owner, repo, page, issuesPerPage) => {
    page = Number(page);
    issuesPerPage = Number(issuesPerPage);
    return async dispatch => {
        dispatch(fetchStarted());
        let data = await fetchIssues(owner, repo, page, issuesPerPage)
            .catch(error => {
                dispatch(addError(error));
            });
        if (data) {
           dispatch(saveIssues(data.issues, data.pagination, data.owner, data.repo, data.currentPage));
        }
    }
}
    

export const getIssues = (owner, repo) => 
    (dispatch, getState) => {
        let page = 1;
        let { issuesPerPage } = { ...getState().issues.pages };
        dispatch(loadIssues(owner, repo, page, issuesPerPage));
}


export const changePage = page => 
    (dispatch, getState) => {
        let {owner, repo, issuesPerPage } = { ...getState().issues.pages };
        dispatch(loadIssues(owner, repo, page, issuesPerPage));
    }


export const changeIssuesPerPage = issuesPerPage => {
    /***/
}
    