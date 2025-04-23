const mockConversionRates = {
    USD: 1.0,
    EUR: 0.8967,
    JPY: 150.79,
    GBP: 0.7674,
    AUD: 1.5946,
    CAD: 1.4286,
    CHF: 0.8875,
    CNY: 7.3046,
    INR: 85.42,
    KES: 129.47
};

const dropList = document.querySelectorAll(".drop-list select"),
      fromCurrency = dropList[0],
      toCurrency = dropList[1],
      exchangeRateTxt = document.querySelector(".exchange-rate"),
      amountInput = document.querySelector("input");

// Populate dropdowns
for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in mockConversionRates) {
        let selected = (i === 0 && currency_code === "USD") || (i === 1 && currency_code === "KES") ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
        getExchangeRate(); // update rate immediately when dropdown changes
    });
}

// Load flag icons
function loadFlag(element){
    for (let code in mockConversionRates){
        if(code === element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`; // Using currency code as ISO for mock
        }
    }
}

// Calculate exchange rate
function convertCurrency(amount, from, to) {
    const fromRate = mockConversionRates[from];
    const toRate = mockConversionRates[to];

    if (!fromRate || !toRate) return null;

    const usdAmount = amount / fromRate;
    const converted = usdAmount * toRate;

    return converted.toFixed(2);
}

// Get and display exchange rate
function getExchangeRate() {
    const amountVal = parseFloat(amountInput.value) || 1;

    exchangeRateTxt.innerText = "Getting exchange rate...";

    const totalExchangeRate = convertCurrency(amountVal, fromCurrency.value, toCurrency.value);

    if (totalExchangeRate !== null) {
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    } else {
        exchangeRateTxt.innerText = "Currency not supported in demo";
    }
}

// Update rate when amount changes
amountInput.addEventListener("input", getExchangeRate);

// On page load
window.addEventListener("load", () => {
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});