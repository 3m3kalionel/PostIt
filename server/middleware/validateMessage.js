module.exports = {
  /**
  * Checks if any input detail is empty. Calls next if false.
  * Else, returns failure details in an object.
  * @param {object} req
  * @param {object} res
  * @param {function} next
  * @param {string} req.body.content
  * @param {string} req.body.priority
  * @returns {object} response object containing a success status and a message
  */
  isEmpty(req, res, next) {
    const content = req.body.content;
    const priority = req.body.priority;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        message: 'Please enter a message'
      });
    } else if (priority === undefined || !priority) {
      return res.status(400).json({
        message: 'Please specify a message priority'
      });
    }
    next();
  }
};
