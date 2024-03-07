'use strict'
require('dotenv').config()

const CONFIG = {}
CONFIG.env = process.env.ENV || 'development'
CONFIG.port = process.env.PORT || '8080'

CONFIG.bearer_token = process.env.BEARER_TOKEN || 'token'
CONFIG.salt_pass = process.env.SALT_PASS || 'salt_pass'

CONFIG.whitelist_cors = process.env.WHITELIST_CORS || []

CONFIG.db_server = process.env.DB_SERVER || 'localhost'
CONFIG.db_port = process.env.DB_PORT || 3306
CONFIG.db_name = process.env.DB_NAME || 'ecommerce_db'
CONFIG.db_user = process.env.DB_USER || 'root'
CONFIG.db_pass = process.env.DB_PASS || ''

CONFIG.access_token_expiration = process.env.ACCESS_TOKEN_EXPIRATION || 60 * 60 * 24 * 7 // 7 days

module.exports = CONFIG
