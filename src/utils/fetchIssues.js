import parseLinkHeader from 'parse-link-header';

const GIT_URL = "https://api.github.com";

let myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.github.v3+json");

function fetchIssues(owner, repo, currentPage, issuesPerPage) {
    return fetch(`${GIT_URL}/repos/${owner}/${repo}/issues?page=${currentPage}&per_page=${issuesPerPage}`, {
        method: "GET",
        headers: myHeaders
    })
    .then(response => {
        if (response.status !== 200) throw ('Возникла ошибка. Код ошибки: ' + response.status);
        return response.json()
            .then(json => ({
                json,
                pagination: parseLinkHeader(response.headers.get('Link')) ? parseLinkHeader(response.headers.get('Link')) : {}
            }))
    })
    .then(data => { 
        let issues = [];
        data.json.forEach(issue => {
            issues.push({
                number: issue.number,
                created_at: issue.created_at,
                title: issue.title,
                url: issue.html_url
            })
        });
        return ({
            issues,
            pagination: data.pagination,
            owner,
            repo,
            currentPage,
            issuesPerPage
        }) 
    })
    .catch(e => {
        throw (e);
    })
}

export default fetchIssues;