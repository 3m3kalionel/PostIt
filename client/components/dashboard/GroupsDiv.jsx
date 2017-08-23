import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listGroups } from '../../actions/groupActions.js';


class GroupsDiv extends Component {
  // componentDidMount(){
  //   this.props.getGroups();
  // }

  render() {
    return (
      <div className="col m4 group-div" id="groups">
        <ul id="slide-out" className="side-nav groups-nav fixed" style={{transform: 'translateX(0%)'}}>
          <li className="bold no-padding center"><a className="waves-effect rgb(245,241,238)">GROUPS</a></li>
          { this.props.groups.map(group => 
            <li key={group.id} className="bold">
              <a id={group.id} className="waves-effect rgb(245,241,238)" onClick={this.props.selectGroup}>{group.name}</a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

GroupsDiv.defaultProps = {
  groups: []
};

// const mapStateToProps = state => {
//   return {
//     groups: state.user.groups
//   }
// };

// const mapDispatchToProps = dispatch => ({
//   getGroups: () => dispatch(listGroups())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(GroupsDiv);
export default GroupsDiv;