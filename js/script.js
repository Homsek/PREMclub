// !Появление фиксированной шапки при скролле

function isBlockTopAtViewportTop_getBoundingClientRect(blockId) {
   const block = document.getElementById(blockId);
   if (!block) {
      return false;
   }

   const rect = block.getBoundingClientRect();

   return rect.top <= 0;
}

window.addEventListener('scroll', function () {
   if (isBlockTopAtViewportTop_getBoundingClientRect('fixed-header')) {
      document.querySelector('.header-fixed').classList.add('_active');
   } else {
      document.querySelector('.header-fixed').classList.remove('_active');
   }
});

// !меню-бургер

const iconMenus = document.querySelectorAll('.header__menu-burger, .header-fixed__menu-burger');
const body = document.body;
const links = document.querySelectorAll('.header-fixed__link, .header__link');

iconMenus.forEach(iconMenu => {
   iconMenu.addEventListener('click', function () {
      // Находим родительский элемент, который содержит иконку и список меню
      // (предположим, что это ближайший общий родитель, например, <header> или <div class="header-container">)
      const parentHeader = iconMenu.closest('.header, .header-fixed'); // Уточните селектор родителя, если нужно

      if (!parentHeader) {
         console.error("Родительский элемент header не найден для иконки меню");
         return; // Выходим, если не нашли родителя
      }

      // Находим список меню ВНУТРИ этого родительского элемента
      const menuBody = parentHeader.querySelector('.header__list, .header-fixed__list');

      if (!menuBody) {
         console.error("Список меню не найден внутри родительского элемента");
         return; // Выходим, если не нашли список
      }

      // Переключаем класс _active только для текущей иконки и соответствующего списка меню
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
      body.classList.toggle('_lock'); // Блокировка body остается глобальной, если нужно

      // Закрываем другие активные меню (если нужно, чтобы только одно меню было открыто за раз)
      iconMenus.forEach(otherIconMenu => {
         if (otherIconMenu !== iconMenu) { // Проверяем, что это не текущая иконка
            otherIconMenu.classList.remove('_active');
         }
      });
   });
});

links.forEach(link => {
   link.addEventListener('click', function () {
      iconMenus.forEach(iconMenu => iconMenu.classList.remove('_active'));
      menuBodies.forEach(menuBody => menuBody.classList.remove('_active'));
      body.classList.remove('_lock');
   });
});

// !плавный скролл до блока

function scrollTop() {
   window.scrollTo({
      top: 0,
      behavior: "smooth"
   });
};

const scrollLinks = document.querySelectorAll('.scroll[data-goto], a[href^="#"]'); // Выбираем элементы .scroll с data-goto и ссылки с href="#"

if (scrollLinks.length > 0) {
   scrollLinks.forEach(link => { // Переименовали переменную для большей ясности
      link.addEventListener("click", onSmoothScrollClick); // Переименовали функцию обработчика
   });

   function onSmoothScrollClick(e) { // Переименовали функцию обработчика
      e.preventDefault(); // Предотвращаем стандартное поведение ссылки

      const link = e.currentTarget; // Переименовали переменную для большей ясности
      let targetSelector;

      if (link.classList.contains('scroll') && link.dataset.goto) {
         targetSelector = link.dataset.goto;
      } else if (link.tagName === 'A' && link.getAttribute('href').startsWith('#')) {
         targetSelector = link.getAttribute('href');
      }

      if (targetSelector) {
         const targetElement = document.querySelector(targetSelector);

         if (targetElement) {
            const header = document.querySelector('.header-fixed');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
               top: targetOffset,
               behavior: "smooth"
            });
         } else {
            console.error(`Element with selector "${targetSelector}" not found.`); // Сообщение об ошибке, если элемент не найден
         }
      }
   }
}

// !слайдер новости
const news = document.querySelector('.news__swiper');

if (news) {
   const newsSwiper = new Swiper('.news__swiper', {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 4,
      spaceBetween: 40,
      autoplay: {
         delay: 4000,
         pauseOnMouseEnter: true,
      },
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },

      breakpoints: {
         320: {
            slidesPerView: 1,
         },
         480: {
            slidesPerView: 2,
         },
         768: {
            slidesPerView: 3,
         },
         1024: {
            slidesPerView: 4,
         }
      }
   });
}

// !слайдер галлерея
const gallery = document.querySelector('.swiper-gallery');

if (gallery && window.innerWidth <= 520) {
   const gallerySwiper = new Swiper('.swiper-gallery', {
      direction: 'horizontal',
      loop: false,
      autoplay: {
         delay: 2000,
      },
      slidesPerView: 1,
      spaceBetween: 40,
   });
}

// !убирание класса invisible у таблицы
const tableHead = document.querySelectorAll(".table-price__head");

if (window.innerWidth <= 1024) {
   tableHead.forEach(head => {
      if (head.classList.contains('_invisible')) {
         head.classList.remove('_invisible');
      }
   });
}

// !calculation

const countComputer = document.querySelector('.calculation-model__range');
const countValue = document.getElementById('count-pc');

if (countComputer) {
   countComputer.addEventListener('input', function () {
      countValue.textContent = this.value;
   });
}