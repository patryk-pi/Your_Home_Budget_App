export const myHeaders = new Headers();
myHeaders.append("apikey", "RFnf6Q9l1Zg5oHTMouqeBMgZ13l9SvkI");

export const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

export const convertCurrency = (baseCurrency, targetCurrency, amount) => {

    const absAmount = Math.abs(amount)

    fetch(`https://api.apilayer.com/fixer/convert?to=${targetCurrency}&from=${baseCurrency}&amount=${absAmount}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result.result
        })
        .catch(error => console.log('error', error));
}