schema = {
    issues: {
        issuesList: [
            { 
                number: json.number,
                created_at: json.created_at,
                title: json.title,
                url: json.html_url
            },
            { 
                number: json.number,
                created_at: json.created_at,
                title: json.title,
                url: json.html_url
            }
        ],
        isFetching: false,
        error: "message"
    }
}