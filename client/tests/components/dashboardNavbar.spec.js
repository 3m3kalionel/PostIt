import React from 'react';
import { shallow } from 'enzyme';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar.jsx';

const props = {
  forgotPassword: () => true,
};

describe('DashboardNavbar Component', () => {
  const navbar = shallow(<DashboardNavbar {...props} />);
  it('should have a main css class called dashboard-navbar', () => {
    expect(navbar.node.props.className).toEqual('dashboard-navbar');
  });
  it('should render one nav element', () => {
    expect(navbar.find('nav').length).toEqual(1);
  });
  it('should render two a elements', () => {
    expect(navbar.find('a').length).toEqual(2);
  });
  it('should render three i elements', () => {
    expect(navbar.find('i').length).toEqual(3);
  });
  it('should render one div', () => {
    expect(navbar.find('div').length).toEqual(1);
  });
  it('should render one Link component', () => {
    expect(navbar.find('Link').length).toEqual(1);
  });
});
