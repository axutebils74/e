
var d1 = document.getElementById('content');
var d2 = document.getElementById('diff');
var html =  document.documentElement.innerHTML,rightHTML = '<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>检查HTML</title>\n    \x3Cscript src="diff.min.js">\x3C/script>\n</head>\n<body>\n    <div id="content"></div>\n    <div id="diff" style="word-wrap: break-word;white-space:pre-wrap"></div>\n    \x3Cscript src="check.js">\x3C/script>\n\n</body>';
function right(x){
    d1.innerHTML += '<hr><span style="background-color: palegreen">'+x+'</span>'
}
function wrong(x){
    d1.innerHTML += '<hr><span style="background-color: lightpink">'+x+'</span>'
}
function checkHTML(){
    if(html.replace(/\s/g,"") == rightHTML.replace(/\s/g,"")){
            right("index.html未被篡改")
    }else{
            wrong("index.html被篡改")
    }
}
checkHTML();
var obj = {}
obj[location.href] = 1;
obj[location.origin + "/diff.min.js"] = 1;
obj[location.origin + "/check.js"] = 1;
obj[location.origin + "/favicon.ico"] = 1;
var N = {
    'visibility-state':1,
    paint:1,
    "first-input":1
}
function checkPerformanceEntries() {
    performance.getEntries().forEach(function(e){
        if(!N[e.entryType] && !obj[e.name]){
            obj[e.name] = 1;
            wrong("未知资源："+e.name + "          "+e.entryType);
        }
    })
}
setInterval(checkPerformanceEntries, 1000);
var htmlC = document.createElement('html');
var tmp;
function compareSource(){
    //var a = new MutationObserver((a)=>)
    htmlC.innerHTML = document.documentElement.innerHTML;
    htmlC.querySelector('#content').innerHTML=''
    htmlC.querySelector('#diff').innerHTML=''
    if(tmp==htmlC.innerHTML){
        return setTimeout(compareSource,1800);
    }else{
        tmp=htmlC.innerHTML
    }
    d2.innerHTML = "";
    diff = Diff.diffChars(htmlC.innerHTML, rightHTML);
    display = d2,
    fragment = document.createDocumentFragment();
    diff.forEach(function (part) {
        var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
        span = document.createElement('span');
        span.style.color = color;
        span.appendChild(document.createTextNode(part.value));
        fragment.appendChild(span);
    });
    display.appendChild(fragment);
    c = htmlC.innerHTML.length;
    if(c < 20000){setTimeout(compareSource,c<1000?1500:c<3000?3000:c<6000?6500:10000)}
}
compareSource();


