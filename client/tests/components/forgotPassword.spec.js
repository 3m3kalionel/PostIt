import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import { ForgotPassword } from '../../components/auth/ForgotPassword';

const props = {
  verifyUser: jest.fn(() => Promise.resolve()),
  revertForgotPassword: jest.fn(() => Promise.resolve())
};

const enzymeWrapper = mount(
  <ForgotPassword {...props} />
);

describe('Given the forgot password page is mounted', () => {
  it('it should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should change email when a user inputs his email', () => {
    enzymeWrapper.find('#email').simulate('change',
      { target: { id: 'email', value: 'emeka@gmail.com' } });
    expect(enzymeWrapper.state('email')).toBe('emeka@gmail.com');
  });

  it('should call the revertForgotPassword when the cancel button is clicked',
    () => {
      enzymeWrapper.find('#cancel').simulate('click');
      expect(props.revertForgotPassword.mock.calls.length).toBe(1);
    });

  it('should send the user an email when the form is submitted',
    () => {
      enzymeWrapper.find('#forgot-password').simulate('submit');
      expect(props.verifyUser.mock.calls.length).toBe(1);
    });
});
