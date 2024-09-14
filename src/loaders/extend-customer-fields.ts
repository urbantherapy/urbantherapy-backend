export default async function () {
  const imports = (await import(
    '@medusajs/medusa/dist/api/routes/store/customers/index'
  )) as any
  imports.allowedStoreCustomersFields = [
    ...imports.allowedStoreCustomersFields,
    'company_name',
    'store_name',
    'vat',
  ]
  imports.defaultStoreCustomersFields = [
    ...imports.defaultStoreCustomersFields,
    'company_name',
    'store_name',
    'vat',
  ]
}
