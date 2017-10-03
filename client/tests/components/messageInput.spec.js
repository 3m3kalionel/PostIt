import React from 'react';
import { shallow } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import MessageInput from '../../components/dashboard/MessageInput';

const props = {
  onSubmit: jest.fn(),
  isVisible: true
};

const enzymeWrapper = shallow(<MessageInput {...props} />, {
  lifecycleExperimental: true
});

describe('Given the message input component is mounted', () => {
  it('should render self', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should change state.message when a user inputs a message', () => {
    enzymeWrapper.instance().handleInputChange({ target: { value: 'emeka' } });
    expect(enzymeWrapper.state('message')).toBe('emeka');
  });

  it('sends a message when the send button is clicked', () => {
    enzymeWrapper.find('#submit-button').simulate('click');
    expect(props.onSubmit).toBeCalled();
  });

  it('clears state when clear message is called', () => {
    enzymeWrapper.instance().clearMessage();
    expect(enzymeWrapper.state('message')).toBe('');
  });

  it('calls componentWillReceiveProps', () => {
    enzymeWrapper.setProps({ isVisible: true });
    expect(props.isVisible).toBe(true);
  });
});

