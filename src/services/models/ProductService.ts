import ProductMemory from '../../models/Product.js'
import {
	ProductData,
	ProductDataFilter,
	ProductDataKey
} from '../../types/models.js'

export default class ProductService {
	private model: ProductMemory

	constructor() {
		this.model = new ProductMemory()
	}

	getProducts() {
		return this.model.find()
	}

	getProduct<T extends ProductDataKey>(query: ProductDataFilter<T>) {
		return this.model.findOne(query)
	}

	createProduct(values: Omit<ProductData, 'id'>) {
		return this.model.insertOne(values)
	}

	updateProduct<T extends ProductDataKey, K extends ProductDataKey>(
		query: ProductDataFilter<T>,
		values: ProductDataFilter<K>
	) {
		return this.model.updateOne(query, values)
	}

	deleteProduct<T extends ProductDataKey>(query: ProductDataFilter<T>) {
		return this.model.deleteOne(query)
	}
}
