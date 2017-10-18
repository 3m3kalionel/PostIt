import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { AddUserModal } from '../../components/dashboard/AddUserModal';
import { user } from '../__mocks__/__mockData__';

jest.mock('react-google-login');
jest.fn('resetForm');


const props = {
  groupId: '',
  error: {},
  search: jest.fn(),
  searchResults: { rows: [] },
  clearSearchList: jest.fn(),
  addMember: jest.fn(() => Promise.resolve()),
  group: { members: [] },

};

const enzymeWrapper = mount(<AddUserModal {...props} />);

describe('Give the add user modal is mounted', () => {
  it('should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should change username as a user searches for other users',
    () => {
      const spy = jest.spyOn(enzymeWrapper.instance(), 'resetForm');
      enzymeWrapper.find('#icon_prefix').simulate('change',
        { target: { name: 'query', value: '' } });
      expect(spy).toBeCalled();
    });

  it('should change username as a user searches for other users',
    () => {
      enzymeWrapper.find('#icon_prefix').simulate('change',
        { target: { name: 'query', value: user.username } });
      expect(enzymeWrapper.state('query')).toBe(user.username);
    });

  it('should render button to add user if user is not a group member', () => {
    enzymeWrapper.setProps({
      searchResults: {
        totalPageCount: 3,
        users: [user],
        pageSize: 1
      }
    });
    expect(enzymeWrapper.find('#add-button').exists()).toBe(true);
    expect(enzymeWrapper.find('#member-text').exists()).toBe(false);
  });

  it('should call addMember when the button is clicked', () => {
    enzymeWrapper.find('#add-button').simulate('click');
    expect(props.addMember).toBeCalled();
  });

  it('should render span that shows user is added if user is a group member',
    () => {
      enzymeWrapper.setProps({
        group: {
          members: [user]
        },
        searchResults: {
          totalPageCount: 3,
          users: [user],
          pageSize: 1
        }
      });
      expect(enzymeWrapper.find('#member-text').exists()).toBe(true);
      expect(enzymeWrapper.find('#add-button').exists()).toBe(false);
    });

  it('calls handlePageClick on page change',
    () => {
      enzymeWrapper.instance().handlePageClick({ selected: 1 });
      expect(enzymeWrapper.state('offset')).toBe(3);
      expect(props.search).toBeCalled();
    });
});
