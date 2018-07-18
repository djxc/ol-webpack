import Overlay from 'ol/Overlay';
import {toStringHDMS} from 'ol/coordinate';
import {transform} from 'ol/proj';

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
var overlay = new Overlay(/** @type {olx.OverlayOptions} */({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));

var Pop = function (map) {
    map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate;
        // var hdms = toStringHDMS(transform(
        //     coordinate, 'EPSG:3857', 'EPSG:4326'));
        var hdms = toStringHDMS(coordinate);

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

function myPop(map) {
    if (ispop) {
        map.removeOverlay(overlay);
        ispop=false;
    } else {
        map.addOverlay(overlay);
        Pop(map);
        ispop=true;
    }
}


export default {
    myPop
}