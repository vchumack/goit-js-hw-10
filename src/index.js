import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './fetchCountries';
import { makeMarkupCountries } from './markup';
import { makeMarkupCountry } from './markup';
import { clearMarkup } from './markup';
import './css/styles.css';

export function onInputChange(e) {
  // сразу вызываем очистку разметки
  clearMarkup();

  // если в инпуте что-то есть, то отправляем запрос на сервер
  let value = e.target.value.trim();
  if (value) {
    fetchCountries(value)
      .then(r => {
        // обработка в fetch() ошибки 404
        if (!r.ok) {
          throw new Error(r.status);
        }
        return r.json();
      })
      //если бекенд что-то вернул, то получаем дальше страны
      .then(countries => {
        if (countries.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (countries.length >= 2 && countries.length <= 10) {
          makeMarkupCountries(countries);
          return;
        }
        makeMarkupCountry(countries);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
}
