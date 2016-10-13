function Carousel(options) {
    this.set = options
    this.car = document.getElementById(this.set.id)
    this.inner = this.getByClass(this.car, this.set.className)[0]
    this.wid = this.getStyle(this.car, 'width')
    this.num = this.car.getElementsByTagName('img').length
    this.span = this.car.getElementsByTagName('span')
    this.btns = this.car.getElementsByTagName('li')
    this.ind = 1
    this.toggle = true
}
Carousel.prototype = {
    defaults: {
        time: 200,
        interval: 10,
        delay: 2000
    },

    init: function() {
        this.inner.style.width = this.wid * this.num + 'px'
        this.inner.style.left = -this.wid + 'px'
        var single = true
        var that = this
        var page = 1
            // set defaults
        this.setting(this.set)
        this.span[1].onclick = function() {
            if (that.ind == 3) {
                that.ind = 1
            } else {
                that.ind += 1
            }
            that.showBtn()
            that.animate(-that.wid)
        }
        this.span[0].onclick = function() {
            if (that.ind == 1) {
                that.ind = 3
            } else {
                that.ind -= 1
            }
            that.showBtn()
            that.animate(that.wid)
        }
      //   this.car.onmouseover = function() {
      //       for (var i = 0; i < that.span.length; i++) {
      //           that.span[i].style.display = 'block'
      //       }
      //       clearInterval(time)
      //   }
      //   this.car.onmouseout = function() {
      //       clearInterval(time)
      //       for (var i = 0; i < that.span.length; i++) {
      //           that.span[i].style.display = 'none'
      //       }
      //       setInterval(function() {
      //           if (that.ind == 3) {
      //               that.ind = 1
      //           } else {
      //               that.ind += 1
      //           }
      //           that.showBtn()
      //           that.animate(-that.wid)
      //       }, that.defaults.delay)
      //   }
        var time = setInterval(function() {
            if (that.ind == 3) {
                that.ind = 1
            } else {
                that.ind += 1
            }
            that.showBtn()
            that.animate(-that.wid)
        }, that.defaults.delay)
    },

    setting: function(option) {
        if (option.time && option.interval && option.delay) {
            this.defaults.time = option.time
            this.defaults.interval = option.interval
            this.defaults.delay = option.delay
        }
    },

    animate: function(offset) {
        var num = this.defaults.time / this.defaults.interval
        var speed = offset / num
        var newleft = parseFloat(this.inner.style.left) + offset
        console.log(parseFloat(this.inner.style.left))
        var that = this
        if (that.toggle) {
            move()
        }

        function move() {
            if ((speed < 0 && newleft < parseFloat(that.inner.style.left)) || (speed > 0 && newleft > parseFloat(that.inner.style.left))) {
                // 要用parseFloat,否则会出现错位
                that.inner.style.left = parseFloat(that.inner.style.left) + speed + 'px'
                setTimeout(move, that.defaults.interval)
                console.log(that.inner.style.left)
                that.toggle = false
            } else {
                that.toggle = true
                if (newleft <= -that.wid * 4) {
                    that.inner.style.left = -that.wid + 'px'
                }
                if (newleft >= 0) {
                    that.inner.style.left = -that.wid * 3 + 'px'
                }
            }
        }
    },

    showBtn: function() {
        for (var i = 0; i < this.btns.length; i++) {
            if (this.btns[i].className == 'on') {
                this.btns[i].className = ''
                break
            }
        }
        this.btns[this.ind - 1].className = 'on'
    },

    getStyle: function(ele, attr) {
        var value
        if (window.getComputedStyle) {
            value = getComputedStyle(ele, false)[attr]
        } else {
            value = ele.currentStyle[attr]
        }
        value = parseFloat(value, 10)
        return value
    },

    getByClass: function(obj, cla) {
        var ele = []
        var arr = obj.getElementsByTagName('*')
        var reg = new RegExp(cla, 'i')
        for (var i = 0; i < arr.length; i++) {
            if (reg.test(arr[i].className)) {
                ele.push(arr[i])
            }
        }
        return ele
    },
}
