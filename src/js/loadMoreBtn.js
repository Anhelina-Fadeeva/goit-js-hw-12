'use strict';
import ButtonService from './ButtonService';
import { fetchData } from './fetchDataModule'; // Переконайтеся, що ця функція імпортована або визначена

const loadMoreButton = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader'); // Вкажіть правильний селектор для вашого лоадера
const buttonService = new ButtonService(loadMoreButton, 'hidden'); // 'hidden' - це клас, який приховує кнопку

function performSearch(query) {
  // Не запускаємо запит, якщо поле порожнє або складається лише з пробілів
  if (query.trim() === "") return;

  // Ховаємо кнопку "Завантажити ще" та робимо її недоступною
  buttonService.hide();
  buttonService.disable();

  // Показуємо лоадер
  loader.style.display = "block";

  fetchData(query)
    .then(data => {
      // Відмальовуємо картки
      renderCards(data);

      // Якщо є більше результатів, показуємо кнопку та робимо її доступною
      if (data.hasMoreResults) {
        buttonService.show();
        buttonService.enable();
      }
    })
    .catch(error => {
      console.error("Помилка під час запиту:", error);
      showErrorMessage("Сталася непередбачена помилка. Спробуйте ще раз пізніше.");
    })
    .finally(() => {
      // Ховаємо лоадер після завершення запиту
      loader.style.display = "none";
    });
}
