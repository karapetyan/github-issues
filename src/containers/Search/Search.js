import { connect } from 'react-redux';
import Search from '../../components/Search/Search';
import { addError, saveIssues, fetchStarted } from '../../actions/index';

const mapDispatchToProps = {
    addError,
    saveIssues,
    fetchStarted
}

export default connect(
    null,
    mapDispatchToProps
)(Search)


