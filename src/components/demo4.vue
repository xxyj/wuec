<template>
  <div id="demo2" style="padding:30px;">
    <div>关键方法:<a target="_blank" href="http://www.w3school.com.cn/tags/canvas_getimagedata.asp">getImageData</a></div>
    <div>最小像素群点:
      <a href="javascript:void(0)" @click="change(1)" :class="{active:type==0}">1</a>,
      <a href="javascript:void(0)" @click="change(10)" :class="{active:type==1}">10</a>,
      <a href="javascript:void(0)" @click="change(40)" :class="{active:type==2}">40</a>
    </div>
    <canvas ref="canvas4"></canvas>
</template>
<script>
  import demo2 from 'js/demo2'
  export default{
    ...demo2
  }
</script>
