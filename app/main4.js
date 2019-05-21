import './fonts/iconfont.css';
import './css/htmleaf-demo.css';
import './css/nav.css';
import './css/ol.css';//css文件的引用
import './css/info.css';
import './css/cssCharts.css';
import './css/font-awesome.css';
import './css/fonts_goole.css';
import './js/bootstrap.min.js';

import './commTool/menu.js';
import './js/FileSaver.min.js';

import st from './Greeter.js';
import inital from './commTool/showMap';
import TDLayer from './util/addTDLayer';
import Pop from './util/myPop1';
import {fromLonLat} from 'ol/proj';
import getFeature from './util/getFeature';
import addWMS from './util/showWMS';
import getGeojson from './util/getGeojson';
import createElement from './util/layerControl';
import addWFS from './util/addWFS';
import jsonFile from './util/jsonFile'
import addGeojson from './util/sea_level'

inital.showMap();
$("#AddAnno").click(function(){TDLayer.addTDLayer(inital.getMap(), 1)});
$("#AddRoad").click(function(){TDLayer.addTDLayer(inital.getMap(), 2)});
$("#AddRS").click(function(){TDLayer.addTDLayer(inital.getMap(), 3)});
$("#ShowCoord").click(function(){Pop.myPop(inital.getMap())});
$("#getFeature").click(function(){getFeature.getFreature(inital.getMap())});
$("#getGeojson").click(function(){addWMS.addWMS(inital.getMap())});
$("#Geojsonlayer").click(function(){getGeojson.Geojson(inital.getMap())});
$("#createPa").click(function(){createElement.createParam('dj')});
$("#addWFS").click(function () { addWFS.testMap(inital.getMap()) });
$("#jsonfile").click(function () { jsonFile.getJson(inital.getMap()) });
$("#sea_level").click(function () { addGeojson.addGeojson(inital.getMap()) });

$("#showLayers").click(function(){
    var layers = inital.getMap().getLayers();
    var array = layers.getArray();
    console.log(array);
    for(var i=0;i<layers.getLength();i++){
        var value = array[i].getProperties("values_");
        if(value.title!=null){
            console.log(value.title);
        }else{
            var param = value.source.params_;
            if(param!=null)
            {
                var obj = eval(param);  
                console.log(obj.LAYERS);
            }
        }             
        
    }
})
