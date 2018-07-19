import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Fill, Stroke, Style, Text } from 'ol/style.js';


var style = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
        color: '#319FD3',
        width: 1
    }),
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: '#000'
        }),
        stroke: new Stroke({
            color: '#fff',
            width: 3
        })
    })
});

var vectorLayer = new VectorLayer({
    source: new VectorSource({
        url: 'http://openlayers.org/en/latest/examples/data/geojson/countries.geojson',
        format: new GeoJSON()
    }),
    style: function (feature) {
        style.getText().setText(feature.get('name'));
        return style;
    }
});


var highlightStyle = new Style({
    stroke: new Stroke({
        color: '#f00',
        width: 1
    }),
    fill: new Fill({
        color: 'rgba(255,0,0,0.1)'
    }),
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: '#000'
        }),
        stroke: new Stroke({
            color: '#f00',
            width: 3
        })
    })
});
var info = document.getElementById('info');

function Geojson(map){
    $("#contryInfo").toggle();
    map.addLayer(vectorLayer);

    var featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: function (feature) {
            highlightStyle.getText().setText(feature.get('name'));
            return highlightStyle;
        }
    });
    
    var highlight;
    var displayFeatureInfo = function (pixel) {
    
        var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });
           
        if (feature) {
            info.value = feature.getId() + ': ' + feature.get('name');
        } else {
            info.value = '';
        }
    
        if (feature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (feature) {
                featureOverlay.getSource().addFeature(feature);
            }
            highlight = feature;
        }
    
    };
    map.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });
    
    map.on('click', function (evt) {
        displayFeatureInfo(evt.pixel);
    });
}
export default {
    Geojson
}

