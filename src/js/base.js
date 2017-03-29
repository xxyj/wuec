/**
 *canvas的基础知识
 */
export default{
  data: function () {
    return {}
  },
  created: function () {

  },
  mounted: function () {
    this.canvas = this.$refs.canvasBase;
    this.ctx = this.canvas.getContext("2d");
    this.draw();
  },
  methods: {
    draw: function () {
      
    }
  }
}



