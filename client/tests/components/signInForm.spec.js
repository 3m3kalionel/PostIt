import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import { SignInForm } from '../../components/auth/SignInForm';

jest.mock('react-google-login');

const props = {
  signIn: jest.fn(() => Promise.resolve()),
  forgotPassword: jest.fn(),
  googleAuth: jest.fn(() => Promise.resolve()),
  error: {},
  auth: {},
  onSubmit: jest.fn()
};

const enzymeWrapper = mount(
  <SignInForm {...props} />
);

describe('Given the sign in page is mounted', () => {
  it('should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should change state.username when a user inputs his username', () => {
    enzymeWrapper.find('#username').simulate('change',
      { target: { id: 'username', value: 'emeka' } });
    expect(enzymeWrapper.state('username')).toBe('emeka');
  });

  it('should sign in a user when the form is submitted', () => {
    enzymeWrapper.find('#password').simulate('change',
      { target: { id: 'password', value: 'foodisbae' } });
    enzymeWrapper.find('.auth-form').simulate('submit');
    expect(props.signIn.mock.calls.length).toBe(1);
  });

  it('should show an error message if sign in fails', () => {
    enzymeWrapper.setProps({
      error: {
        ...props,
        Error: 'Username and password do not match'
      }
    });
    enzymeWrapper.find('.auth-form').simulate('submit');
    expect(props.signIn.mock.calls.length).toBe(2);
  });

  it('should sign in a user in using this.props.googleAuth', () => {
    enzymeWrapper.instance().googleSignIn({
      accessToken: 'accessToken',
      profileObj: {
        email: '',
        givenName: ''
      }
    });
    expect(props.googleAuth.mock.calls.length).toBe(1);
  });

  it('should call forgotPassword when the forgot password link is clicked',
    () => {
      enzymeWrapper.find('#forgot-password').simulate('click');
      expect(props.forgotPassword.mock.calls.length).toBe(1);
    });
});
