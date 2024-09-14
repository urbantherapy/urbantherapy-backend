import { Entity, Column } from 'typeorm'

import { Customer as MedusaCustomer } from '@medusajs/medusa'

@Entity()
export class Customer extends MedusaCustomer {
  @Column()
  company_name: string

  @Column()
  store_name: string

  @Column()
  vat: string
}
