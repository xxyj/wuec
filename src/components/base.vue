<template>
  <div id="base" style="padding:30px;">
    canvas的长度:<input type="" v-modal="{ch}">
    canvas的宽度:<input type="" v-modal="{cw}">
    <canvas ref="canvasBase" width="{cw}" height="{ch}"></canvas>
  </div>
</template>
<script type="text/javascript">
  import base from 'js/base'
  export default{
    ...base
  }
</script>
