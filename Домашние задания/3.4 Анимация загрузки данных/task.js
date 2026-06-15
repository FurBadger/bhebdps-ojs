const loader = document.getElementById('loader');
const items = document.getElementById('items');
const updateTime = document.getElementById('update-time');
const requestUrl = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const storageKey = 'currencyRates';

function createCurrencyItem(currency) {
  const item = document.createElement('div');
  item.className = 'item';

  const code = document.createElement('div');
  code.className = 'item__code';
  code.textContent = currency.CharCode;

  const value = document.createElement('div');
  value.className = 'item__value';
  value.textContent = currency.Value;

  const currencyLabel = document.createElement('div');
  currencyLabel.className = 'item__currency';
  currencyLabel.textContent = 'руб.';

  item.appendChild(code);
  item.appendChild(value);
  item.appendChild(currencyLabel);

  return item;
}

function renderCurrencies(currencies) {
  items.innerHTML = '';

  Object.values(currencies).forEach(function (currency) {
    const currencyItem = createCurrencyItem(currency);
    items.appendChild(currencyItem);
  });
}

function showLoader() {
  loader.classList.add('loader_active');
}

function hideLoader() {
  loader.classList.remove('loader_active');
}

function setUpdateTime() {
  const now = new Date();
  updateTime.textContent = 'Обновлено: ' + now.toLocaleTimeString();
}

function saveCurrenciesToStorage(currencies) {
  localStorage.setItem(storageKey, JSON.stringify(currencies));
}

function getCurrenciesFromStorage() {
  const savedCurrencies = localStorage.getItem(storageKey);

  if (!savedCurrencies) {
    return null;
  }

  return JSON.parse(savedCurrencies);
}

function showErrorMessage() {
  updateTime.textContent = 'Не удалось загрузить данные';
}

function loadCurrencies() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', requestUrl);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const responseData = xhr.response;
      const currencies = responseData.response.Valute;

      renderCurrencies(currencies);
      saveCurrenciesToStorage(currencies);
      setUpdateTime();
    } else{
        showErrorMessage();
    }

    hideLoader();
  });

  xhr.addEventListener('error', function () {
    showErrorMessage();
    hideLoader();
  });

  xhr.send();
}

function initPage() {
  const savedCurrencies = getCurrenciesFromStorage();

  if (savedCurrencies) {
    renderCurrencies(savedCurrencies);
    setUpdateTime();
  } else {
    showLoader();
  }

  loadCurrencies();
}

initPage();