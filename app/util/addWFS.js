import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Fill, Stroke, Style, Text } from 'ol/style.js';
import { createXYZ } from 'ol/tilegrid.js';
import { tile } from 'ol/loadingstrategy.js';
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'

function addWFS1(map) {
    //======================================方法一
    var wfsVectorLayer = new VectorLayer({
        source: new VectorSource({
            format: new GeoJSON({
                geometryName: 'the_geom'
            }),
            url: 'http://localhost:8081/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp:states&maxFeatures=50&outputFormat=application/json'
            //'http://localhost:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=tiger:tiger_roads&outputFormat=application/json&srsname=EPSG:4326'
        }),//http://localhost:8081/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp:states&maxFeatures=50&outputFormat=application/json
        style: function (feature, resolution) {
            return new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 5
                })
            });
        }
    });
    map.addLayer(wfsVectorLayer);

}

function addWFS(map) {
    //======================================方法二
    //参数字段  
    var wfsParams = {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        typeName: 'topp:states',  //图层名称     
        outputFormat: 'text/javascript',  //重点，不要改变  
        format_options: 'callback:loadFeatures'  //回调函数声明  
    };

    //使用jsonp，可以解决跨域的问题，GeoServer中的web.xml文件关于jsonp的注释要去掉，就可以支持跨域了
    var vectorSource = new VectorSource({
        format: new GeoJSON(),
        loader: function (extent, resolution, projection) {  //加载函数  
            var url = 'http://localhost:8080/geoserver/wfs';
            $.ajax({
                url: url,
                data: $.param(wfsParams),   //传参  
                type: 'GET',
                dataType: 'jsonp',   //解决跨域的关键  
                jsonpCallback: 'loadFeatures'  //回调  

            });
        },
        strategy: tile(new createXYZ({
            maxZoom: 18
        })),
        projection: 'EPSG:4326'
    });
    //回调函数使用  
    window.loadFeatures = function (response) {
        //vectorSource.addFeatures((new ol.format.GeoJSON()).readFeatures(response));  //载入要素  
        //坐标转换，将返回的数据的坐标转换到当前使用地图的坐标系，否则，无法正常显示
        vectorSource.addFeatures((new GeoJSON()).readFeatures(response, {
            dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
            featureProjection: 'EPSG:4326' // 设定当前地图使用的feature的坐标系
        }));  //载入要素  

    };
    var vectorLayer = new VectorLayer({
        source: vectorSource
    });    
    map.addLayer(vectorLayer);
}

function testMap (map) {

    var geoserver_wms = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:8080/geoserver/webgis/wms',
            params: {
                'LAYERS': ['webgis:line', 'webgis:xy_point'], //此处可以是单个图层名称，也可以是图层组名称，或多个图层名称   
                'TILED': false
            },
            serverType: 'geoserver' //服务器类型  
        })
    });
    map.addLayer(geoserver_wms);
}

export default {
    addWFS,
    testMap
}