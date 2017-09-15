import React from 'react';
import Proptypes from 'prop-types';


const GroupsDiv = props => (
  <ul id="slide-out" className="side-nav fixed">
    <li className="bold no-padding center">
      GROUPS
    </li>
    { props.groups.map((group) => {
      const activeClass = props.sactiveId == group.id ? 'selectedGroup' : 'bold';
      return (
        <li key={group.id} className={activeClass}>
          <a
            id={group.id}
            onClick={props.selectGroup}
          >{group.name}</a>
        </li>
      );
    }
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
