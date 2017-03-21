<template>
  <div id="demo1" style="padding:30px;">
    <div>
      <div>规则对称模型碰撞包括:
        <a href="javascript:void(0)" @click="change(0)" v-bind:class="{active:type==0}">矩形与矩形碰撞</a>,
        <a href="javascript:void(0)" @click="change(1)" v-bind:class="{active:type==1}">圆形与圆形碰撞</a>,
        <a href="javascript:void(0)" @click="change(2)" v-bind:class="{active:type==2}">矩形与圆形碰撞</a>
      </div>
    </div>
    <div style="margin-top:15px;" v-html="list[type]"></div>
    <canvas ref="canvas1"></canvas>
    <div>
      <input type="button" value="开始" @click="begin"/>
      <input type="button" value="暂停" @click="pause"/>
      <input type="button" value="示意图" v-if="type===2" @click="show"/>
    </div>
  </div>
</template>
<script type="text/javascript">
  import demo1 from 'js/demo1'
  export default{
    ...demo1
  }
</script>
