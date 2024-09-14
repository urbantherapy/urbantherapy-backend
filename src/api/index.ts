import { registerOverriddenValidators } from '@medusajs/medusa'
import { StorePostCustomersReq as MedusaStorePostCustomersReq } from '@medusajs/medusa/dist/api/routes/store/customers/create-customer'
import { StorePostCustomersCustomerReq as MedusaStorePostCustomersCustomerReq } from '@medusajs/medusa/dist/api/routes/store/customers/update-customer'
import { StoreGetProductsParams as MedusaStoreGetProductsParams } from '@medusajs/medusa/dist/api/routes/store/products/index'

import { IsString, IsOptional } from 'class-validator'

class StorePostCustomersReq extends MedusaStorePostCustomersReq {
  @IsString()
  company_name?: string

  @IsString()
  store_name?: string

  @IsString()
  vat?: string
}

// Extend the request type for customer updates
class StorePostCustomersCustomerReq extends MedusaStorePostCustomersCustomerReq {
  @IsOptional()
  @IsString()
  company_name?: string

  @IsOptional()
  @IsString()
  store_name?: string

  @IsOptional()
  @IsString()
  vat?: string
}

// Register the overridden validators
registerOverriddenValidators(StorePostCustomersReq)
registerOverriddenValidators(StorePostCustomersCustomerReq)

// // Extend the request type for product list
// class StoreGetProductsParams extends MedusaStoreGetProductsParams {
//   @IsOptional()
//   @IsString()
//   'custom_attributes.color'?: string

//   @IsOptional()
//   @IsString()
//   'custom_attributes.size'?: string

//   // Add other custom attributes filters here
// }
// registerOverriddenValidators(StoreGetProductsParams)
