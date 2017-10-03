import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { ResetPassword } from '../../components/auth/ResetPassword';

const props = {
  resetPassword: jest.fn(() => Promise.resolve()),
  params: {}
};

const enzymeWrapper = mount(<ResetPassword {...props} />);

describe('Given the create group modal is mounted', () => {
  it('should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should change state.newPassword as a user inputs his new password', () => {
    enzymeWrapper.find('#newpassword').simulate('change', { target: { name: 'newPassword', value: '12345678' } });
    expect(enzymeWrapper.state('newPassword')).toBe('12345678');
  });

  it('should reset the password when the form is submitted', () => {
    enzymeWrapper.find('#reset-password').simulate('submit');
    expect(props.resetPassword.mock.calls.length).toBe(1);
  });

  it('should show an error message when password reset fails', () => {
    enzymeWrapper.setProps({
      resetPassword: jest.fn(() => Promise.reject({ error: { message: 'error' } }))
    });
    enzymeWrapper.find('#reset-password').simulate('submit');
    expect(props.resetPassword.mock.calls.length).toBe(1);
  });
});
