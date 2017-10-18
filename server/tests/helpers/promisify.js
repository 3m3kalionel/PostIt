/**
 * Helper function class used in the server-side tests
 * @class promisify
 * @extends {Component}
 * @param {object} app
 * @param {object} request
*/
class promisify {
  /**
   * Creates an instance of promisify
   * @class promisify
   * @extends {Component}
   * @param {object} app
   * @param {object} request
  */
  constructor(app, request) {
    this.app = app;
    this.request = request;
  }

  /**
   * @memberof promisify
   * Used for signing in users. returns a promise
   * @class promisify
   * @extends {Component}
   * @param {object} currentUser
  */
  signin(currentUser) {
    return new Promise((resolve) => {
      this.request(this.app)
        .post('/api/v1/user/signin')
        .send(currentUser)
        .end((err, res) => {
          resolve(res.body.token);
        });
    });
  }
}

export default promisify;
