import "../pages/second.css";
import "../vendor/normalize.css"
import data from '../utils/data'

// Создаём шаблон карточки
const createCard = (user) => {
  const template = document.createElement("tr");
  template.insertAdjacentHTML('beforeend', `
    <td class="user__name">${user.name.firstName}</td>
    <td class="user__name">${user.name.lastName}</td>
    <td class="user__about">${user.about}</td>
    <td style='background-color: ${user.eyeColor}'>${user.eyeColor}</td>
    `);
  return template;
}

// Получаем карточки
const getCards = () => {
  const usersSection = document.querySelector('.users');
  for(let i = 10; i <= 25; i++) {
    usersSection.appendChild(createCard(data[i]));
  }
}

getCards();

// Выполняем действия при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  const table = document.getElementById('sortable');
  const headers = table.querySelectorAll('th');
  const tableBody = table.querySelector('tbody');
  const rows = tableBody.querySelectorAll('tr');

  // Вид сортировки
  const directions = [];

  const sortColumn = function(index) {
    // Получаем текущий вид сортировки
    const direction = directions[index] || 'ascending';
    // Фактор по виду сортировки
    const multiplier = (direction === 'ascending') ? 1 : -1;
    // Получаем строки
    const newRows = Array.from(rows);
    // Сортируем строки
    newRows.sort(function(rowA, rowB) {
      const cellA = rowA.querySelectorAll('td')[index].innerHTML;
      const cellB = rowB.querySelectorAll('td')[index].innerHTML;

      switch (true) {
        case cellA > cellB: return 1 * multiplier;
        case cellA < cellB: return -1 * multiplier;
        case cellA === cellB: return 0;
      }
    });

    // Удаляем старые строки
    [].forEach.call(rows, function(row) {
      tableBody.removeChild(row);
    });

    // Меняем вид сортировки
    directions[index] = direction === 'ascending' ? 'descending' : 'ascending';

    // Добавить новую строку
    newRows.forEach(function(newRow) {
      tableBody.appendChild(newRow);
    });
  };

  // Добавляем лисенеры на заголовки
  [].forEach.call(headers, function(header, index) {
    header.addEventListener('click', function() {
      sortColumn(index);
    });
  });

  const form = document.querySelector('.edit-form');
  const editInput = document.querySelector('.edit-input');
  
  // Функция изменения поля строки
  const editor = (content) => {
    // Открываем форму редактирования
    form.style.display = 'flex';
    // По умолчанию добавляем в инпут значение из поля
    editInput.value = content.textContent;
    // Лисенер формы
    form.addEventListener('submit', function inputHandler(e) {
      e.preventDefault();
      // Изменияем значение поля на значение инпута 
      content.textContent = editInput.value;
      // Удаляем лисенер
      this.removeEventListener('submit', inputHandler);
      // Закрываем форму
      form.style.display = 'none';
    });
    
  }

  [].forEach.call(rows, function(row) {
    const td = row.querySelectorAll('td');
    [].forEach.call(td, function(content) {
      // Добавляем лисенеры на поля строк
      content.addEventListener('click', () => editor(content));
    });
  });

  const buttonsContainer = document.querySelector('.buttons');
  const buttons = buttonsContainer.querySelectorAll('button');

  [].forEach.call(buttons, function(button, index) {
    // Добавляем лисенеры на кнопки скрытия элементов
    button.addEventListener('click', () => {
      document.getElementById("sortable").classList.toggle(`hide${index + 1}`)
    });
  });

});
