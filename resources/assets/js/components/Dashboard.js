import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello, My Name is Vipul Kumar, your creator</h1>
    );
  }
};

Dashboard = connect(mapStateToProps)(Dashboard);

export default Dashboard;