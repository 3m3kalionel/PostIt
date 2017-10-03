import React from 'react';
import { shallow } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { Dashboard } from '../../components/dashboard/Dashboard';

const props = {
  groups: [],
  listGroups: jest.fn(),
  groupsData: { 0: { members: [], messages: [] } },
  createMessage: jest.fn()
};

const enzymeWrapper = shallow(<Dashboard {...props} />, {
  lifecycleExperimental: true
});

describe('Given the dashboard page is rendered', () => {
  it('should render self and sub-components', () => {
    expect(enzymeWrapper.exists()).toBe(true);
    expect(enzymeWrapper.find('#two-section-page').exists()).toBe(true);
    expect(enzymeWrapper.find('#message-area').exists()).toBe(true);
    expect(enzymeWrapper.find('#groups-list').exists()).toBe(true);
  });

  it('renders the GroupsList component with a default groupId of null', () => {
    expect(enzymeWrapper.state('selectedGroup')).toBe(null);
  });

  it('changes state.selectedGroup when selectGroup is called', () => {
    enzymeWrapper.instance().selectGroup({ target: {
      id: '0'
    },
    preventDefault: jest.fn() });
    expect(enzymeWrapper.instance().state.selectedGroup).toBe('0');
  });

  it('calls lisGroups on mount', () => {
    expect(props.listGroups.mock.calls.length).toBe(1);
  });

  it('sets state.priority to value of priority', () => {
    enzymeWrapper.instance().setPriority({ target: { id: 'normal' } });
    expect(enzymeWrapper.state('priority')).toBe('normal');
  });

  it('calls createMessage when passed in the selected group id', () => {
    const callback = jest.fn();
    enzymeWrapper.setState({ selectedGroup: '0' });
    enzymeWrapper.instance().sendMessage('a', callback);
    expect(props.createMessage.mock.calls.length).toBe(1);
  });
});

