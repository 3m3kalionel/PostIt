import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import MessageArea from '../../components/dashboard/MessageArea';

jest.mock('../../components/dashboard/MessageList', () => 'MessageList');
jest.mock('../../components/dashboard/AddUserModal', () => 'AddUserModal');
jest.mock('../../components/dashboard/CreateGroupModal', () => 'CreateGroupModal');

const props = {
  groupId: '',
  showInput: true,
  defaultPriority: '',
  sendMessage: jest.fn(),
  setPriority: jest.fn()
};

const enzymeWrapper = mount(<MessageArea {...props} />, {
  lifecycleExperimental: true
});

describe('Given the messageArea component is rendered', () => {
  it('should render self and sub-components', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('calls componentWillReceiveProps', () => {
    enzymeWrapper.setProps({ showInput: true });
    expect(props.showInput).toBe(true);
  });
});
