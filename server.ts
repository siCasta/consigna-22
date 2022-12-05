import { createServer } from 'http'
import app from './src/settings.js'

const server = createServer(app)

server.listen(8080)
server.on('listening', () => {
	console.log(`Listening on ${8080}`)
})
