import { dirname } from 'dirname-es'
import express from 'express'
import { join } from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

import apiRoutes from './api/routes/index.js'

const __dirname = dirname(import.meta)
const app = express()
const swaggerOptions = {
	definition: {
		openapi: '3.0.n',
		info: {
			title: 'API consigna 22',
			description: 'Documentacion de la API de la consigna 22',
			version: '1.0.0'
		}
	},
	apis: [`${__dirname}/docs/**/*.yaml`]
} as swaggerJsdoc.Options
const specs = swaggerJsdoc(swaggerOptions)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static
app.use(express.static(join(__dirname, '..', 'public')))

// routes
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/api', apiRoutes)

// 404
app.use((_req, res, _next) => {
	res.json({
		error: 'Not found 😶‍🌫️'
	})
})

export default app
