import React from 'react';
import { shallow } from 'enzyme';
import 'materialize-css/dist/js/materialize';
import GroupsList from '../../components/dashboard/GroupsList';

const props = {
  groups: [],
  selectGroup: jest.fn()
};

const enzymeWrapper = shallow(<GroupsList {...props} />);

describe('Given the GroupsList component is rendered', () => {
  it('should render self and sub-components', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
