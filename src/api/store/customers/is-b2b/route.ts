import type {
  CustomerService,
  MedusaRequest,
  MedusaResponse,
} from '@medusajs/medusa'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const customerService: CustomerService = req.scope.resolve('customerService')

  const customer = await customerService.retrieve(req.user.customer_id, {
    relations: ['groups'],
  })

  const is_b2b = customer.groups.some(
    (group) => group.metadata.is_b2b === 'true'
  )

  return res.json({
    is_b2b,
  })
}
