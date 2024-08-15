import {
  requireCustomerAuthentication,
  type MiddlewaresConfig,
} from '@medusajs/medusa'

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: '/store/customers/is-b2b',
      middlewares: [requireCustomerAuthentication()],
    },
  ],
}
