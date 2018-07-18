import React from 'react';
import './Pagination.css' 

const Pagination = ({firstPage, lastPage, prevPage, nextPage, currentPageNumber, isFetching, changePage}) => {

    let pages = renderPages();

    if ((pages.prev.length || pages.next.length) && !isFetching) {
        return(
            <div className="pagination">
                { renderFirst() }
                { renderPrev() }
                { pages.prev }
                <span className="current">{currentPageNumber}</span>
                { pages.next } 
                { renderNext() }
                { renderLast() }
            </div>
        )
    } else {
        return null
    }

    function renderFirst() {
        return (firstPage) ? (<button className="first" onClick={() => changePage(firstPage.page)}>Первая</button>) : null
    }

    function renderLast() {
        return (lastPage) ? (<button className="last" onClick={() => changePage(lastPage.page)}>Последняя</button>) : null
    }

    function renderPrev() {
        return (prevPage) ? (<button className="prev" onClick={() => changePage(prevPage.page)}>Предыдущая</button>) : null
    }

    function renderNext() {
        return (nextPage) ? (<button className="next" onClick={() => changePage(nextPage.page)}>Следующая</button>) : null
    }

   
    function canGetPrevNumber(offset) {
        return (currentPageNumber - offset > 0) ? true : false;
    }

    function canGetNextNumber(offset) {
        if (!lastPage) return false;
        return (currentPageNumber + offset <= Number(lastPage.page)) ? true : false;
    }

    function renderPages() {
        let pages = {
            prev: [],
            next: []
        };

        let offset = 1;
        while((pages.prev.length + pages.next.length) < 10) {
            if (!canGetPrevNumber(offset) && !canGetNextNumber(offset)) {
                break;
            }
            ((offset) => {
                if (canGetPrevNumber(offset)) pages.prev.unshift(<button key={currentPageNumber - offset} className="page" onClick={() => changePage(currentPageNumber - offset)}>{ currentPageNumber - offset }</button>)
                if (canGetNextNumber(offset)) pages.next.push(<button key={currentPageNumber + offset} className="page" onClick={() => changePage(currentPageNumber + offset)}>{ currentPageNumber + offset }</button>)
            })(offset);
            offset++;
        }

        return pages;
    }


}

export default Pagination;
