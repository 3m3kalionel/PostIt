module.exports = {
  isNull(req, res, next) {
    const content = req.body.content;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Please enter a message'
      });
    }
    next();
  }
};