const line = require('@/services/line')
const path = require('path')

exports.redirect = async (req, res) => {
  try {
    await line.token(req.query.code, req.query.state)
    res.sendFile(path.join(__dirname, '../../views', 'line-connected.html'))
  } catch (error) {
    return res.json(error)
  }
}

exports.notify = async (req, res) => {
  try {
    await line.notify(req.body.message, req.body.lineToken)
    return res.status(200).send({ message: 'Notify Successfully.' })
  } catch (error) {
    return res.json({ error: error.response.data.message })
  }
}
