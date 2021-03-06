'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIURL: '"https://vue-course-api.herokuapp.com"',
  // APIURL: '"https://vue-course-api.hexschool.io"',
  APINAME: '"darkhsu"'
})
