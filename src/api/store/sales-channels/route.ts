import type {
  MedusaRequest,
  MedusaResponse,
  SalesChannelService,
} from '@medusajs/medusa'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const salesChannelService: SalesChannelService = req.scope.resolve(
    'salesChannelService'
  )

  try {
    const salesChannels = await salesChannelService.list(
      {}, // Empty selector to get all sales channels
      {
        select: ['id', 'name'],
      }
    )
    res.json({ sales_channels: salesChannels })
  } catch (error) {
    console.error('Error fetching sales channels:', error)
    res.status(500).json({ message: 'Error fetching sales channels' })
  }
}
