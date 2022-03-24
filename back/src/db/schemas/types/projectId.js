const { nanoid } = require('nanoid');

const id = {
  type: String,
  default: () => {
    return nanoid()
  },
  require: true,
  index: true,
}

module.exports = id;