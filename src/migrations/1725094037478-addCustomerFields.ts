import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCustomerFields1725094037478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "customer" 
        ADD COLUMN "company_name" VARCHAR,
        ADD COLUMN "store_name" VARCHAR,
        ADD COLUMN "vat" VARCHAR
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "customer"
      DROP COLUMN "company_name",
      DROP COLUMN "store_name",
      DROP COLUMN "vat"
    `)
  }
}
