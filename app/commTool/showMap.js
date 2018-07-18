import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

var map;

function showMap() {

    var layers = [
        new Tile({
          source: new OSM()
        }),
        new Tile({
          extent: [-124.73142200000001,24.955967,-66.969849,49.371735],
          source: new TileWMS({
            url: 'http://localhost:8081/geoserver/wms',
            params: {'LAYERS': 'topp:states', 'TILED': true, 'VERSION':"1.1.0"},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0
          })
        }),
        new Tile({
            extent: [-74.02722,40.684221,-73.907005,40.878178],
            source: new TileWMS({
              url: 'http://localhost:8081/geoserver/wms',
              params: {'LAYERS': 'road_wms:tiger_roads', 'TILED': true, 'VERSION':"1.1.0"},
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0
            })
          })
      ];

    map = new Map({
        target: 'map',
        layers:layers,
        view: new View({
            projection: 'EPSG:4326',
            center: [-100, 30],//[-13553864, 5918250],
            zoom: 6,
            maxZoom: 18,
            minZoom: 3.8
        })
    });
}
function getMap(){
    return map;
}
export default {
    showMap,
    getMap
};