// !yamaps

ymaps.ready(function () {
   // Проверяем, существует ли элемент с id="map"
   const mapElement = document.getElementById('map');

   if (mapElement) { // Если элемент карты существует, выполняем код инициализации
      var map = new ymaps.Map("map", {
         center: [59.212492, 39.892326],
         zoom: 18,
         controls: [],
         behaviors: ['drag', 'multiTouch']
      });

      const mapAddress = document.querySelectorAll('.map__address');

      mapAddress.forEach(item => {
         const coordinatesString = item.dataset.coord;
         if (coordinatesString) {
            const coordinates = coordinatesString.split(',').map(Number);

            var myPlacemark = new ymaps.Placemark(coordinates, {}, {
               iconLayout: 'default#image',
               iconImageHref: 'img/logo-map.png',
               iconImageSize: [70, 70],
               iconImageOffset: [-35, -35]
            });

            map.geoObjects.add(myPlacemark);
         }
      });

      function moveToCoordinates(coords, zoomLevel = 18) {
         map.panTo(coords, {
            useMapMargin: true
         }).then(function () {
            map.setZoom(zoomLevel);
         });
      }

      mapAddress.forEach(item => {
         item.addEventListener('click', function () {
            var coordinates = item.dataset.coord.split(',').map(Number);
            moveToCoordinates(coordinates);
         });
      });

      const zoomInButton = document.querySelector('.zoom-in');
      const zoomOutButton = document.querySelector('.zoom-out');

      zoomInButton.addEventListener('click', function () {
         map.setZoom(map.getZoom() + 1, { duration: 200 });
      });

      zoomOutButton.addEventListener('click', function () {
         map.setZoom(map.getZoom() - 1, { duration: 200 });
      });
   }
});