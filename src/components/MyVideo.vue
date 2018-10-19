<template>
 <div id="video-wrapper"  ref="vdWrapper">
   <video id="my-video" class="video-js vjs-default-skin"  controls preload="auto" ref="videoWrapper">
    <source src="http://10.168.4.181:10001/hls/0100102001/0100102001_live.m3u8" type="application/x-mpegURL">
    <source src="rtmp://10.168.4.181:10935/hls/0100102001.stream" type="rtmp/flv">
   </video>
    <canvas id="myCanvas" 
    ref="canvasWrapper"
    @mousedown="canvasDown($event)"
    @mousemove="canvasMove($event)"
    @mouseup="canvasUp($event)"
    ></canvas>
    <span class="Dot1"></span><span class="ctDot"></span>
 </div>
</template>
<script>
import videojs from "video.js";
import "videojs-contrib-hls";
import "../assets/js/demo.js";
import api from "../api/index.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      drag: false,
      vdSize: {
        w: "",
        h: ""
      },
      point: {
        startX: "",
        startY: "",
        endX: "",
        endY: "",
        w: "",
        h: ""
      }
    };
  },
  mounted() {
    videojs(
      "my-video",
      {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true
      },
      function() {
        this.play();
      }
    );
    console.log("getSize之前", this.vdSize.h);
    this.getSize();
    console.log("getSize之后", this.vdSize.h);
  },
  watch: {
    vdSize(oldValue, nowValue) {
      console.log(oldValue, nowValue);
    }
  },
  methods: {
    getSize() {
      this.vdSize = {
        w: this.$refs.vdWrapper.offsetWidth,
        h: this.$refs.vdWrapper.offsetHeight
      };
      this.$refs.canvasWrapper.setAttribute("width", this.vdSize.w);
      this.$refs.canvasWrapper.setAttribute("height", this.vdSize.h);
    },
    canvasDown(e) {
      this.getSize();
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      this.point.startX = e.pageX - this.$refs.canvasWrapper.offsetLeft;
      this.point.startY = e.pageY - this.$refs.canvasWrapper.offsetTop;
      this.drag = true;
    },
    canvasMove(e) {
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      if (this.drag) {
        this.point.w =
          e.pageX - this.$refs.canvasWrapper.offsetLeft - this.point.startX;
        this.point.h =
          e.pageY - this.$refs.canvasWrapper.offsetTop - this.point.startY;
        ctx.clearRect(
          0,
          0,
          this.$refs.canvasWrapper.width,
          this.$refs.canvasWrapper.height
        );
        this.drawRect("stroke");
        this.drawScreen();
      }
    },
    canvasUp(e) {
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      this.drag = false;
      this.point.endX = e.pageX - this.$refs.canvasWrapper.offsetLeft;
      this.point.endY = e.pageY - this.$refs.canvasWrapper.offsetTop;
      this.checkDirection();
      // console.log(this.point);
      this.point = {
        startX: "",
        startY: "",
        endX: "",
        endY: "",
        w: "",
        h: ""
      };
      ctx.clearRect(
        0,
        0,
        this.$refs.canvasWrapper.width,
        this.$refs.canvasWrapper.height
      );
    },
    drawRect(style) {
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      if (style === "fill") {
        ctx.fillRect(
          this.point.startX,
          this.point.startY,
          this.point.w,
          this.point.h
        );
      }
      if (style === "stroke") {
        ctx.strokeRect(
          this.point.startX,
          this.point.startY,
          this.point.w,
          this.point.h
        );
      }
    },
    drawScreen() {
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.fillStyle = "#b22acb";
      ctx.strokeStyle = "#b22acb";
    },
    checkDirection() {
      const test = {
        x: parseInt(
          this.point.startX + (this.point.endX - this.point.startX) / 2
        ),
        y: parseInt(
          this.point.startY + (this.point.endY - this.point.startY) / 2
        ),
        width: parseInt(this.point.w),
        height: parseInt(this.point.h)
      };
       const test2 = {
          x: parseInt(
            this.point.endX + (this.point.startX - this.point.endX) / 2
          ),
          y: parseInt(
            this.point.endY + (this.point.startY - this.point.endY) / 2
          ),
          width: parseInt(this.point.startX - this.point.endX),
          height: parseInt(this.point.startY - this.point.endY)
        };

      if (this.point.h < 0) {
       
        console.log("这是缩小", test2.width,test2.height);
        api.checkType("dragzoomout", test2);
        this.point = {
          startX: "",
          startY: "",
          endX: "",
          endY: "",
          w: "",
          h: ""
        };
      } else if (
        this.point.startX === this.point.endX &&
        this.point.startY === this.point.endY
      ) {
        console.log("这是一个点");
        api.checkType("dClick", test);
        this.point = {
          startX: "",
          startY: "",
          endX: "",
          endY: "",
          w: "",
          h: ""
        };
      } else if (this.point.h > 0) {
        console.log("这是扩大", test);
        api.checkType("dragzoomin", test);
        this.point = {
          startX: "",
          startY: "",
          endX: "",
          endY: "",
          w: "",
          h: ""
        };
      }
    }
  }
};
</script>


<style>
#video-wrapper {
  display: inline-block;
  width: 940px;
  height: 567px;
}
.video-js .vjs-tech {
  position: relative !important;
}
.video-js .vjs-control-bar {
  position: relative !important;
  background: #ccc !important;
}
.my-video-dimensions {
  width: auto !important;
  height: auto !important;
}
.video-js {
  width: auto !important;
  height: auto !important;
}

#myCanvas {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 99;
}

#video-wrapper > span {
  position: absolute;
  z-index: 99999;
  display: block;
  background: red;
  width: 4px;
  height: 4px;
}
#video-wrapper .Dot1 {
  top: 100px;
  left: 100px;
}
#video-wrapper .ctDot {
  top: 281px;
  left: 468px;
}
</style>
