export default function priceToText(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
