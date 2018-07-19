function createParam(str) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    var span = document.createElement("span");
    var input = document.createElement("input");
    input.type="checkbox";
    var node=document.createTextNode(str);
    span.appendChild(input);
    span.appendChild(node);    
    a.appendChild(span);
    li.appendChild(a);
    var element=document.getElementById("layerContr");
    element.appendChild(li);
}

export default {
    createParam
}