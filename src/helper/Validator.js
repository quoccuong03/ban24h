export default class Validator {
	static init(rules) {
		this._rules = rules
		this._data = {
			isValid: true
		}

		for (let field in rules) {
			this._data[field] = {
				value: "",
				message: null
			}
		}

		return this._data
	}
	static isPhoneNumber(value) {
		const regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
		if (value.match(regex)) {
			return true
		}
		return false
	}
	static isBlank(value) {
		return !value || /^\s*$/.test(value)
	}

	static isNumeric(value) {
		return Number.isInteger(value)
	}

	static isEmail(value) {
		// eslint-disable-next-line
		if(value===''){
			return true
		}
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(value).toLowerCase())
	}

	static isMinLength(value, minLength) {
		return value.length >= minLength
	}
	static isMaxLength(value, maxLength) {
		return value.length <= maxLength
	}

	static update(field, value) {
		const rules = this._rules[field]

		if (rules) {
			if (typeof value === "string") {
				value = value.trim()
			}

			for (let rule of rules) {
				this._data[field].value = value

				if (
					(rule.phone && !this.isPhoneNumber(value)) ||
					(rule.required && this.isBlank(value)) ||
					(rule.number && !this.isNumeric(value)) ||
					(rule.email && !this.isEmail(value)) ||
					(rule.minLength && rule.min && !this.isMinLength(value, rule.min)) ||
					(rule.maxLength && rule.max && !this.isMaxLength(value, rule.max))
				) {
					this._data.isValid = false
					this._data[field].message = rule.message
					break
				} else {
					this._data[field].message = null
				}
			}
		}

		return this._data
	}

	static test(data) {
		this._data.isValid = true

		for (let field in data) {
			this._data = Validator.update(field, data[field])
		}

		return this._data
	}
}
