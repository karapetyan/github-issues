import { connect } from 'react-redux';
import Search from '../../components/Search/Search';
import { getIssues } from '../../actions/index';

const mapDispatchToProps = {
    getIssues
}

export default connect(
    null,
    mapDispatchToProps
)(Search)


