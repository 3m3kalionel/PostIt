import React from 'react';
import { shallow } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import LandingPage from '../../components/auth/LandingPage';

const enzymeWrapper = shallow(
  <LandingPage />
);

const wrapperInstance = enzymeWrapper.instance();


describe('Given the landing page is mounted', () => {
  it('should render component and sub-components', () => {
    expect(enzymeWrapper.exists()).toBe(true);
    expect(enzymeWrapper.find('#signin-form').exists()).toBe(true);
    expect(enzymeWrapper.find('#signup-form').exists()).toBe(true);
  });

  it('should have an initial state with property forgot as false', () => {
    expect(enzymeWrapper.state('forgot')).toEqual(false);
  });

  it('should not render ForgotPassword if state.forgot is false', () => {
    expect(enzymeWrapper.find('.forgot-password').exists()).toEqual(false);
  });

  it('should set state.forgot to true when forgotPassword is called', () => {
    wrapperInstance.forgotPassword();
    expect(enzymeWrapper.state('forgot')).toEqual(true);
  });

  it('should render ForgotPassword page when forgotPassword is called', () => {
    wrapperInstance.forgotPassword();
    expect(enzymeWrapper.find('.forgot-password').exists()).toBe(true);
    expect(enzymeWrapper.find('#signin-form').exists()).toBe(false);
    expect(enzymeWrapper.find('#signup-form').exists()).toBe(false);
  });

  it('should set state.forgot to false when revertForgotPassword is called',
    () => {
      wrapperInstance.revertForgotPassword();
      expect(enzymeWrapper.state('forgot')).toEqual(false);
    });
});
