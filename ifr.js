(function(){
    var popupStyle = {
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        border: "1px solid black",
        zIndex: 6448
    }
    var popup = document.createElement('div');
    var iframe = document.createElement('iframe')
    iframe.width="100%"
    iframe.height="100%"
    for(i in popupStyle){
        popup.style[i] = popupStyle[i];
    }
    var button = document.createElement('button')
    button.innerHTML = "关闭"
    button.onclick = function(){
        popup.parentNode.removeChild(popup)
    }
    popup.appendChild(button);
    popup.appendChild(iframe);
    document.body.appendChild(popup)
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    iframeDoc.documentElement.innerHTML = ""
    function wrong(x){
        iframeDoc.documentElement.innerHTML += '<hr><span style="background-color: lightpink">'+x+'</span>'
    }
    function right(x){
        iframeDoc.documentElement.innerHTML += '<hr><span style="background-color: palegreen">'+x+'</span>'
    }
    var obj = {};
    var a = document.createElement('a');
    a.href = "/"
    var loc = a.href
    var N = {
        'visibility-state':1,
        'paint':1,
        "first-input":1
    }
    performance.getEntries().forEach(function(e){
        if(!N[e.entryType] && !obj[e.name]){
            obj[e.name] = 1;
            if(e.name.slice(0,loc.length)!=loc){
                wrong("未知资源："+e.name);
            }else{
                right(e.name)
            }
        }
    })
})();