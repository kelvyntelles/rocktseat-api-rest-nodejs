import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('refeicaos', (table) => {
        table.uuid('id').primary()
        table.text('nome').notNullable()
        table.text('descricao').notNullable()
        table.dateTime('data').defaultTo(new Date)
        table.boolean('eDieta').notNullable()
        table.text('id_usuario').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('refeicaos')
}

