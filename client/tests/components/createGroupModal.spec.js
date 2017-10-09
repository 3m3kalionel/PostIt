
import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { CreateGroupModal } from '../../components/dashboard/CreateGroupModal';

const props = {
  createGroup: jest.fn(() => Promise.resolve()),
  error: {},
};

const enzymeWrapper = mount(<CreateGroupModal {...props} />);

describe('Given the create group modal is mounted', () => {
  it('should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should change group name when a user inputs the name of the group',
    () => {
      enzymeWrapper.find('#name').simulate('change',
        { target: { id: 'name', value: 'mma freaks' } });
      expect(enzymeWrapper.state('name')).toBe('mma freaks');
    });

  it('should create a new group when the form is submitted', () => {
    enzymeWrapper.find('#create-group-modal').simulate('submit');
    expect(props.createGroup.mock.calls.length).toBe(1);
  });

  it('should reset form input fields when the form is submitted', () => {
    expect(enzymeWrapper.state('name')).toBe('');
    expect(enzymeWrapper.state('description')).toBe('');
  });

  it('should show an error message when group creation fails', () => {
    enzymeWrapper.setProps({
      error: {
        ...props,
        Error: 'Username and password do not match'
      }
    });
    enzymeWrapper.find('#create-group-modal').simulate('submit');
    expect(props.createGroup.mock.calls.length).toBe(2);
  });
});
