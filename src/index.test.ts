import ProductService from './services/models/ProductService.js'
import assert from 'assert/strict'

describe('ProductService', () => {
	it('Cuando se instancia la clase viene con 3 productos', () => {
		const ProService = new ProductService()
		assert.strictEqual(ProService.getProducts().length, 3)
	})

	it('Cuando se crea un producto pasa a 4', () => {
		const ProService = new ProductService()
		const products = ProService.getProducts()
		const product = ProService.createProduct({
			name: 'a',
			desc: 'a',
			price: 1
		})

		assert.strictEqual(ProService.getProducts().length, 4)
		assert.deepStrictEqual(ProService.getProducts(), [...products, product])
	})
})
