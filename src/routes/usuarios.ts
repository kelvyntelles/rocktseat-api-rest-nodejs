import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../database"
import { randomUUID } from "crypto"

export async function usuariosRoutes(app: FastifyInstance) {
    app.get('/', async () => {
        const usuarios = await knex('usuarios').select('*')

        return { usuarios: usuarios }
    })   
    
    app.get('/refeicoes/:id', async (request) => {
        const getIdParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdParamsSchema.parse(request.params)

        const refeicoes = await knex('refeicaos')
            .where({ id_usuario: id })
            .select('*')

        return { refeicoes }
    })   

    app.get('/total_refeicoes/:id', async (request) => {
        const getIdParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdParamsSchema.parse(request.params)

        const refeicoes = await knex('refeicaos')
            .where({ id_usuario: id })

        const total_refeicoes = refeicoes.length
            
        return total_refeicoes
    })   

    app.get('/total_refeicoes_dieta/:id', async (request) => {
        const getIdParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdParamsSchema.parse(request.params)

        const refeicoes = await knex('refeicaos')
            .where({ id_usuario: id, eDieta: true })

        const total_refeicoes = refeicoes.length
            
        return total_refeicoes
    })   

    app.get('/total_refeicoes_fora_dieta/:id', async (request) => {
        const getIdParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdParamsSchema.parse(request.params)

        const refeicoes = await knex('refeicaos')
            .where({ id_usuario: id, eDieta: false })

        const total_refeicoes = refeicoes.length
            
        return total_refeicoes
    })   

    app.post('/', async (request, reply) => {
        const createUsuarioBodySchema = z.object({
            nome: z.string()
        })

        const { nome } = createUsuarioBodySchema.parse( request.body )

        await knex('usuarios').insert({
            id: randomUUID(),
            nome,       
        })

        return reply.status(201).send()
    })
} 

