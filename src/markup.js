import debounce from 'lodash.debounce';
import { onInputChange } from './index';

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, 300));
// функция для разметки списка стран
export function makeMarkupCountries(countries) {
  const markup = countries.map(({ flags: { svg }, name: { official } }) => {
    return `<li class='country-list__item'><img width=30 src='${svg}'/><p class='country-list__text'>${official}</p></li>`;
  });

  refs.ul.innerHTML = markup.join('');
}

// функция для разметки 1 карточки
//когда 1 страна, это массив, деструктиризируем его
export function makeMarkupCountry([country]) {
  const {
    flags: { svg },
    name: { official },
    capital,
    population,
    languages,
  } = country;

  refs.div.innerHTML = `<img width=30 src='${svg}'/><h2>${official}</h2>
  <p><span class='country-list__span'>Capital: </span>${capital}</p>
  <p><span class='country-list__span'>Population: </span>${population}</p>
  <p><span class='country-list__span'>Languages: </span>${Object.values(
    languages
  ).join(', ')}</p>`;
}

//очистка разметки
export function clearMarkup() {
  refs.div.innerHTML = '';
  refs.ul.innerHTML = '';
}
