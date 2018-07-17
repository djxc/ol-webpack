const ol=require('../js/ol.js');


 var tian_di_tu_road_layer = new ol.layer.Tile({
     title: "天地图路网",
     source: new ol.source.XYZ({
         url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
     })
 });
 
 var tian_di_tu_satellite_layer = new ol.layer.Tile({
     title: "天地图卫星影像",
     source: new ol.source.XYZ({
         url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
     })
 });
 
 var tian_di_tu_annotation = new ol.layer.Tile({
     title: "天地图文字标注",
     source: new ol.source.XYZ({
         url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
     })
 });

 
module.exports = function(map,num) {

    var addMapLayer=function(){
        switch(num){
            case 1: 
                if($("#isAddAnno").is(':checked')){
                    map.addLayer(tian_di_tu_annotation);
                   
                }else{
                    map.removeLayer(tian_di_tu_annotation);
                }
                break;
            
            case 2:
                if($("#isAddRoad").is(':checked')){
                    map.addLayer(tian_di_tu_road_layer);
                
                }else{
                    map.removeLayer(tian_di_tu_road_layer);
                }    
                break;

            case 3:
                if($("#isAddRS").is(':checked')){
                    map.addLayer(tian_di_tu_satellite_layer);
                
                }else{
                    map.removeLayer(tian_di_tu_satellite_layer);
                }    
                break;
        }
       
    }
    return addMapLayer;
  };

