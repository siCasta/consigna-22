import { v4 as uuid } from 'uuid'

import {
	ProductData,
	ProductDataFilter,
	ProductDataKey
} from '../types/models.js'

export default class ProductMemory {
	private data: Array<ProductData>

	constructor() {
		this.data = [
			{
				id: '6dffbdf8-72ef-4118-a839-f8d908585651',
				name: 'rice',
				price: 10,
				desc: 'is rice'
			},
			{
				id: '309f24ec-9d76-4fd8-8735-0f1d292f7267',
				name: 'wood',
				price: 10,
				desc: 'is wood'
			},
			{
				id: '8146cde2-3e3c-4a0f-9514-94b3f767b19f',
				name: 'water',
				price: 10,
				desc: 'is water'
			}
		]
	}

	private static matches<T, K extends keyof T>(query: Pick<T, K>, data: T) {
		for (const [k, v] of Object.entries(query)) {
			if (data[k as K] !== v) return false
		}

		return true
	}

	insertOne(values: Omit<ProductData, 'id'>) {
		const id = uuid()

		const item: ProductData = {
			id,
			...values
		}

		this.data = [...this.data, item]

		return item
	}

	findOne<T extends ProductDataKey>(query: ProductDataFilter<T>) {
		const item = this.data.find(i => ProductMemory.matches(query, i))

		if (!item) null

		return item
	}

	find() {
		return this.data
	}

	updateOne<T extends ProductDataKey, K extends ProductDataKey>(
		query: ProductDataFilter<T>,
		values: ProductDataFilter<K>
	) {
		const item = this.findOne(query)

		if (!item) throw Error('The product id does not exists')

		const newItem: ProductData = { ...item, ...values }

		this.data = this.data.map(i =>
			ProductMemory.matches(query, i) ? newItem : i
		)
	}

	deleteOne<T extends ProductDataKey>(query: ProductDataFilter<T>) {
		this.data = this.data.filter(i => !ProductMemory.matches(query, i))
	}
}
