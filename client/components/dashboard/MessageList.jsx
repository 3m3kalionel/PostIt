import React, { Component } from 'react';

class MessageList extends Component {
  render () {
    return (
      <div>
        <ul id="message-list">
          <li>
            <div className="row">
              <div className="col s12">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="row">
              <div className="col s12">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="row">
              <div className="col s12">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default MessageList;