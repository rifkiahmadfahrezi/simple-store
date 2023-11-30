export function convertDollar(number = 0){
	return new Intl.NumberFormat("en-US").format(number)
}

export function getDiscountedPrice(discount = 0, actualPrice = 0){
    const discountPrice = Number(actualPrice) * Number(discount) / 100
    const discountedPrice = actualPrice - discountPrice 
    return Math.round(discountedPrice)
}