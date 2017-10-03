import React from 'react';
import { shallow } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';

const enzymeWrapper = shallow(<DashboardNavbar />, {
  lifecycleExperimental: true
});

describe('DashboardNavbar Component', () => {
  it('should render self when mounted', () => {
    expect(enzymeWrapper.find('.dashboard-navbar').exists()).toBe(true);
  });

  it('should remove tooltips when logout button is clicked', () => {
    enzymeWrapper.find('#logout-button').simulate('click');
  });
});
