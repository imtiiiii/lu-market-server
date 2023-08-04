import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE") 
      table.string("name", 100).notNullable()
      table.string("description", 255).notNullable()
      table.string("image", 255).nullable()
      table.integer("price").notNullable()
      table.integer("stock").nullable()
      table.string('category', 100).notNullable()
      table.string('edition',10).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
