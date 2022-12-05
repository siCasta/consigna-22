import { readdirSync } from 'fs'
import { dirname } from 'dirname-es'
import { Router } from 'express'

const router = Router()

try {
	const __dirname = dirname(import.meta)
	const files = readdirSync(__dirname)

	for (const file of files) {
		if (file.includes('.routes.')) {
			const filename = file.split('.')[0]
			const name = filename === 'index' ? '/' : filename
			const route: Router = (await import(`./${file}`)).default

			router.use(`/${name}`, route)
		}
	}
} catch (err) {
	console.log(err)
}

export default router
