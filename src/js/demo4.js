/**
 * demo1
 */
export default{
  data: function () {
    return {
      sx: -1,
      sy: 10,
      rainArr: [],
      linePoint: [],
    }
  },
  mounted: function () {
    this.canvas = this.$refs.canvas4;
    this.ctx = this.canvas.getContext("2d");
    this.rain();
  },
  methods: {
    rain: function () {
      var cw = this.canvas.width;
      this.ctx.clearRect(0, 0, cw, this.canvas.height);
      //碰撞检测
      this.collesion();
      //新增雨滴
      for (var i = 0; i < 10; i++) {
        var drop = {
          x: cw * Math.random(),
          y: 0,
        }

        //将雨滴保存下来
        this.rainArr.push(drop);
      }
      //遍历雨滴，进行操作
      this.rainArr.forEach(function (item, index) {
        let color = this.ctx.createLinearGradient(item.x, item.y, item.x + this.sx, item.y + this.sy);
        color.addColorStop(0, "rgba(0,0,0,0)");
        color.addColorStop(0.5, "rgba(105,105,105,1)");
        color.addColorStop(1, "rgba(255,255,255,1)");
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(item.x, item.y);
        this.ctx.lineTo(item.x + this.sx, item.y + this.sy);
        item.y += this.sy;
        item.x += this.sx;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();
      }.bind(this))
      let self = this;
      window.setTimeout(self.rain, 100)
      //window.requestAnimationFrame(this.rain);
    },
    /**
     * 碰撞检测
     */
    collesion: function () {
      //画一个区曲线吧,真是曲线哦
      this.ctx.strokeStyle = "red";
      let x = 0, y = this.canvas.height;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      if (this.linePoint.length === 0) {
        while (x <= this.canvas.width) {
          x += Math.random() * 20;
          y = this.canvas.height - Math.random() * 50;
          //随机生成一条线
          this.ctx.lineTo(x, y);
          this.linePoint.push({x: x, y: y});
        }
      } else {
        this.linePoint.forEach(function (item, index) {
          //随机生成一条线
          this.ctx.lineTo(item.x, item.y);
        }.bind(this));
        let self = this;
       /* window.setTimeout(function () {
          //debugger;
          let len = self.linePoint.length;
          for (let j = len - 1; j > 0; j--) {
            //self.linePoint[j - 1].x = self.linePoint[j].x;
            //self.linePoint[j - 1].y = self.linePoint[j].y;
          }
          self.collesion();
          /!*self.linePoint[len - 1] = {
           x: self.linePoint[len - 2] + Math.random() * 20,
           y: self.canvas.height - Math.random() * 50
           }*!/
        }, 1000)*/
      }
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      //this.ctx.closePath();
      for (var i = this.rainArr.length - 1; i >= 0; i--) {
        let item = this.rainArr[i];
        if (this.ctx.isPointInPath(item.x + this.sx, item.y + this.sy)) {
          this.rainArr.splice(i, 1);
        }
      }
      this.ctx.stroke();
    }
  }
}



