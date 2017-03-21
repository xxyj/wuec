/**
 * demo1
 */
export default{
  data: function () {
    return {
      stop: false,
      //多边形的数据点,此处写死,其实可以采用自动生成的方式
      objects: [
        {sd: [], points: [{x: 50, y: 10}, {x: 20, y: 50}, {x: 40, y: 100}, {x: 70, y: 40}], sx: 1, sy: 0.6},
        {sd: [], points: [{x: 100, y: 50}, {x: 80, y: 120}, {x: 120, y: 120}], sx: 1.2, sy: -1.6},
        {sd: [], points: [{x: 150, y: 60}, {x: 170, y: 60}, {x: 160, y: 90}], sx: -1.2, sy: 1.2},
        {
          sd: [],
          points: [{x: 240, y: 60}, {x: 190, y: 90}, {x: 200, y: 130}, {x: 230, y: 130}, {x: 250, y: 90}],
          sx: -1.2,
          sy: -1.3
        }
      ]
    }
  },
  created: function () {
    //此处其实应该做个判断,图片是否加载完毕,但是此处因为是后面用到的,所以肯定加载完了
    this.imgObject = [];
    for (let i = 1; i < 3; i++) {
      let img = new Image();
      img.src = "/static/image/xl" + i + ".png";
      img.onload = function () {
        this.imgObject.push(img);
      }.bind(this)
    }
  },
  mounted: function () {
    this.canvas = this.$refs.canvas2;
    this.ctx = this.canvas.getContext("2d");
    //获取所有多边形的投影轴
    this.getShadow();
    this.draw();
  },
  methods: {
    actResult: function () {
      if (this.stop) {
        this.stop = false;
        this.draw();
      }
    },
    actShow: function (index) {
      this.stop = true;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let item = this.imgObject[index];
      let s = 1.3;
      if (parseInt(item.width) > 1000) {
        s = 4;
      }
      this.ctx.drawImage(item, 30, 0, item.width / s, item.height / s);
    },
    /**
     * 先画出多边形
     */
    draw: function () {
      if (this.stop) {
        return;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.collesion();
      this.objects.forEach(function (item, index) {
        this.ctx.beginPath();
        this.ctx.fillStyle = ["red", "blue", "yellow", "green"][index];
        //生成多边形
        item.points.forEach(function (item2, index2) {
          if (0 == index2) {
            this.ctx.moveTo(item2.x, item2.y);
          } else {
            this.ctx.lineTo(item2.x, item2.y);
          }
          this.ctx.fill();
        }.bind(this))
      }.bind(this))
      this.ctx.closePath();
      window.requestAnimationFrame(this.draw);
    },
    /**
     *
     */
    collesion: function () {
      for (let i = 0; i < this.objects.length; i++) {
        let A = this.objects[i];
        for (let j = i + 1; j < this.objects.length; j++) {
          let B = this.objects[j];
          let flag = this.collesionOther(A, B);
          if (flag) {
            [A.sx, B.sx] = [B.sx, A.sx];
            [A.sy, B.sy] = [B.sy, A.sy];
          }
        }
        //对墙的判断
        this.collesionWall(A);
        //矩形之间的判断
        A.points.forEach(function (item, index) {
          item.x += A.sx;
          item.y += A.sy;
        })
      }
    },
    /**
     * 用来技术分享的关键点是碰撞,旋转问题就暂时不考虑了.所以一开始就算出所有投影轴吧
     */
    getShadow: function () {
      this.objects.forEach(function (item, index) {
        for (var i = 0; i < item.points.length; i++) {
          let A = item.points[i];
          let B = item.points[i + 1] || item.points[0];
          let l = Math.sqrt(Math.pow((B.x - A.x), 2) + Math.pow((B.y - A.y), 2));
          //获取其中一个垂直向量的单位向量
          let x = {x: ((B.y - A.y) / l).toFixed(2), y: ((A.x - B.x) / l).toFixed(2)};
          item.sd.push(x)
        }
      }.bind(this))
    },
    /**
     * 多边形相互之前的碰撞,利用向量的点击运算
     * @param A
     * @param B
     */
    collesionOther: function (A, B) {
      //先求出所有的投影轴
      let arr = A.sd.concat(B.sd);
      for (var item of
      arr
      )
      {
        let minA, maxA, minB, maxB;
        let tmp1 = A.points.map(function (item2, index) {
          return item.x * item2.x + item.y * item2.y
        })
        maxA = Math.max.apply(null, tmp1);//Max.max(...tmp1)
        minA = Math.min.apply(null, tmp1);
        let tmp2 = B.points.map(function (item2, index) {
          return (item.x * item2.x) + (item.y * item2.y);
        })
        maxB = Math.max.apply(null, tmp2);
        minB = Math.min.apply(null, tmp2);
        if (!(maxA >= minB && maxB >= minA)) {
          return false;
        }
      }
      return true;
    },
    collesionWall: function (A) {
      var l = this.canvas.width;
      var h = this.canvas.height;
      if (A.points.some(function (m, index) {
          return m.y <= 0 || m.y >= h;
        })) {
        A.sy = -A.sy;
      }
      if (A.points.some(function (m, index) {
          return m.x <= 0 || m.x >= l;
        })) {
        A.sx = -A.sx;
      }
    },
  }
}
