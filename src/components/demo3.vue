<template>
  <div style="margin:30px;">
    <div>
        像素检测的原理:检测2个物体在同一像素是否有覆盖,有则碰撞,无则不碰撞<br><br>
        2个关键函数:
        <a href="http://www.w3school.com.cn/tags/canvas_getimagedata.asp" target="_blank">getImageData</a>
        <a href="http://www.w3school.com.cn/tags/canvas_globalcompositeoperation.asp" target="_blank">globalCompositeOperation</a>
    </div>
    <canvas ref="canvas3"></canvas>
    <div>
      <input type="button" value="更新" width="200" @click="drawLine"/>
    </div>
  </div>
</template>
<script type="text/javascript">
  import demo3 from 'js/demo3'
  export default{
    ...demo3
  }
</script>
