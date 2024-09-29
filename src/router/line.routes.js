const controller = require('../controllers/line.controller')

module.exports = function (app) {
  app.get('/line/redirect', controller.redirect)
  app.post('/line/notify', controller.notify)
}
