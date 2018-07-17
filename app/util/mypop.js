const ol = require('../js/ol.js');

/**
      * Elements that make up the popup.
      */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var ispop = false;

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));

module.exports = function (map) {
    var myPop = function () {
        if (ispop) {
            map.removeOverlay(overlay);
            ispop=false;
        } else {
            map.addOverlay(overlay);
            Pop();
            ispop=true;
        }
    }
    var Pop = function () {
        map.on('singleclick', function (evt) {
            var coordinate = evt.coordinate;
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
                coordinate, 'EPSG:3857', 'EPSG:4326'));

            content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
                '</code>';
            overlay.setPosition(coordinate);
        });

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
    }
    return myPop;
}