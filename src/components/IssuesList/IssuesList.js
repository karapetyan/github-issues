import React from 'react';
import './IssuesList.css' 

const IssuesList = ({issues}) => {

    if (issues.error) {
        return (
            <div className="container">
                <div className="middle-item error-icon">{issues.error}</div>
            </div>   
        )
    }

    if (issues.isFetching) {
        return (
            <div className="container">
                <div className="middle-item spinner-icon">Загрузка</div>
            </div> 
        )
    }

    if (!issues.issuesList.length) {
        return (
            <div className="container">
                    <div className="middle-item nodata-icon">Нет данных для отображения</div>
            </div> 
        )
    }

    return (
        <table className="container issues-list">
            <thead>
            <tr>
                <th>Дата создания</th>
                <th>Номер issue</th>
                <th>Заголовок</th>
            </tr>
            </thead>
            <tbody>
            { 
                issues.issuesList.map((issue, index) => 
                    <tr key={index}>
                        <td>{issue.created_at}</td>
                        <td><a href={issue.url}>{issue.number}</a></td>
                        <td><a href={issue.url}>{issue.title}</a></td>
                    </tr>
                ) 
            }
            </tbody>
        </table>
    )

}

export default IssuesList