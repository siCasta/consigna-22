export interface ProductData {
	id: string
	name: string
	price: number
	desc: string
}

export type ProductDataKey = keyof ProductData
export type ProductDataFilter<T extends ProductDataKey> = Pick<ProductData, T>
