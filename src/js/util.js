/**
 * 注册一些全局使用的方法以及指令
 * @param Vue
 * @param options
 */
//import Vue from 'vue'
var publicTool = {};
publicTool.install = function (Vue, options) {

  Vue.prototype.animationBegin = (function () {
    return window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame
  })()

  Vue.prototype.animationCancel = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame
      || window.webkitCancelAnimationFrame
      || window.mozCancelAnimationFrame
      || window.oCancelAnimationFrame
      || window.msCancelAnimationFrame
  }

  /**
   * 自定义指令
   */
  Vue.directive('my-directive', function (el, binding) {

  })

}
export default publicTool
//Vue.use(publicTool)
