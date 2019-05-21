import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import {Vector as VectorLayer} from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Stroke from 'ol/style/Stroke'

/**
 * 
 * @param {通过json格式的数据，绘制在地图上，并设置样式。点图层与线图层} map 
 */

function getJson (map) {
    var pointSource = new VectorSource()
    var lineSource = new VectorSource()
    var midpointSource = new VectorSource()

    var pointLayer = new VectorLayer({
        source: pointSource,
        style: new Style({
            image: new Icon(({
              src: './images/pink.png',
              anchor: [0.5, 0.95]
            }))
          })
    });

    var midpointLayer = new VectorLayer({
        source: midpointSource    
    })

    var lineLayer = new VectorLayer({
        source: lineSource,
        style: new Style({
            stroke: new Stroke({
                width: 5,
                color: [238, 180, 34, 1]
            })
        })
    })

    var features = ParseData()
    for (var i = 0 ;i < features.length; i++) {
        var point = new Feature({
            geometry:new Point(features[i])
        })
        pointSource.addFeature(point)   

        if (i<features.length-1){
            var line = new Feature({
                geometry: new LineString([features[i], features[i+1]])
            })
            lineSource.addFeature(line)

            var midpoint = new Feature({
                geometry: new Point([(features[i][0] + features[i+1][0])/2, (features[i][1] + features[i+1][1])/2])
            })

            midpintStyle(features[i+1], features[i], midpoint)
            midpointSource.addFeature(midpoint)
        }     
    }
            
    map.addLayer(lineLayer)
    map.addLayer(pointLayer)
    map.addLayer(midpointLayer)
    map.getView().fit(pointSource.getExtent())      // 以source的范围显示
}

/**
 * 解析data，返回经纬度数组
 */
function ParseData () {
    var data =
    '{"features":' + 
    '[{"attributes":{"OBJECTID":1,"时间":"2019.5.11  5:11","经度":23.096343990000001,"纬度":114.5555954,"time_":1557551460000,"time_v":1},"geometry":{"x":114.55559540000002,"y":23.096343990000037}}, ' + 
    '{"attributes":{"OBJECTID":2,"时间":"2019.5.11  5:44","经度":23.17662048,"纬度":114.6628723,"time_":1557553440000,"time_v":2},"geometry":{"x":114.66287230000012,"y":23.176620480000054}},'  + 
    '{"attributes":{"OBJECTID":3,"时间":"2019.5.11  11:08","经度":22.3530941,"纬度":115.2279053,"time_":1557572880000,"time_v":3},"geometry":{"x":115.22790530000009,"y":22.353094100000078}}, ' + 
    '{"attributes":{"OBJECTID":4,"时间":"2019.5.11  12:08","经度":22.205648419999999,"纬度":115.1594391,"time_":1557576480000,"time_v":4},"geometry":{"x":115.1594391000001,"y":22.205648420000045}},' + 
    '{"attributes":{"OBJECTID":5,"时间":"2019.5.11  13:01","经度":21.997920990000001,"纬度":115.1751099,"time_":1557579660000,"time_v":5},"geometry":{"x":115.17510990000005,"y":21.997920990000068}}, ' + 
    '{"attributes":{"OBJECTID":6,"时间":"2019.5.13  9:55","经度":23.75743675,"纬度":114.9444122,"time_":1557741300000,"time_v":6},"geometry":{"x":114.9444122000001,"y":23.757436750000068}}, ' + 
    '{"attributes":{"OBJECTID":7,"时间":"2019.5.13  10:55","经度":23.600749969999999,"纬度":114.88321689999999,"time_":1557744900000,"time_v":7},"geometry":{"x":114.88321690000009,"y":23.600749970000038}}, '  +
    '{"attributes":{"OBJECTID":8,"时间":"2019.5.13  11:55","经度":23.444730759999999,"纬度":114.78758999999999,"time_":1557748500000,"time_v":8},"geometry":{"x":114.78759000000002,"y":23.444730760000027}}]}'
    var obj = JSON.parse(data); //由JSON字符串转换为JSON对象 //由JSON字符串转换为JSON对象
    var features = obj.features
    var points = []
    for (var i = 0; i < features.length; i++) {
        var geometry = features[i].geometry
        var point = [geometry.x, geometry.y]
        points.push(point)
    }
    return points
}

/**
 * 
 * @param {通过起始、终结点，计算旋转角度，将图片设为中点的样式} end 
 * @param {*} start 
 * @param {*} midpoint 
 */
function midpintStyle (end, start, midpoint) {
    var dx = end[0] - start[0];
    var dy = end[1] - start[1];
    var rotation = Math.atan2(dy, dx);
    var style = new Style({
        image: new Icon({
            src: './images/arrow_32.png',
            anchor: [0.5, 0.3],
            rotateWithView: true,
            rotation: 90- 0.5 - rotation
          })
    })
    midpoint.setStyle(style)    
}

export default {
    getJson
}