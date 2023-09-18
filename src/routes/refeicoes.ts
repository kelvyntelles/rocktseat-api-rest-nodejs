import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../database"
import { randomUUID } from "crypto"

export async function refeicoesRoutes(app: FastifyInstance) {
    app.get('/', async (request) => {
        const refeicoes = await knex('refeicaos')
            .select('*')
        
        return { refeicoes }
    })   
    
    app.get('/:id', async (request) => {
        const getRefeicaoParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getRefeicaoParamsSchema.parse(request.params)
        
        const refeicoes = await knex('refeicaos')
            .where({
                id
            })
            .first()

        return { refeicoes }
    })   

    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            nome: z.string(),
            descricao: z.string(),
            dieta: z.boolean(),
            id_usuario: z.string()
        })

        const { nome, descricao, dieta, id_usuario } = createTransactionBodySchema.parse(
            request.body
        )

        await knex('refeicaos').insert({
            id: randomUUID(),
            nome,
            descricao,
            eDieta: dieta,
            id_usuario
        })
    
        return reply.status(201).send()
    })
    
    app.put('/:id', async (request, reply) => {
        const getRefeicaoParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getRefeicaoParamsSchema.parse(request.params)

        const updateTransactionBodySchema = z.object({
            nome: z.string(),
            descricao: z.string(),
            dieta: z.boolean()
        })

        const { nome, descricao, dieta } = updateTransactionBodySchema.parse(
            request.body
        )
        
        const refeicoes = await knex('refeicaos')
            .where({ id })
            .update({
                nome,
                descricao,
                eDieta: dieta
            })

        return reply.status(200).send()
    })   
    
    app.delete('/:id', async (request, reply) => {
        const getRefeicaoParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getRefeicaoParamsSchema.parse(request.params)
        
        await knex('refeicaos')
            .where({
                id
            })
            .del()

        return reply.status(200).send()
    })   
} 

