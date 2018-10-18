<template>
 <div id="video-wrapper"  ref="vdWrapper">
   <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" >
    <source src="http://10.168.4.181:10001/hls/0100102001/0100102001_live.m3u8" type="application/x-mpegURL">
    <!-- <source src="rtmp://10.168.4.181:10935/hls/0100102001" type="rtmp/flv"> -->
   </video>
    <canvas id="myCanvas" 
    ref="canvasWrapper"
    @mousedown="canvasDown($event)"
    @mousemove="canvasMove($event)"
    @mouseup="canvasUp($event)"
    ></canvas>
 </div>
</template>
<script>
import videojs from "video.js";
import "videojs-contrib-hls";
import "../assets/js/demo.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      drag: false,
      rect: {},
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
    this.getSize();
  },
  methods: {
    getSize() {
      const vdSize = {
        w: this.$refs.vdWrapper.offsetWidth,
        h: this.$refs.vdWrapper.offsetHeight
      };
      this.$refs.canvasWrapper.setAttribute("width", vdSize.w);
      this.$refs.canvasWrapper.setAttribute("height", vdSize.h);
      console.log("canvas的尺寸", vdSize);
    },
    canvasDown(e) {
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      this.point.startX = e.pageX - this.$refs.canvasWrapper.offsetLeft;
      this.point.startY = e.pageY - this.$refs.canvasWrapper.offsetTop;
      this.drag = true;
    },
    canvasMove(e) {
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      this.drawScreen();
      if (this.drag) {
        this.point.w =
          e.pageX - this.$refs.canvasWrapper.offsetLeft - this.point.startX;
        this.point.h =
          e.pageY - this.$refs.canvasWrapper.offsetTop - this.point.startY;
        ctx.clearRect(0,0,this.$refs.canvasWrapper.width,this.$refs.canvasWrapper.height);
        this.drawRect("stroke");
      }
    },
    canvasUp(e) {
      let myCanvas = this.$refs.canvasWrapper;
      let ctx = myCanvas.getContext("2d");
      this.point.endX = e.pageX - this.$refs.canvasWrapper.offsetLeft;
      this.point.endY = e.pageY - this.$refs.canvasWrapper.offsetTop;
      this.checkDirection();
      console.log(this.point);
      this.drag = false;
      this.point = {
        startX: "",
        startY: "",
        endX: "",
        endY: "",
        w: "",
        h: ""
      };
      ctx.clearRect(0,0,this.$refs.canvasWrapper.width,this.$refs.canvasWrapper.height);
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
      if (this.point.h < 0) {
        console.log("这是缩小");
        //  turnZoomOut();
      } else if (this.point.startX === this.point.endX && this.point.startY === this.point.endY ) {
        console.log("这是一个点");
        // turnReset();
      } else if (this.point.h > 0) {
        console.log("这是扩大");
      }
    }
  }
};
</script>


<style>
#video-wrapper {
  position: relative;
  width: auto;
  min-height: auto;
  height: 100%;
  overflow: auto;
}
.video-js .vjs-tech {
  position: relative !important;
}
.video-js .vjs-control-bar {
  position: relative !important;
  background: red !important;
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
</style>
