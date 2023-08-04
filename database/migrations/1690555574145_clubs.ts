import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clubs extends BaseSchema {
  protected tableName = 'clubs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")
      table.string("name", 100).notNullable()
      table.string("description", 255).notNullable()
      table.string("image", 255).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}