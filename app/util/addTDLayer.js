import XYZ from 'ol/source/XYZ'
import Tile from 'ol/layer/Tile';
import createElement from './layerControl';


var tian_di_tu_road_layer = new Tile({
    title: "天地图路网",
    source: new XYZ({
        url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
    })
});

var tian_di_tu_satellite_layer = new Tile({
    title: "天地图卫星影像",
    source: new XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
    })
});

var tian_di_tu_annotation = new Tile({
    title: "天地图文字标注",
    source: new XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
    })
});

var changelayersControl = function (map) {
    var array = map.getLayers().getArray();

    var value = array[array.length - 1].getProperties("values_");
    if (value.title != null) {
        console.log(value.title);
        createElement.createParam(value.title);
    } else {
        var param = value.source.params_;
        if (param != null) {
            var obj = eval(param);
            console.log(obj.LAYERS);
            createElement.createParam(obj.LAYERS);
        }
    }
};

function addTDLayer(map, num) {
    switch (num) {
        case 1:
            if ($("#isAddAnno").is(':checked')) {
                map.addLayer(tian_di_tu_annotation);
                changelayersControl(map);
            } else {
                map.removeLayer(tian_di_tu_annotation);
            }
            break;

        case 2:
            if ($("#isAddRoad").is(':checked')) {
                map.addLayer(tian_di_tu_road_layer);
                changelayersControl(map);
            } else {
                map.removeLayer(tian_di_tu_road_layer);
            }
            break;

        case 3:
            if ($("#isAddRS").is(':checked')) {
                map.addLayer(tian_di_tu_satellite_layer);
                changelayersControl(map);
            } else {
                map.removeLayer(tian_di_tu_satellite_layer);
            }
            break;
    }

}

export default {
    addTDLayer
};
