export async function convertToNaira(amount: number, fromCurrency: string): Promise<number> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/currency/v1/convert?q=${fromCurrency}_NGN&compact=ultra&apiKey=${process.env.GOOGLE_CURRENCY_API_KEY}`
    );
    const data = await response.json();
    const rate = data[`${fromCurrency}_NGN`];
    return amount * rate;
  } catch (error) {
    console.error('Currency conversion error:', error);
    return amount; // Return original amount if conversion fails
  }
}