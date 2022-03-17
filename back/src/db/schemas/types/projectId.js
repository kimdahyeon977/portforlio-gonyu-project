const { nanoid } = require('nanoid');

const projectId = {
  type: String,
  default: () => {
    return nanoid()
  },
  require: true,
  index: true,
}

module.exports = projectId;