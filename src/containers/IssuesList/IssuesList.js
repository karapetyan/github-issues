import { connect } from 'react-redux';
import IssuesList from '../../components/IssuesList/IssuesList';

const mapStateToProps = state => 
    ({ 
        issues: state.issues 
    })

export default connect(
    mapStateToProps,
    null
)(IssuesList)

