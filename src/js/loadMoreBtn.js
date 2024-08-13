export default class ButtonService {
  constructor(buttonEL, hiddenClass) {
    this.buttonEL = buttonEL;
    this.hiddenClass = hiddenClass;
  }

  hide() {
    this.buttonEL.classList.add(this.hiddenClass);
  }

  show() {
    this.buttonEL.classList.remove(this.hiddenClass);
  }

  disable() {
    this.buttonEL.disabled = true;
  }

  enable() {
    this.buttonEL.disabled = false;
  }
}

// Приклад використання
const loadMoreButton = document.querySelector('.load-more-btn');
const buttonService = new ButtonService(loadMoreButton, 'hidden'); // 'hidden' - це клас, який приховує кнопку

function performSearch(query) {
  if (query.trim() === "") return; // Не запускаємо запит, якщо поле порожнє

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
