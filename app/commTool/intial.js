const ol = require('../js/ol.js');
// import ol from 'ol';

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([117, 36]),
        zoom: 4,
        maxZoom: 18  
    })
});

$("#type").prop("disabled", true);

//设置当鼠标移动到按钮上时显示提示
$('.ol-zoom-in, .ol-zoom-out').tooltip({
    placement: 'right'
  });
$('.ol-rotate-reset, .ol-attribution button[title]').tooltip({
    placement: 'left'
});

module.exports=function(){
    return map;
}