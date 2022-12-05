import { dirname } from 'dirname-es'
import express from 'express'
import { join } from 'path'

import apiRoutes from './api/routes/index.js'

const __dirname = dirname(import.meta)
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static
app.use(express.static(join(__dirname, '..', 'public')))

// routes
app.use('/api', apiRoutes)

// 404
app.use((_req, res, _next) => {
	res.json({
		error: 'Not found 😶‍🌫️'
	})
})

export default app
