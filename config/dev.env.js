'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIURL: '"https://vue-course-api.herokuapp.com"',
<<<<<<< HEAD
  // APIURL: '"https://vue-course-api.hexschool.io"',
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
  APINAME: '"darkhsu"'
})
