import React from 'react';
import Proptypes from 'prop-types';


const GroupsDiv = props => (
  <ul id="slide-out" className="side-nav fixed">
    <li className="bold no-padding center">
      <a className="waves-effect rgb(245,241,238)">GROUPS</a>
    </li>
    { props.groups.map(group =>
      (<li key={group.id} className="bold">
        <a
          id={group.id}
          className="waves-effect rgb(245,241,238)"
          onClick={props.selectGroup}
        >{group.name}</a>
      </li>)
    )}
  </ul>
);


GroupsDiv.defaultProps = {
  groups: []
};

GroupsDiv.propTypes = {
  groups: Proptypes.arrayOf(Proptypes.object).isRequired,
  selectGroup: Proptypes.func.isRequired
};

export default GroupsDiv;
