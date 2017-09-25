import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
// import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Dasboard from '../../components/dashboard/Dashboard';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  user: {
    isAuthenticated: true,
    userName: 'rhage',
    email: 'baddest@gmail.com',
    token: 'hjkjbhjvghcfvghvbvj'
  },
  groups: {
    id: 1,
    name: 'rowland',
    description: 'another one',
    createdAt: 'jhbkjnbh',
    updatedAt: 'jjkbhjb'
  },
  groupsData: {}
});

const props = {
  groups: [{
    id: 1,
    name: 'rowland',
    description: 'another one',
    createdAt: 'jhbkjnbh',
    updatedAt: 'jjkbhjb'
  }],
  listGroups: () => 'listing Groups',
  groupsData: {},
  createMessage: () => 'creating Message'
};


describe('Dashboard Component', () => {
  const dashboard = shallow(
    <Provider store={store}>
      <Dasboard {...props} />
    </Provider>
  );
  it('should have a groups prop', () => {
    expect(dashboard.props().groups).toEqual(props.groups);
  });
  it('should have a listGroups prop', () => {
    expect(dashboard.props().listGroups()).toEqual(props.listGroups());
  });
  it('should have a createMessage prop', () => {
    expect(dashboard.props().createMessage()).toEqual(props.createMessage());
  });
  // it('should render the GroupsList Component', () => {
  //   const alldivs = dashboard.find('div');
  //   console.log("alldivs", alldivs.unrendered.props);
  //   alldivs.forEach((div) => {
  //     console.log("divvvy", div);
  //   });
  //   expect(dashboard.find('Connect(Dashboard)').length).toEqual(1);
  // });
  // it('should render the MessageArea Component', () => {
  //   expect(dashboard.find('Connect(MessageArea)').length).toEqual(1);
  // });
  // it('should render the SignInForm Component', () => {
  //   expect(dashboard.find('div').length).toEqual(6);
  // });
  // it('has a revertForgotPassword method', () => {
  //   expect(dashboard.prototype.revertForgotPassword).toBeDefined();
  // });
  // it('has a forgotPassword method', () => {
  //   expect(dashboard.prototype.forgotPassword).toBeDefined();
  // });
});
