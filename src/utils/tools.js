export function convertDollar(number = 0){
	return new Intl.NumberFormat("en-US").format(number)
}