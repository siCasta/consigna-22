import Supertest from 'supertest'
import chai from 'chai'
import { ProductData } from '../../types/models.js'

const expect = chai.expect
const requester = Supertest('http://localchost:8080')

describe('Products testing', () => {
	describe('GET', () => {
		it('La peticion base debe retornar 200', () => {
			requester.get('/api/products').then(response => {
				expect(response.status).to.be.equal(200)
			})
		})

		it('La peticion base debe retornar un arreglo', () => {
			requester.get('/api/products').then(response => {
				expect(response.body).to.be.an('array')
			})
		})
	})

	describe('POST', () => {
		it('La peticion debe crear un producto', () => {
			const pro: Omit<ProductData, 'id'> = {
				name: 'h',
				desc: 'is h',
				price: 1
			}

			requester
				.post('/api/products')
				.send(pro)
				.then(response => {
					expect(response.status).to.include.keys(
						'id',
						'name',
						'desc',
						'price'
					)
				})
		})
	})
})
