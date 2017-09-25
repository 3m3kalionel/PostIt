import React from 'react';
import { shallow } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import LandingPage from '../../components/auth/LandingPage';

const enzymeWrapper = shallow(<LandingPage />);

describe('Given the landing page is mounted', () => {
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should have state with property forgot as false', () => {
    expect(enzymeWrapper.state('forgot')).toBe(false);
  });

  it('should not render forgotpassword page if this.state.forgot is false', () => {
    expect(enzymeWrapper.find('ForgotPassword').exists()).toBe(false);
  });

  it('should set this.state.forgot to true when forgotPassword is called', () => {
    const component = enzymeWrapper.instance();
    component.forgotPassword();
    expect(enzymeWrapper.state('forgot')).toBe(true);
  });

  it('should render forgotpassword page if this.state.forgot is true', () => {
    expect(enzymeWrapper.find('ForgotPassword').exists()).toBe(true);
    expect(enzymeWrapper.find('.page-wrapper').exists()).toBe(false);
  });

  it('should set this.state.forgot to false when revertForgotPassword is called', () => {
    const component = enzymeWrapper.instance();
    component.revertForgotPassword();
    expect(enzymeWrapper.state('forgot')).toBe(false);
  });
});


// describe('LandingPage Component', () => {
//   const landingPage = mount(<LandingPage {...props} />);
//   it('should have a main css class called page-wrapper', () => {
//     expect(landingPage.node.props.className).toEqual('page-wrapper');
//   });
//   it('should have a forgotPassword prop', () => {
//     expect(landingPage.unrendered.props.forgotPassword()).toEqual(true);
//   });
//   it('should render the SignupForm Component', () => {
//     expect(landingPage.find('Connect(SignUpForm)').length).toEqual(1);
//   });
//   it('should render the SignInForm Component', () => {
//     expect(landingPage.find('Connect(SignInForm)').length).toEqual(1);
//   });
//   it('should render the SignInForm Component', () => {
//     expect(landingPage.find('div').length).toEqual(6);
//   });
//   it('has a revertForgotPassword method', () => {
//     expect(LandingPage.prototype.revertForgotPassword).toBeDefined();
//   });
//   it('has a forgotPassword method', () => {
//     expect(LandingPage.prototype.forgotPassword).toBeDefined();
//   });
// });
