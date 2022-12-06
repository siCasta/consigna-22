export const haveKeys = (
	object: Record<string, unknown>,
	keys: Array<string>
): [boolean, string] => {
	for (const key of keys) {
		if (!(key in object)) return [false, `${key} is missing`]
	}

	return [true, '']
}
