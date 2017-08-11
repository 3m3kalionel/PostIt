import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserGroups } from '../../actions/actionCreators.js'

class GroupList extends Component {
  componentDidMount() {
    this.props.getUserGroups();
  }

  render() {
    console.log('all props', this.props.groups);
    // const groups = [
    //   {
    //     title: 'First Group'
    //   },
    //   {
    //     title: 'Second Group'
    //   },
    //   {
    //     title: 'Third Group'
    //   },
    //   {
    //     title: 'fourth Group'
    //   },
    //   {
    //     title: 'Fifth Group'
    //   }
    // ]

    const groups = (this.props.groups.success || []).map((group, index) => {
      return (
        <li key={index}>{group.name}</li>
      )
    })

    return (
      <div className="col m4" id="groups">
        <ul id="slide-out" className="side-nav groups-nav fixed" style={{ transform: 'translateX(0%)' }}>
          <li className="bold no-padding"><a className="waves-effect waves-teal">Groups</a></li>
          {groups}
        </ul>
      </div>
    );
  }
}


// class Group extends Component {
//   render() {
//     return (
//       <li className="bold"><a className="waves-effect waves-teal"> {this.props.title}</a></li>
//     )
//   }
// }

const mapStateToProps = (state) => {
  return {
    groups: state.groups
  };
};

const ShowGroups = connect(
  mapStateToProps, { getUserGroups }
)(GroupList);

export default ShowGroups;
            // <li className="bold no-padding"><a className="waves-effect waves-teal">Groups</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>