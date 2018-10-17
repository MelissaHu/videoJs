<template>
 <div id="video-wrapper"  ref="vdWrapper">
   <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" >
    <source src="http://10.168.4.181:10001/hls/0100102001/0100102001_live.m3u8" type="application/x-mpegURL">
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
      drag:false,
      rect:{}
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
      console.log(vdSize);
    },
    canvasDown(e){
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      this.rect.startX = e.pageX - this.offsetLeft -8;
      this.rect.startY = e.pageY - this.offsetTop - 8;
      this.drag = true;
      console.log(this.rect.startX,this.rect.startY)
    },
    canvasMove(e){

    },
    canvasUp(e){

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
