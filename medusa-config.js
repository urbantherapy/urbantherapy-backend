const dotenv = require('dotenv')

let ENV_FILE_NAME = ''
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production'
    break
  case 'staging':
    ENV_FILE_NAME = '.env.staging'
    break
  case 'test':
    ENV_FILE_NAME = '.env.test'
    break
  case 'development':
  default:
    ENV_FILE_NAME = '.env'
    break
}

try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME })
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || 'http://localhost:7000,http://localhost:7001'

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:8000'

// Database configuration
const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}` +
    `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const REDIS_URL = process.env.EVENTS_REDIS_URL || 'redis://localhost:6379'

const STRIPE_API_KEY = process.env.STRIPE_API_KEY

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: 'uploads',
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: STRIPE_API_KEY,
      // webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: '@medusajs/admin',
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      serve: process.env.NODE_ENV === 'development',
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== 'false',
      },
    },
  },
  {
    resolve: `medusa-custom-attributes`,
    options: {
      enableUI: true,
      projectConfig: {
        store_cors: STORE_CORS,
        admin_cors: ADMIN_CORS,
      },
    },
  },
  {
    resolve: 'medusa-plugin-ses',
    options: {
      access_key_id: process.env.SES_ACCESS_KEY_ID,
      secret_access_key: process.env.SES_SECRET_ACCESS_KEY,
      region: process.env.SES_REGION,
      from: process.env.SES_FROM,
      template_path: process.env.SES_TEMPLATE_PATH,
      // optional string containing email address separated by comma
      order_placed_cc: 'office@urbantherapy.be',
      enable_endpoint: process.env.SES_ENABLE_ENDPOINT,
      enable_sim_mode: process.env.SES_ENABLE_SIM_MODE,
      order_placed_template: 'order_placed',
      order_shipped_template: 'order_shipped',
      user_password_reset_template: 'user_password_reset',
      gift_card_created_template: 'gift_card_created',
    },
  },
]

const modules = {
  // eventBus: {
  //   resolve: '@medusajs/event-bus-local',
  //   options: {
  //     redisUrl: REDIS_URL
  //   }
  // },
  // eventBus: {
  //   resolve: '@medusajs/event-bus-redis',
  //   options: {
  //     redisUrl: process.env.EVENTS_REDIS_URL,
  //   },
  // },
  /* cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
}

const database_extra =
  process.env.NODE_ENV === 'production'
    ? { ssl: { rejectUnauthorized: false } }
    : {}

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET || 'supersecret',
  cookie_secret: process.env.COOKIE_SECRET || 'supersecret',
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  database_extra,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL,
}

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
}
