import React, { Component } from 'react';

class GroupList extends Component {
  render() {

    const groups = [
      {
        title: 'First Group'
      },
      {
        title: 'Second Group'
      },
      {
        title: 'Third Group'
      },
      {
        title: 'fourth Group'
      },
      {
        title: 'Fifth Group'
      }
    ]
    return (
        <div className="col m4" id="groups">
          <ul id="slide-out" className="side-nav groups-nav fixed" style={{transform: 'translateX(0%)'}}>
            <li className="bold no-padding"><a className="waves-effect waves-teal">Groups</a></li>
            {
              groups.map((group, index) => {
                return (
                  <Group key={index} title={group.title}/>
                )
              })
            }
          </ul>
      </div>
    );
  }
}

export default GroupList;

class Group extends Component {
  render() {
    return (
      <li className="bold"><a className="waves-effect waves-teal"> {this.props.title}</a></li>
    )
  }
}
            // <li className="bold no-padding"><a className="waves-effect waves-teal">Groups</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>
            // <li className="bold"><a className="waves-effect waves-teal">Group 1</a></li>