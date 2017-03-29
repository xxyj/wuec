<template>
  <div style="overflow: hidden;height:100%;">
    <div class="title">碰撞检测</div>
    <div class="content-left">
      <ul>
        <li>
          <router-link to="/nav" active-class="active">总览</router-link>
        </li>
        <li>
          <router-link to="/demo1" active-class="active">盒模型碰撞</router-link>
        </li>
        <li>
          <router-link to="/demo2" active-class="active">分离轴定理</router-link>
        </li>
        <li>
          <router-link to="/demo3" active-class="active">像素检测</router-link>
        </li>
        <li>
          <router-link to="/demo4" active-class="active">其他</router-link>
        </li>
        <li>
          <router-link to="/base" active-class="active">基础</router-link>
        </li>
      </ul>
    </div>
    <div class="content-right">
         <transition name="fade">
            <router-view ></router-view>
         </transition>
    </div>
  </div>
</template>

<style src="index.css" rel="stylesheet"/>

