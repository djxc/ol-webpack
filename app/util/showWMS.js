import Feature from 'ol/Feature.js';
import { defaults as defaultControls } from 'ol/control.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Circle from 'ol/geom/Circle.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';



var image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 1 })
});

var styles = {
    'Point': new Style({
        image: image
    }),
    'LineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiLineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiPoint': new Style({
        image: image
    }),
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new Style({
        stroke: new Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new Fill({
            color: 'magenta'
        }),
        image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new Style({
        stroke: new Stroke({
            color: 'red',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })
};

var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};

var geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:4326'
        }
    },
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [0, 0]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': [[46, -26], [86, 26]]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': [[46, 26], [86, -26]]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [[[-56, -16], [-46, 16], [-36, -16]]]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'MultiLineString',
            'coordinates': [
                [[-16, -7.55], [-16, 7.55]],
                [[16, -7.55], [1e6, 7.55]],
                [[-7.55, -16], [7.55, -16]],
                [[-7.55, 16], [7.55, 16]]
            ]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'MultiPolygon',
            'coordinates': [
                [[[-56, 66], [-56, 86], [-36, 86], [-36, 66]]],
                [[[-26, 66], [-26, 86], [0, 86], [0, 66]]],
                [[[16, 66], [16, 86], [36, 86], [36, 66]]]
            ]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'GeometryCollection',
            'geometries': [{
                'type': 'LineString',
                'coordinates': [[-56, -56], [0, -56]]
            }, {
                'type': 'Point',
                'coordinates': [46, -56]
            }, {
                'type': 'Polygon',
                'coordinates': [[[16, -66], [26, -46], [36, -66]]]
            }]
        }
    }]
};

var vectorSource = new VectorSource({
    features: (new GeoJSON()).readFeatures(geojsonObject)
});

vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

var vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
});

var dj = "xc love dj";
function addWMS(map) {
    console.log(typeof (map));
    console.log(map.getSize());
    map.addLayer(vectorLayer);
    alert(dj);
}


export default {
    addWMS
}

