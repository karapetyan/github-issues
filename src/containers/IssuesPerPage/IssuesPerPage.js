import { connect } from 'react-redux';
import IssuesPerPage from '../../components/IssuesPerPage/IssuesPerPage';
import { setIssuesPerPage } from '../../actions/index';

const mapStateToProps = (state) => {
    return ({
        issuesLoaded: state.issues.issuesList.length > 0,
        isFetching: state.issues.isFetching,
        issuesCount: state.issues.pages.issuesPerPage
    })
}

const mapDispatchToProps = {
    setIssuesPerPage
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssuesPerPage)
