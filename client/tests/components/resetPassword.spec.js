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

  it('should change state.newPassword as a user inputs his new password',
    () => {
      enzymeWrapper.find('#newpassword').simulate('change',
        { target: { name: 'newPassword', value: '12345678' } });
      expect(enzymeWrapper.state('newPassword')).toBe('12345678');
    });
});
