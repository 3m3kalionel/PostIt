import React, { Component } from 'react';

class DashboardNavbar extends Component {
  render() {
    return (
      <div>
        <nav>
            <div className="container">
              {/*<div class="nav-wrapper row">*/}
              <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
              <a href="#!" className="brand-logo col s3 m9">PostIt!</a>
              <ul className="right col s5 offset-s4 m3">
                <li><a className="large material-icons">notifications</a></li>                        
                <li><a href="#!" className="material-icons large">exit_to_app</a></li>
              </ul>
              {/*</div>*/}
            </div>
        </nav>
      </div>
    );
  }
}

export default DashboardNavbar;
