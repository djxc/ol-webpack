const ol = require('../js/ol.js');
// import jquery from 'jquery';
// import $ from 'jquery';
const $=require('jquery');
var isFrist=0;
var draw;
var isStart=false;
//创建空白的矢量图层，用来存储用户编辑的元素
var source = new ol.source.Vector({ wrapX: false });
var vector = new ol.layer.Vector({
    source: source
});

var typeSelect = document.querySelector("#type");


module.exports = function (map) {
    
    //定义map的交互动作，这里为draw类型
    var addInteraction=function() {
        var value = typeSelect.value;
        if (value !== 'None') {
            draw = new ol.interaction.Draw({
                source: source,
                type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
            });
            map.addInteraction(draw);
        }
    }
    /**
     * Handle change event.
     */
    typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
    };
    
    var stopDraw=function(){
        map.removeInteraction(draw);
    }
    
    var mydraw=function(){
        if(isFrist==0){
            map.addLayer(vector);
            isFrist=1;
        }

        if(isStart){
            isStart=false;
            stopDraw();
            $("#type").prop("disabled", true);
            $("#myDraw").text('开始编辑');
        }else{
            isStart=true;
            addInteraction();
            $("#type").prop("disabled", false);
            $("#myDraw").text("停止编辑");
        }
       
    }
    return mydraw;
};
