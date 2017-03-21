/**
 * demo1
 */
export default{
  data: function () {
    return {
      imgName: ["walk_0.png", "walk_1.png", "walk_2.png", "walk_3.png", "jump.png"],
      imgObject: [],
      imgCount: 0,
      isWalking: false,
      points: [],
      dir: "right",
      isJumping: false
    }
  },
  created: function () {
    //首先获取到图片
    this.imgName.forEach(function (item, index) {
      let img = new Image();
      img.src = "/static/image/" + item;
      img.onload = function () {
        this.imgCount++;
        //放入全局中
        this.imgObject[index] = img;
      }.bind(this)
      img.onerror = function () {
        this.imgCount++;
      }.bind(this)
    }.bind(this));
  },
  mounted: function () {
    this.interval = window.setInterval(function () {
      this.canvas = this.$refs.canvas3;
      this.ctx = this.canvas.getContext("2d");
      this.x = 0;
      this.s = 0;
      //判断资源是否加载完毕,如果没有加载完毕,应该会有个loading,但是懒的写了
      if (this.imgCount === this.imgName.length) {
        window.clearInterval(this.interval);
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 120, this.canvas.width, 30);
        this.drawLine(true);
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.imgObject[0], -27, 80, 27, 41);
        this.ctx.restore();
        //不知道用vue怎么在canvas上监听键盘事件,所以暂时这么写了
        document.addEventListener("keydown", function (evt) {
          this.act(evt);
        }.bind(this))
        document.addEventListener("keydup", function (evt) {
          this.unAct(evt);
        }.bind(this))
      }
    }.bind(this), 100)

  },
  methods: {
    drawLine: function (flag) {
      this.ctx.clearRect(0, 0, this.canvas.width, 30);
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#3cd088";
      this.ctx.fillStyle = "#3cd088";
      this.ctx.moveTo(0, 0);
      if (flag) {
        this.points = [];
        let lx = 0;
        while (lx <= this.canvas.width) {
          lx += 20 * Math.random();
          let ly = 30 * Math.random();
          this.ctx.lineTo(lx, ly);
          this.points.push({x: lx, y: ly});
        }
      } else {
        this.points.forEach(function (item, index) {
          this.ctx.lineTo(item.x, item.y);
        }.bind(this))
      }
      this.ctx.lineTo(this.canvas.width, 0);
      this.ctx.fill();
      //将canvas生成图片后续使用
      if (flag) {
        let imgUrl = this.canvas.toDataURL('image/png');
        this.offImage = new Image();
        this.offImage.src = imgUrl;
      }
    },
    /**
     * 起跳
     */
    act: function (event) {
      switch (event.keyCode) {
        //left
        case 37:
          if (this.isJumping) {
            return;
          }
          this.dir = "left";
          this.stopWalking = false;
          this.walk();
          break;
        //up
        case 38:
          if (this.isJumping) {
            return;
          }
          this.isJumping = true;
          this.y = 80;
          this.jump();
          break;
        //right
        case 39:
          if (this.isJumping) {
            return;
          }
          this.dir = "right";
          this.stopWalking = false
          this.walk();
          break;
        //down
        case 40:
          //懒的写了,直接下来吧
          this.ctx.clearRect(0, 0, this.canvas.width, 121);
          this.drawLine(false);
          if (this.dir == "right") {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(this.imgObject[0], this.x - 27, 80, 27, 41);
            this.ctx.restore();
          } else {
            this.ctx.drawImage(this.imgObject[0], this.x, 80, 27, 41);
          }
          this.isJumping = false;
          break;
        default:
          break;
      }
    },
    unAct: function () {
      if (this.isWalking) {
        this.stopWalking = true;
        this.isWalking = false;
      }
    },
    //起跳
    jump: function () {
      //检测是否碰撞
      this.isJumping = true;
      this.ctx.clearRect(0, 0, this.canvas.width, 121);
      this.drawLine(false);
      this.y -= 3;
      if (this.dir == "right") {
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.imgObject[4], this.x - 27, this.y, 27, 41);
        this.ctx.restore();
      } else {
        this.ctx.drawImage(this.imgObject[4], this.x, this.y, 27, 41);
      }
      //只显示碰撞区域
      if (!this.collesion()) {
        window.requestAnimationFrame(this.jump);
      }
    },
    //根据像素检测是否碰撞了
    collesion: function () {
      //只需要计算局部碰撞的矩形即可,不需要计算所有,此处由于是向上的,所以只需要判断y就好了
      if (this.y > 30) {
        return false;
      }
      //需要创建一个离线canvas
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      ctx.drawImage(this.offImage, 0, 0, this.canvas.width, this.canvas.height);
      ctx.globalCompositeOperation = 'destination-in';
      if (this.dir == "right") {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(this.imgObject[4], this.x - 27, this.y, 27, 41);
        ctx.restore();
      } else {
        ctx.drawImage(this.imgObject[4], this.x, this.y, 27, 41);
      }
      let data = ctx.getImageData(Math.abs(this.x) - 28, 0, 56, 30).data;
      canvas = null;
      ctx = null;
      return data.some(function (item, index) {
        return (index + 1) % 4 === 0 && item !== 0;
      })
      return false;
    },
    //跑
    walk: function () {
      if (this.isJumping || this.stopWalking) {
        return;
      }
      window.cancelAnimationFrame(this.walkA);
      this.ctx.clearRect(0, 50, this.canvas.width, 71);
      this.isWalking = true;
      if (this.dir === "right") {
        this.x = -Math.abs(this.x)
        if (-this.x + 28 <= this.canvas.width) {
          this.x -= 1;
        }
        this.s = parseInt(-this.x / 5);
        var index = this.s % 4;
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.imgObject[index], this.x - 27, 80, 27, 41);
        this.ctx.restore();
      } else {
        this.x = Math.abs(this.x);
        if (this.x + 28 >= 0) {
          this.x -= 1;
        }
        this.s = parseInt(this.x / 5);
        var index = this.s % 4;
        this.ctx.drawImage(this.imgObject[index], this.x, 80, 27, 41);
      }
      this.walkA = window.requestAnimationFrame(this.walk);
    }
  }
}



