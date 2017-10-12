import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { MessageList } from '../../components/dashboard/MessageList';
import { message, user } from '../__mocks__/__mockData__';

const props = {
  groupId: '',
  getMembers: jest.fn(),
  getMessages: jest.fn(),
  group: {}
};

const enzymeWrapper = mount(<MessageList {...props} />);

describe('Given the message list component is mounted', () => {
  it('should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should show no messages by default', () => {
    expect(enzymeWrapper.find('#message-list').exists()).toBe(false);
    expect(enzymeWrapper.find('#no-messages').exists()).toBe(true);
  });

  it('should show group messages when a group is selected', () => {
    enzymeWrapper.setProps({
      group: {
        messages: [message],
        members: [{ ...user, id: 1 }]
      }
    });
    expect(enzymeWrapper.find('#message-list').exists()).toBe(true);
    expect(enzymeWrapper.find('#no-messages').exists()).toBe(false);
  });

  it('should get group members and messages when selected group changes',
    () => {
      enzymeWrapper.setProps({
        groupId: '2'
      });
      expect(props.getMembers.mock.calls.length).toBe(1);
      expect(props.getMessages.mock.calls.length).toBe(1);
    });
});
