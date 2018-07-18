import { connect } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import { changePage } from '../../actions/index';

const mapStateToProps = (state) => {
    return ({
        firstPage: state.issues.pages.pagination.first,
        lastPage: state.issues.pages.pagination.last,
        prevPage: state.issues.pages.pagination.prev,
        nextPage: state.issues.pages.pagination.next,
        currentPageNumber: state.issues.pages.currentPage,
        isFetching: state.issues.isFetching
    })
}

const mapDispatchToProps = {
    changePage
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination)
