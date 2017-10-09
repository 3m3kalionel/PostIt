import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { SignUpForm } from '../../components/auth/SignUpForm';

jest.mock('react-google-login');

const props = {
  signUp: jest.fn(() => Promise.resolve()),
  googleAuth: jest.fn(() => Promise.resolve()),
  error: {},
  auth: {},
  onSubmit: jest.fn()
};

const enzymeWrapper = mount(
  <SignUpForm {...props} />
);

describe('Give the sign up page is mounted', () => {
  it('should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should change username when a user inputs his username', () => {
    enzymeWrapper.find('#username').simulate('change',
      { target: { id: 'username', value: 'emeka' } });
    expect(enzymeWrapper.state('username')).toBe('emeka');
  });

  it('should sign up a user when the form is submitted with user details',
    () => {
      enzymeWrapper.find('.auth-form').simulate('submit');
      expect(props.signUp.mock.calls.length).toBe(1);
    });

  it('should show error message if sign up fails', () => {
    enzymeWrapper.setProps({
      error: {
        ...props,
        Error: 'Username and password do not match'
      }
    });
    enzymeWrapper.find('.auth-form').simulate('submit');
  });

  it('should sign up a user using this.props.googleAuth', () => {
    enzymeWrapper.instance().googleSignUp({
      accessToken: 'accessToken',
      profileObj: {
        email: '',
        givenName: ''
      }
    });
    expect(props.googleAuth.mock.calls.length).toBe(1);
  });
});
