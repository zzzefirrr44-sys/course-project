(function () {
    'use strict';

    var mapElement = document.getElementById('map');
    if (!mapElement || typeof L === 'undefined') {
        return;
    }

    var location = [48.9201, 24.70997];
    var map = L.map(mapElement, {
        scrollWheelZoom: false,
        zoomControl: false
    }).setView(location, 16);

    map.attributionControl.setPrefix(false);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.control.zoom({
        zoomInTitle: 'Збільшити масштаб',
        zoomOutTitle: 'Зменшити масштаб'
    }).addTo(map);

    map.on('popupopen', function (event) {
        var closeButton = event.popup.getElement().querySelector('.leaflet-popup-close-button');
        if (closeButton) {
            closeButton.title = 'Закрити';
            closeButton.setAttribute('aria-label', 'Закрити');
        }
    });

    L.marker(location, {
        title: 'Wedding – вулиця Незалежності, 15',
        alt: 'Wedding на карті Івано-Франківська'
    }).addTo(map).bindPopup(
        '<strong>Wedding</strong><br>' +
        'вул. Незалежності, 15<br>Івано-Франківськ<br>' +
        '<a href="tel:+380508768976">+38 (050) 876 89 76</a>'
    );
}());
