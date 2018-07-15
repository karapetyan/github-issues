const GIT_URL = "https://api.github.com";

let myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.github.v3+json");

function fetchIssues(owner, repo) {
    return fetch(`${GIT_URL}/repos/${owner}/${repo}/issues`, {
        method: "GET",
        headers: myHeaders
    })
    .then(response => {
        if (response.status !== 200) throw ('Возникла ошибка. Код ошибки: ' + response.status);
        return response.json();
    })
    .then(json => { 
        let issues = [];
        json.forEach(issue => {
            issues.push({
                number: issue.number,
                created_at: issue.created_at,
                title: issue.title,
                url: issue.html_url
            })
        });
        return issues
    })
    .catch(e => {
        throw (e);
    })
}

export default fetchIssues;