document.addEventListener('DOMContentLoaded', function () { // Ждем полной загрузки DOM
   const calculateButton = document.getElementById('result-button');
   const spendingSpan = document.getElementById('spending');
   const profitSpan = document.getElementById('profit');
   const termSpan = document.getElementById('term');
   const calculationForm = document.querySelector('.calculation-model');
   const resultPricesBlock = document.querySelector('.model__prices');
   const preloadBlock = document.querySelector('.model__preload');
   const countPcSpan = document.getElementById('count-pc'); // span для кол-ва ПК


   function getFormValues() {
      const countPC = parseInt(calculationForm.querySelector('.calculation-model__range').value, 10);
      const kitchen = calculationForm.querySelector('input[name="kitchen"]:checked').value;
      const help = calculationForm.querySelector('input[name="help"]:checked').value;
      const peoples = calculationForm.querySelector('input[name="peoples"]:checked').value;

      return {
         countPC,
         kitchen,
         help,
         peoples
      };
   }

   function calculateValues(formValues) {
      const countPC = formValues['countPC'];
      const peoples = formValues['peoples'];
      const help = formValues['help'] === 'yes'; // Преобразуем в boolean для удобства
      const kitchen = formValues['kitchen'] === 'yes'; // Преобразуем в boolean для удобства

      // Фиксированные значения
      const fixValuesInitial = 500000 + (countPC * 20000) + 150000 + 200000 + 400000 + 80000 + 40000 + 800000;
      const fixValuesMonthly = 50000 + (countPC * 1400);

      let area;
      let spending;
      let revenue;
      let profit;
      let term;

      // Расчет площади в зависимости от наличия кухни
      area = kitchen ? (70 + 7 * countPC) : (7 * countPC);

      // Расчет выручки в зависимости от количества людей
      let revenuePerPC;
      if (peoples === '300') {
         revenuePerPC = 60000;
         pricePC = 250000;
      } else if (peoples === '300-800') {
         revenuePerPC = 80000;
         pricePC = 265000;
      } else if (peoples === '800') {
         revenuePerPC = 100000;
         pricePC = 280000;
      }

      spending = (countPC * pricePC) + (area * 16000) + (area * 10000) + (kitchen ? 800000 : 0) + fixValuesInitial;

      revenue = countPC * revenuePerPC;

      // Расчет переменных расходов
      let areaCosts, taxRate, marketingRate, supportCosts, otherCosts;

      if (peoples === '300') {
         areaCosts = area * 800;
      } else if (peoples === '300-800') {
         areaCosts = area * 1100;
      } else { // peoples === '800'
         areaCosts = area * 1500;
      }

      taxRate = 0.03;
      marketingRate = 0.03;
      supportCosts = 105 * 2000 + (revenue / 60) * 0.04 + (kitchen ? 160000 : 8 * 8000); // Условие для кухни
      otherCosts = (revenue * 0.01) + (kitchen ? revenue * 0.1 : revenue * 0.2) + (revenue / 60) + (help ? revenue * 0.12 : revenue * 0.06) + ((revenue / 60) / 5); // Условие для помощи
      marketingRate = help ? 0.12 : 0.06; // Изменяем marketingRate в зависимости от help

      // Расчет прибыли
      profit = Math.floor(revenue - (areaCosts + (revenue * taxRate) + (revenue * marketingRate) + supportCosts + otherCosts + fixValuesMonthly));

      // Расчет срока окупаемости с округлением в большую сторону
      term = Math.ceil(spending / profit);

      return {
         spending,
         profit,
         term
      };
   }

   // Обработчик клика на кнопку "Рассчитать"
   calculateButton.addEventListener('click', function (event) {
      event.preventDefault(); // Предотвращаем стандартное действие ссылки (переход по URL)

      const formValues = getFormValues(); // Получаем значения из формы
      const results = calculateValues(formValues); // Выполняем расчет

      // Обновляем значения в span элементах
      spendingSpan.textContent = results.spending.toLocaleString(); // Форматируем число для красоты
      profitSpan.textContent = results.profit.toLocaleString();     // Форматируем число для красоты
      termSpan.textContent = results.term;

      // Показываем блок с результатами и скрываем прелоадер
      resultPricesBlock.classList.remove('_hidden');
      preloadBlock.classList.add('_hidden');
   });

   // Обновление значения span при изменении ползунка (как в предыдущем примере)
   const rangeInput = calculationForm.querySelector('.calculation-model__range');
   rangeInput.addEventListener('input', function () {
      countPcSpan.textContent = this.value;
   });
});