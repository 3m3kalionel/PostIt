import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const NotFoundPage = props => (
  <div id="not-found">
    <h2>Page Not Found</h2>
    <p>The Page you requested was not found.</p>
    {props.status ?
      <Link to="/dashboard">
        <button
          className="waves-effect waves-light btn-large"
        >
          Return</button>
      </Link> :
      <Link to="/">
        <button
          className="waves-effect waves-light btn-large"
        >Return</button>
      </Link>}
  </div>
);

NotFoundPage.defaultProps = {
  status: true
};

NotFoundPage.propTypes = {
  status: PropTypes.bool
};

const mapStateToProps = state => ({ status: state.user.isAuthenticated });

export default connect(mapStateToProps, null)(NotFoundPage);

