/**
 * demo1
 */
export default{
  data: function () {
    return {
      list: {
        "0": "核心公式:A.x + A.w >= B.x && B.x + B.w >= A.x && A.y + A.h >= B.y && B.y + B.h >= A.y",
        "1": "核心公式:Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2)) <= A.r + B.r",
        "2": "核心公式:A.x-=B.radius;A.y-=B.radius,A.width+=2*B.radius,A.height+=B.radius;ctx.isPointInpath(B.R(x,y))",
      },
      type: "0",
      //用来存储碰撞的物体
      objects: [
        {x: 50, y: 50, w: 20, h: 40, sx: 0.5, sy: 0},
        {x: 200, y: 50, w: 30, h: 15, sx: -1.1, sy: 0},
        {x: 150, y: 20, w: 20, h: 20, sx: -0.8, sy: -1.2},
        {x: 80, y: 100, w: 10, h: 10, sx: 1, sy: 1}
      ],
      balls: [
        {x: 100, y: 120, r: 10, sx: 1, sy: 1},
        {x: 50, y: 60, r: 15, sx: 0.5, sy: 0},
        {x: 210, y: 90, r: 8, sx: -1.1, sy: 0},
        {x: 160, y: 30, r: 5, sx: -0.8, sy: -1.2}
      ],
      mix: [
        {x: 100, y: 120, r: 10, sx: 1, sy: 1},
        {x: 50, y: 50, w: 20, h: 40, sx: 0.5, sy: 0},
        {x: 210, y: 90, r: 8, sx: -1.1, sy: 0},
        {x: 160, y: 30, r: 5, sx: -0.8, sy: -1.2},
        {x: 250, y: 20, w: 20, h: 20, sx: -0.8, sy: -1.2},
      ],
      color: ["#ff00ff", "#0000ff", "#3cd088", "#0bbdef", "#bbb333", "#sea318", "#014321"]
    }
  },
  mounted: function () {
    this.canvas = this.$refs.canvas1;
    this.ctx = this.canvas.getContext("2d");
    //开始画图
    this.drawObjects();
  },
  methods: {
    change: function (type) {
      //类型切换

      window.cancelAnimationFrame(this.animateBegin);
      this.type = type;
      this.drawObjects();
    },
    begin: function () {
      //开始动画
      this.drawObjects(true)
    },
    pause: function () {
      //暂停动画
      window.cancelAnimationFrame(this.animateBegin);
    },
    //画图
    drawObjects: function (flag) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //this.canvas.width = this.canvas.width;
      //this.ctx.moveTo(0, 0);
      //需要判断和其他模块是否会相撞
      var content = this.objects;
      if (this.type == 1) {
        content = this.balls;
      } else if (this.type == 2) {
        content = this.mix;
      }
      content.forEach(function (item, index) {
        this.ctx.beginPath();
        //根据角度,判断位置,-180-180,此处的0坐标点在左上角,其实也可以自己制定
        var len = this.color.length;
        this.ctx.strokeStyle = this.color[index % len];
        this.collesion(content);
        if (item.r) {
          this.ctx.arc(item.x, item.y, item.r, 0, 2 * Math.PI);
        } else {
          this.ctx.rect(item.x, item.y, item.w, item.h);
        }
        this.ctx.stroke();
      }.bind(this))
      this.ctx.closePath();
      if (flag) {
        this.animateBegin = window.requestAnimationFrame(this.drawObjects);
      }
    },
    /**
     * 判断矩形是否会与其他模块相撞,或则是否会碰到边界
     * @param item
     */
    collesion: function (content) {
      let len = content.length;
      for (let i = 0; i < len; i++) {
        let A = content[i];
        this.collesionWall(A);
        for (let j = 0; j < len; j++) {
          let B = content[j];
          this.collestionOther(A, B);
        }
        A.x += A.sx;
        A.y += A.sy;
      }
    },
    /**
     * 和墙壁碰撞
     * @param item
     */
    collesionWall: function (A) {
      if (A.r) {
        if (A.x <= A.r || A.x + A.r >= this.canvas.width) {
          A.sx = -A.sx;
        }
        if (A.y <= A.r || A.y + A.r >= this.canvas.height) {
          A.sy = -A.sy;
        }
      } else {
        if (A.x <= 0 || A.x + A.w >= this.canvas.width) {
          A.sx = -A.sx;
        }
        if (A.y <= 0 || A.y + A.h >= this.canvas.height) {
          A.sy = -A.sy;
        }
      }
    },
    /**
     * 模块之间的碰撞  方与方  圆与圆  方与园
     * @param A
     * @param B
     */
    collestionOther: function (A, B) {
      if (A.r && B.r) {
        if (A.x + A.w >= B.x && B.x + B.w >= A.x && A.y + A.h >= B.y && B.y + B.h >= A.y) {
          [A.sy, B.sy] = [B.sy, A.sy];
          [A.sx, B.sx] = [B.sx, A.sx];
        }
      } else if (A.r) {
        let x = Math.max(B.x - A.r, 0);
        let y = Math.max(B.y - A.r, 0);
        let w = Math.min(B.x + B.w + A.r, this.canvas.width);
        let h = Math.min(B.y + B.h + A.r, this.canvas.height);
        if (A.x >= x && A.x <=  w && A.y >= y && A.y <= h) {
          [A.sy, B.sy] = [B.sy, A.sy];
          [A.sx, B.sx] = [B.sx, A.sx];
        }

      } else if (B.r) {
        let x = Math.max(A.x - B.r, 0);
        let y = Math.max(A.y - B.r, 0);
        let w = Math.min(A.x + A.w + B.r, this.canvas.width);
        let h = Math.min(A.y + A.h + B.r, this.canvas.height);
        if (B.x >= x && B.x <=  w && B.y >= y && B.y <= h) {
          [A.sy, B.sy] = [B.sy, A.sy];
          [A.sx, B.sx] = [B.sx, A.sx];
        }
      }
      else {
        if (A.x + A.w >= B.x && B.x + B.w >= A.x && A.y + A.h >= B.y && B.y + B.h >= A.y) {
          [A.sy, B.sy] = [B.sy, A.sy];
          [A.sx, B.sx] = [B.sx, A.sx];
        }
      }
    }
  }
}



