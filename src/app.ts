import fastify from "fastify"

import { usuariosRoutes } from "./routes/usuarios"
import { refeicoesRoutes } from "./routes/refeicoes"

export const app = fastify()

app.register(usuariosRoutes, {
    prefix: 'usuarios',
})

app.register(refeicoesRoutes, {
    prefix: 'refeicoes',
})


