
import '../js/FileSaver.min.js';
// const saveAs = require('../js/FileSaver.min.js');
module.exports=function(map){
   var exportMap= function() {
        map.once('postcompose', function(event) {
          var canvas = event.context.canvas;
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
          } else {
            canvas.toBlob(function(blob) {
              saveAs(blob, 'map.png');
            });
          }
        });
        map.renderSync();
      }
    return exportMap;
}