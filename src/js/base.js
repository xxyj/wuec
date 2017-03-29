/**
 *canvas的基础知识
 */
export default{
  data: function () {
    return {
      ch:100,
      cw:100
    }
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



