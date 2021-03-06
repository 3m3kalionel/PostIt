import React from 'react';
import Proptypes from 'prop-types';

/**
 * React component that displays a list of groups a user belongs to
 * @param {object} props
 * @returns {undefined}
*/
const GroupsList = props => (
  <ul id="slide-out" className="side-nav fixed">
    <li className="bold no-padding center">
      GROUPS
    </li>
    { props.groups.map((group) => {
      const activeClass = props.activeId ===
        `${group.id}` ? 'selectedGroup' : 'bold';
      return (
        <li key={group.id} className={activeClass}>
          <a
            tabIndex={0}
            role="link"
            id={group.id}
            onClick={props.selectGroup}
          >{group.name}</a>
        </li>
      );
    }
    )}
  </ul>
);


GroupsList.defaultProps = {
  groups: [],
  activeId: ''
};

GroupsList.propTypes = {
  groups: Proptypes.arrayOf(Proptypes.object).isRequired,
  selectGroup: Proptypes.func.isRequired,
  activeId: Proptypes.string
};

export default GroupsList;
