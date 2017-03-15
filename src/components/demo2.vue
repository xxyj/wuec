<template>
  <div style="padding:30px;">
    <div>
      首先了了解几个简单的向量运算:<br>
      向量表示法:AB或则a或则{x,y}<br>
      向量的垂直向量的算法:假如原有向量为{x,y},垂直向量为{m,n},则xm+ny=0;也就是说{x,y}的垂直向量为{-y,x}k或则{x,-y}K
    </div>
    <canvas ref="canvas2"></canvas>
  </div>
</template>
<script type="text/javascript">
  import demo2 from 'js/demo2'
  export default{
    ...demo2
  }
</script>
