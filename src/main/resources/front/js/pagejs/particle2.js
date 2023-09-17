
var PARTICLE_RENDERER2 = {
    onShow:false,//避免离开该part某些方法依然在执行。该值为false时，该类大部分方法立即停止
    PARTICLE_COUNT: 1000,
    PARTICLE_RADIUS: 2.1,
    TRANSLATION_COUNT: 500,//自动切换间隔 ms
    BASIC_DIST:6,
    imgAlpha:[],
    imgRed:[],
    imgGreen:[],
    imgBlue:[],
    imgSize:[],
    RAND_DISTANCE_MAX: 500,
    RAND_DISTANCE_MIN: 250,
    IS_REPELLING: true,
    //particleImagePathBase:'src\\main\\resources\\front\\images\\mdc\\particle\\',
    //particleImagePathBase:'D:\\school\\jsjsjds\\src\\main\\resources\\front\\images\\mdc\\swiper\\',
    particleImagePathBase:'/data/images/',

    init: async function () {
        this.setParameters();
        //await this.getImgAlpha();
        //this.createParticles();
        //this.setupFigure();
        this.reconstructMethod();
        this.bindEvent();
        this.drawFigure();
    },
    setParameters: function () {/*
        this.mouse_poly = document.getElementById("mouse-poly")
        this.mouse_center = document.getElementById("mouse-center")
        this.mousevx = 0;
        this.mousevy = 0;
        this.mousex = 0;
        this.mousey = 0;
        this.current = Math.floor(Math.random() * this.particleImagePaths.length)
        if(this.current === this.particleImagePaths.length) this.current = 0*/

        this.$window = $(window);

        this.$container = $('#particles2');
        this.width = this.$container.width();
        this.height = this.$container.height();
        this.$canvas = $('<canvas />').attr({ width: this.width, height: this.height }).appendTo(this.$container);
        this.$canvas.css({
            "filter": 'drop-shadow(5px 5px 2px #6c5929)',
        })
        this.context = this.$canvas.get(0).getContext('2d');

        this.center = { x:  1.4 * this.width / 3, y: 3 * this.height / 7 };

        this.theta = 0;
        this.reachTop = false;

        this.particles = [];
        this.imgAlpha = []
        this.imgSize = []
        //this.context.clearRect(0, 0, this.width, this.height);
    },
    getImgAlpha: async function () {
        this.imgAlpha = []
        this.imgSize = []
        let filename
        await getRandomIngredientPic(null).then(res => {
            if (res.code === 1) {
                filename = res.data.picName
            } else {
                console.log(res.msg || '操作失败')
            }
        }).catch(err => {
            console.log('请求出错了：' + err)
        });
        const params = {
            path:this.particleImagePathBase+filename,
        }
        await getImageData(params).then(res => {
            if (res.code === 1) {
                let pl1 = 0, pr1 = 0, count = 0;
                while (pl1 < res.data.length) {
                    if (pr1 === res.data.length || res.data[pr1] === "\t" || res.data[pr1] === "\n") {
                        if(count<2) {
                            this.imgSize.push(Number(res.data.substring(pl1, pr1)))
                        }
                        else if(count % 4 === 2) {
                            this.imgAlpha.push(Number(res.data.substring(pl1, pr1)));
                        }
                        else if(count % 4 === 3) {
                            this.imgRed.push(Number(res.data.substring(pl1, pr1)));
                        }
                        else if(count % 4 === 0) {
                            this.imgGreen.push(Number(res.data.substring(pl1, pr1)));
                        }
                        else if(count % 4 === 1) {
                            this.imgBlue.push(Number(res.data.substring(pl1, pr1)));
                        }
                        pl1 = pr1;
                        count++;
                    }
                    pr1++;
                }
            } else {
                console.log(res.msg || '操作失败')
            }
        }).catch(err => {
            console.log('请求出错了：' + err)
        });
    },
    createParticles: function () {
        for (let i = 0; i < Math.ceil(this.imgSize[1]); i++) {
            for (let j = 0; j < Math.ceil(this.imgSize[0]); j++) {
                if ((this.imgAlpha[i * Math.ceil(this.imgSize[0])+j]) / 255 <0.15) continue;
                const angle = Math.random()*Math.PI*2;
                let rand = Math.random() + Math.random();
                rand = rand>1?(2-rand):rand;
                const dist = Math.random()*(this.RAND_DISTANCE_MAX-this.RAND_DISTANCE_MIN)*rand+this.RAND_DISTANCE_MIN;
                this.particles.push(new PARTICLE(this.center,Math.cos(angle) * dist,Math.sin(angle) * dist));
                this.particles[this.particles.length - 1].setAxis((this.imgRed[i * Math.ceil(this.imgSize[0]) + j]),(this.imgGreen[i * Math.ceil(this.imgSize[0]) + j]),(this.imgBlue[i * Math.ceil(this.imgSize[0]) + j]), (j - this.imgSize[1] / 2) * this.BASIC_DIST, (i - this.imgSize[0] / 2) * this.BASIC_DIST,(this.imgAlpha[i * Math.ceil(this.imgSize[0]) + j]) / 255);
                const axis = this.particles[this.particles.length - 1].getAxis2D(this.theta);
                this.context.globalAlpha = axis.opacity;
                this.context.beginPath();
                this.context.fillStyle = axis.color;
                this.context.arc(0, 0, this.PARTICLE_RADIUS, 0, Math.PI * 2, false);
                this.context.fill();
            }
        }
    },
    reconstructMethod: function () {//让函数的this变为外层的this
        //this.setupFigure = this.setupFigure.bind(this);
        this.particleOn = this.particleOn.bind(this);
        this.particleOff = this.particleOff.bind(this);
        this.drawFigure = this.drawFigure.bind(this);
        this.changePos = this.changePos.bind(this);
        this.mdcSwitch = this.mdcSwitch.bind(this);/*
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseFadingCircle = this.mouseFadingCircle.bind(this);*/
    },
    bindEvent: function () {
        //this.$container.on('click', this.setupFigure);
        this.$container.on('mousemove', this.changePos);/*
        this.$container.on('mousemove', this.mouseMove);*/
        this.$container.on('click', this.mdcSwitch);/*
        this.$container.on('click', this.mouseFadingCircle);*/
    },
    changePos: function (event) {
        let offset = this.$container.offset();
        for (let i = 0; i < this.particles.length; i++) {
            let deltaX = event.clientX - offset.left + this.$window.scrollLeft() - this.particles[i].ox - this.center.x,
                deltaY = event.clientY - offset.top + this.$window.scrollTop() - this.particles[i].oy - this.center.y;//点指向鼠标的向量
            deltaX = this.IS_REPELLING?deltaX:-deltaX;
            deltaY = this.IS_REPELLING?deltaY:-deltaY;

            let dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            this.particles[i].nextX = this.particles[i].ox - deltaX / dist * (Math.pow(2, -dist) * (this.particles[i].MAX_GAP - this.particles[i].MIN_GAP) + this.particles[i].MIN_GAP);
            this.particles[i].nextY = -this.particles[i].oy + deltaY / dist * (Math.pow(2, -dist) * (this.particles[i].MAX_GAP - this.particles[i].MIN_GAP) + this.particles[i].MIN_GAP);
        }
    },
    /*setupFigure: function () {
        for (var i = 0, length = this.particles.length; i < length; i++) {
            this.particles[i].setAxis(this.strategies[this.strategyIndex]());//这里调用的f导致了随机性
        }
        if (++this.strategyIndex == this.strategies.length) {
            this.strategyIndex = 0;
        }
        this.translationCount = 0;
    },*/
    particleOff: function () {
        this.$container.off('click', this.mdcSwitch);
        for(let i = 0;i<this.particles.length;i++) {
            const angle = Math.random()*Math.PI*2;
            let rand = Math.random() + Math.random();
            rand = rand>1?(2-rand):rand;
            const dist = Math.random()*(this.RAND_DISTANCE_MAX-this.RAND_DISTANCE_MIN)*rand+this.RAND_DISTANCE_MIN;
            this.particles[i].setAxis(this.particles[i].r,this.particles[i].g,this.particles[i].b,Math.cos(angle) * dist,Math.sin(angle) * dist,-0.6);
        }
    },
    particleOn: function () {
        setTimeout(async () => {/*
            this.current = Math.floor(Math.random() * this.particleImagePaths.length)
            if(this.current === this.particleImagePaths.length) this.current = 0*/
            this.theta = 0;
            this.reachTop = false;

            this.particles = [];
            this.imgAlpha = []
            this.imgRed = []
            this.imgGreen = []
            this.imgBlue = []
            this.imgSize = []
            this.translationCount = 0
            await this.getImgAlpha();
            this.createParticles();
            this.$container.on('click', this.mdcSwitch);
        }, 1000);
    },
    mdcSwitch: function () {
        if(!this.onShow) return
        this.particleOff()
        this.particleOn()
    },
    drawFigure: function () {
        requestAnimationFrame(this.drawFigure);
/*
        this.mousevx += (this.mousex - this.mouse_poly.offsetLeft - this.mouse_poly.offsetWidth / 2) * this.MOUSE_SPRING;
        this.mousevy += (this.mousey - this.mouse_poly.offsetTop - this.mouse_poly.offsetHeight / 2) * this.MOUSE_SPRING;

        this.mousevx *= this.MOUSE_FRICTION;
        this.mousevy *= this.MOUSE_FRICTION;

        this.mouse_poly.style.left = this.mousevx + this.mouse_poly.offsetLeft + 'px';
        this.mouse_poly.style.top = this.mousevy + this.mouse_poly.offsetTop + 'px';

        this.mouse_center.style.left = this.mousex - this.mouse_center.offsetWidth/2 + 'px'
        this.mouse_center.style.top = this.mousey - this.mouse_center.offsetHeight/2 + 'px'*/

        this.context.clearRect(0, 0, this.width,this.height);

        for (let i = 0, length = this.particles.length; i < length; i++) {
            let axis = this.particles[i].getAxis2D(this.theta);
            this.context.globalAlpha = axis.opacity;
            this.context.beginPath();
            this.context.fillStyle = axis.color;
            this.context.arc(axis.x, axis.y, this.PARTICLE_RADIUS, 0, Math.PI * 2, false);
            this.context.fill();
        }
        this.theta+=1 * (this.reachTop===false?1:(-1));//r+theta=real R
        if(this.theta>=30) {
            this.reachTop = true
        }
        else if(this.theta<=-30) {
            this.reachTop = false
        }
        this.translationCount++;
        this.translationCount %= this.TRANSLATION_COUNT;
        if (this.translationCount === 0 && this.onShow) {
            this.mdcSwitch();
        }
    },
};
var PARTICLE = function (center,outerX,outerY) {
    this.center = center;
    this.init(outerX,outerY);
};
PARTICLE.prototype = {
    MAX_GAP: 200,
    MIN_GAP: 22,
    SPRING: 0.2,//切换速度
    FRICTION: 0.2,//切换震动频率
    SCALE: 1,
    COLOR: 'rgb(%r,%g,%b)',
    OPACITY_SPRING: 0.4,
    OPACITY_FRICTION: 0.1,

    init: function (outerX,outerY) {
        this.x = outerX;
        this.y = outerY;
        this.ox = 0;
        this.oy = 0;
        this.nextX = 0;
        this.nextY = 0;
        this.vx = 0;
        this.vy = 0;
        this.color;
        this.oopacity = 0;
        this.opacity = 0;
        this.vopacity = 0;
        this.nextopacity = 0;
    },
    setAxis: function (r,g,b,x,y,opacity) {
        this.ox = x;
        this.oy = y;
        this.oopacity = opacity;
        this.nextX = this.ox;
        this.nextY = -this.oy;
        this.nextopacity = this.oopacity;
        this.r = r;
        this.g = g;
        this.b = b;
    },
    getLimited: function () {//使x趋于nextX
        this.vx += (this.nextX - this.x) * this.SPRING;
        this.vy += (this.nextY - this.y) * this.SPRING;
        this.vopacity += (this.nextopacity - this.opacity) * this.OPACITY_SPRING;

        this.vx *= this.FRICTION;
        this.vy *= this.FRICTION;
        this.vopacity *= this.OPACITY_FRICTION;

        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.vopacity;

        return { x: this.x, y: this.y, opacity: this.opacity };
    },
    getAxis2D: function (theta) {
        let axis = this.getLimited();
        let color = this.COLOR
        color = color.replace("%r",this.r + theta + "")
        color = color.replace("%g",this.g + theta + "")
        color = color.replace("%b",this.b + theta + "")
        return { x: this.center.x + axis.x * this.SCALE, y: this.center.y - axis.y * this.SCALE, opacity:Math.max(axis.opacity,0), color};
    },
};