import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import { defaults as defaultControls, ScaleLine } from 'ol/control.js';
import createElement from '../util/layerControl';

//比例尺
var scaleLineControl = new ScaleLine();
scaleLineControl.setUnits("metric");

var map;

function showMap() {
    var layers = [
        new Tile({
            source: new OSM()
        }),
        new Tile({
            extent: [-124.73142200000001, 24.955967, -66.969849, 49.371735],
            source: new TileWMS({
                url: 'http://localhost:8081/geoserver/wms',
                params: { 'LAYERS': 'topp:states', 'TILED': true, 'VERSION': "1.1.0" },
                serverType: 'geoserver',
                // Countries have transparency, so do not fade tiles:
                transition: 0
            })
        }),
        new Tile({
            extent: [-74.02722, 40.684221, -73.907005, 40.878178],
            source: new TileWMS({
                url: 'http://localhost:8081/geoserver/wms',
                params: { 'LAYERS': 'road_wms:tiger_roads', 'TILED': true, 'VERSION': "1.1.0" },
                serverType: 'geoserver',
                // Countries have transparency, so do not fade tiles:
                transition: 0
            })
        })
    ];
    map = new Map({
        controls: defaultControls({
            attributionOptions: {
                collapsible: false
            }
        }).extend([
            scaleLineControl
        ]),
        target: 'map',
        layers: layers,
        view: new View({
            projection: 'EPSG:4326',
            center: [120, 30],//[-13553864, 5918250],
            zoom: 6,
            maxZoom: 18,
            minZoom: 3.8
        })
    });
    changelayersControl();
}

var changelayersControl = function () {
    var array = map.getLayers().getArray();

    for(var i=0;i<array.length;i++){
        var value = array[i].getProperties("values_");
        if(value.title!=null){
            console.log(value.title);
            createElement.createParam(value.title);
        }else{
            var param = value.source.params_;
            if(param!=null)
            {
                var obj = eval(param);  
                console.log(obj.LAYERS);
                createElement.createParam(obj.LAYERS);
            }
        }             
        
    }
    
}

function getMap() {
    return map;
}
export default {
    showMap,
    getMap
};