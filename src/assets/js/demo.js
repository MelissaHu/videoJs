//获取canvas的尺寸并初始化canvas
function eventWindowLoaded() {
    getSize();
    canvasApp();
}

export const getSize = function() {
    var app = document.getElementById("app");
    var cvs = document.getElementById("myCanvas");
    var videos = document.getElementById("vjs_video_3");
    cvs.setAttribute("width", app.offsetWidth)
    cvs.setAttribute("height", app.offsetHeight)
}

//  检查canvas兼容性
function canvasSupport(e) {
    return !!e.getContext;
}

//包含整个Canvas应用程序
function canvasApp() {
    var myCanvas = document.getElementById('myCanvas');
    if (!canvasSupport(myCanvas)) {
        return;
    }
    var ctx = myCanvas.getContext('2d');
    var rect = {},
        drag = false;

    //监听鼠标事件
    myCanvas.addEventListener('mousedown', mouseDown, false);
    myCanvas.addEventListener('mouseup', mouseUp, false);
    myCanvas.addEventListener('mousemove', mouseMove, false);

    //监听mouseDown事件
    function mouseDown(e) {
        rect.startX = e.pageX - this.offsetLeft - 8;
        rect.startY = e.pageY - this.offsetTop - 8;
        drag = true;
    }

    //监听mouseUp事件
    function mouseUp(e) {
        rect.endX = e.pageX - this.offsetLeft - 8;
        rect.endY = e.pageY - this.offsetTop - 8;
        checkDirection();
        drag = false;
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    }

    //监听mouseMove事件
    function mouseMove(e) {
        if (drag) {
            rect.w = (e.pageX - this.offsetLeft) - rect.startX - 8;
            rect.h = (e.pageY - this.offsetTop) - rect.startY - 8;
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            drawRect("stroke");
        }
    }

    //fill是填充图，stroke是描边图
    function drawRect(style) {
        if (style === "fill") {
            ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
        }
        if (style === "stroke") {
            ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
        }
    }

    //canvas线条的设置
    function drawScreen() {
        ctx.lineWidth = 2;
        ctx.fillStyle = "#b22acb";
        ctx.strokeStyle = '#b22acb';
    }

    // 检查鼠标行为，点击或画矩形
    function checkDirection() {
        var point = {};
        var rectInfo = {
            x: rect.startX,
            y: rect.startY,
            w: rect.w,
            h: rect.h
        }
        var pointParams = {
            midpointx: rect.startX + (rect.w / 2),
            midPointy: rect.startY + (rect.startY / 2),
            lengthX: rect.w,
            lengthy: rect.h
        }
        if (rectInfo.w < 0 || rectInfo.h < 0) {
            console.log('这是缩小');
            //  turnZoomOut();
        } else if (rectInfo.x === rect.endX || rectInfo.y === rect.endY) {
            console.log('这是一个点');
            // turnReset();
        } else if (rectInfo.w > 0 || rectInfo.h > 0) {
            console.log('这是扩大')
            console.log(pointParams);
            dragzoomin(pointParams)
        }
    }
    drawScreen();
}