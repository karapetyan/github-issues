import parseLinkHeader from 'parse-link-header';

const GIT_URL = "https://api.github.com";

let myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.github.v3+json");

function fetchRepos(owner, page = 1, allRepos = [], loadAllPages = true, reposPerPage = 300) {  
    return fetch(`${GIT_URL}/users/${owner}/repos?page=${page}&per_page=${reposPerPage}`, {
        method: "GET",
        headers: myHeaders
    })
    .then(async response => {
        if (response.status !== 200) throw ('Возникла ошибка. Код ошибки: ' + response.status);
        let lastPage;
        if (parseLinkHeader(response.headers.get('Link')) && parseLinkHeader(response.headers.get('Link')).last) {
            lastPage = Number(parseLinkHeader(response.headers.get('Link')).last.page);
        }
        if (loadAllPages && lastPage) {
            let pages = [];
            for (let i = 2; i <= lastPage; i++) {
                pages.push(i);
            }
            await Promise.all(pages.map(page => 
                fetchRepos(owner, page, allRepos, false)
            )).catch(e => {
                throw(e);
            })
        }
        return response.json()
            .then(json => ({
                json,
                loadAllPages
            }))
    })
    .then(data => { 
        data.json.forEach(repo => {
            allRepos.push({
                name: repo.name,
                watchers: repo.watchers_count
            })
        });
        if (loadAllPages) {
            return ({
                owner,
                repos: allRepos
            })
        }
    })
    .catch(e => {
        throw (e);
    })
}

export default fetchRepos;