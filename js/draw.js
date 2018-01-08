function drawLine(ctx, data1, data2) {
    ctx.beginPath();
    ctx.moveTo(data1.x, data1.y);
    if( typeof(data2) == "undefined" )
    {
        data2 = new Object() ;
        data2.x =  data1.x ; 
        data2.y =  data1.y ;
    }
    ctx.lineTo(data2.x, data2.y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666666";
    ctx.stroke();
}

let canv = document.getElementById('board');
let ctx = canv.getContext('2d');
let canvDemo = document.getElementById('boardDemo');
let ctxDemo = canvDemo.getContext('2d'); 
