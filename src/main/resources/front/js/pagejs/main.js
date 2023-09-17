
var MAIN_RENDERER = {
    //switchesMousePri: false,
    //topButtonsMousePri: false,
    CPS:{
      clickCount:0,
      duration:1,
    },
    durTrans:false,
    mouseClick: true,
    CLICK_CHARACTER_SIZE : 60,
    mouseClickMusic: true,
    CLICK_NOTE_SIZE : 60,
    CLICK_NOTE_DIST : 100,
    HLInterval: 4000,//高光间隔时长
    curOnShow:'',
    settingShowMutex:true,
    BGMOn:true,
    live2dOn:true,
    mainRoom: {
        characterTimer: null,
        bookTimer: null,
        organTimer: null,
        quizTimer: null,
        onShow: false,
        showMutex : true,
        scale: 1.1,
        layerSizes:[
            {
                width:2054.4,
                height:1164.16,
                left:-67.2,
                top:-42.08,
            } ,

            {
                width: 394.83,
                height: 1164.16,
                left:1551,
                top:-42.08,
            },
            {
                width: 376.64,
                height: 1164.16,
                left:-24.64,
                top:-42.08,
            },

            {
                width: 753.28,
                height: 814.27,
                left:570,
                top:280,
            },

            {
                width: 287.83,
                height: 887.03,
                left:940,
                top:10,
            },
            {
                width: 199.02,
                height: 286.76,
                left:984.4,
                top:122,
            },

            {
                width:2054.4,
                height:1284,
                left:-67.2,
                top:-102,
            } ,
        ],
    },
    mouseEnter:{
        preSize:60,
        opacity:0.4,
        size:40,
        idList:[
            "quizStart",
            "quizResult",
            "quizNext",
            "bookPlay2",
            "bookPlay",
            "swiperGoLeft",
            "swiperGoRight",
            "searchIcon",
            "searchMicro",
            "toTop",
            "goBack",
            "settingConfirm",
            "characterArea",
            "bookArea",
            "quizArea",
            "organArea",
            "roomPart",
            "preload_startBtn",
            "searchCheck",
            "acupoint_char",
            "layer1_char",
            "layer2_char",
        ],
        classList:[
            "bookContent div",
            "bookContent video",
            "quizSubmit",
            "quizDiv",
            "switch",
            "switch img",
            "switch p",
            "topButton",
            "organ img",
            "organGlow img",
            "swiperPartP div",
            "swiperPartP div div",
            "quizDiv div",
            "quizDiv video",
            "LiBtn",
            "defaultSwitchAcvtived",
            "defaultSwitchDeacvtived",
            "lobbyButton",
            "swiperPart",
            "swiperGoBottom",
            "swiperGoTop",
            "quizChoiceRadio",
            "quizChoiceCheckbox",
        ],
    },
    BGimg:{
        BGimgEnable:true,
        BGimgCount:0,
        BGimgInterval: 200,
        BGimgLife: 10000,
        BGimgWidth:2120,
        BGimgHeight:1440,
        maxAngle:20,
    },
    selection:{
        bookSelected: false,
        characterSelected: false,
        organSelected: false,
        quizSelected: false,
    },
    MOUSE_FRICTION: 0.4,//越小差错越大 (<1)
    MOUSE_SPRING: 0.2,//越大趋近地越快 弹得越快
    partSize: 1080,
    partGap: 320,
    lobby:{
        onShow: false,
        roomLinesTimer: null,
        showMutex: true,
        lobbyFontSize: 35,
        lobbyCharacterSpacing:10,
        lobbyLineSpacing:15,
        lobbyShowInterval: 40,//ms
        lobbyString:{
            showMutex: true,
            onShow:'',
            target:[
                '',
            ],
            intro:[
                '这是一个关于李时珍和他的著作',
                '《本草纲目》的简介网站',
                '附带有简单的内脏图解',
                '和简单的答题系统',
            ],
            aboutUs:[
                '计设冲冲冲',
                'BY',
                '杨径骁,杨镇豪,黄展屹,王 森',
            ],
            references:[/*
                '《中医基础理论》',*/
                '《食疗本草》',
                '《本草纲目》',
                'BGM:《未闻花名》',
                '  by 东韵Dongyun',
            ],
        },
        lobbyCharacterCount: 0,
    },
    character:{
        onShow:false,
    },
    organ:{
        onShow:false,
    },
    quiz:{
        onShow:false,
    },
    //switchesAndButtonsShow: false,
    init: function () {
        this.mouseParameters();
        this.reconstructMethod();
        this.bindEvent();
        //this.setHoverListeners();
        /*
        this.lobbyCharacterShow();
        this.bookClicked();*/
        this.drawMouseImage();
        this.BGimgTimer();
        //this.lazyLoader();
        this.mouseEventBind();
        this.settingBGM()
        this.settingImg()
        this.settingMouse()
        this.settingNote()
        this.settingLive2d()
        const scene = document.getElementById('mainRoom');
        const parallaxInstance = new Parallax(scene, {
            relativeInput: true,
            pointerEvents: true,
            selector: '.roomLayer',
            limitX: 100,
            limitY: 60,
        });
    },
    reconstructMethod: function () {//让函数的this变为外层的this
        this.switchBookClicked = this.switchBookClicked.bind(this);
        this.switchCharacterClicked = this.switchCharacterClicked.bind(this);
        this.switchOrganClicked = this.switchOrganClicked.bind(this);
        this.switchQuizClicked = this.switchQuizClicked.bind(this);/*
        this.setHoverListeners = this.setHoverListeners.bind(this);
        this.switchBookHover = this.switchBookHover.bind(this);
        this.switchCharacterHover = this.switchCharacterHover.bind(this);
        this.switchOrganHover = this.switchOrganHover.bind(this);
        this.switchQuizHover = this.switchQuizHover.bind(this);
        this.switchBookUnhover = this.switchBookUnhover.bind(this);
        this.switchCharacterUnhover = this.switchCharacterUnhover.bind(this);
        this.switchOrganUnhover = this.switchOrganUnhover.bind(this);
        this.switchQuizUnhover = this.switchQuizUnhover.bind(this);*/
        this.toTopClicked = this.toTopClicked.bind(this);
        this.lobbyCharacterShow = this.lobbyCharacterShow.bind(this);
        this.lobbyCharacterUnshow = this.lobbyCharacterUnshow.bind(this);
        //this.lazyLoader = this.lazyLoader.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseFadingString = this.mouseFadingString.bind(this);
        this.mouseFadingNote = this.mouseFadingNote.bind(this);
        this.drawMouseImage = this.drawMouseImage.bind(this);
        this.mouseClickToggle = this.mouseClickToggle.bind(this);
        this.BGimgToggle = this.BGimgToggle.bind(this);
        this.BGimgTimer = this.BGimgTimer.bind(this);
        this.generateNewImg = this.generateNewImg.bind(this);
        this.webIntroClicked = this.webIntroClicked.bind(this);
        this.aboutUsClicked = this.aboutUsClicked.bind(this);
        this.referencesClicked = this.referencesClicked.bind(this);
        this.mouseEnterSpecial = this.mouseEnterSpecial.bind(this);
        this.mouseLeaveSpecial = this.mouseLeaveSpecial.bind(this);
        this.startButtonClicked = this.startButtonClicked.bind(this);
        this.roomPartClicked = this.roomPartClicked.bind(this);
        this.mainRoomInit = this.mainRoomInit.bind(this);
        this.mainRoomUnload = this.mainRoomUnload.bind(this);
        this.lobbyInit = this.lobbyInit.bind(this);
        this.lobbyUnload = this.lobbyUnload.bind(this);
        this.goBack = this.goBack.bind(this);
        this.settingInit = this.settingInit.bind(this);
        this.settingUnload = this.settingUnload.bind(this);
        this.settingImg = this.settingImg.bind(this);
        this.settingMouse = this.settingMouse.bind(this);
        this.settingBGM = this.settingBGM.bind(this);
        this.settingNote = this.settingNote.bind(this);
        this.settingLive2d = this.settingLive2d.bind(this);
        this.characterAreaClicked = this.characterAreaClicked.bind(this);
        this.bookAreaClicked = this.bookAreaClicked.bind(this);
        this.quizAreaClicked = this.quizAreaClicked.bind(this);
        this.organAreaClicked = this.organAreaClicked.bind(this);
        this.getCPS = this.getCPS.bind(this);
    },
    bindEvent: function () {
        //$(window).on('scroll', this.switchesScrollListener);
        //$(window).on('scroll', this.topButtonsScrollListener);
        $(window).on('scroll', this.BGimgDivScrollListener);
        //$(window).on('scroll', this.lazyLoader);
        $("#switchBook").on('click', this.switchBookClicked);
        $("#switchCharacter").on('click', this.switchCharacterClicked);
        $("#switchOrgan").on('click', this.switchOrganClicked);
        $("#switchQuiz").on('click', this.switchQuizClicked);
        $("#toTop").on('click', this.toTopClicked);
        $(window).on('mousemove', this.mouseMove);
        $(window).on('click', this.mouseFadingString);
        $(window).on('click', this.mouseFadingNote);
        $('#toggleClick').on('click', this.mouseClickToggle);
        $('#toggleBGMove').on('click', this.BGimgToggle);
        $('#webInfo').on('click', this.webIntroClicked);
        $('#aboutUs').on('click', this.aboutUsClicked);
        $('#references').on('click', this.referencesClicked);
        $('#preload_startBtn').on('click',this.startButtonClicked)
        $(window).on('keydown',this.goBack)
        $('#settings').on('click',this.settingInit)
        $('#settingConfirm').on('click',this.settingUnload)
        $('#musicToggle').on('click',this.settingBGM)
        $('#clickCharacterToggle').on('click',this.settingMouse)
        $('#imgParallel').on('click',this.settingImg)
        $('#noteToggle').on('click',this.settingNote)
        $('#live2dToggle').on('click',this.settingLive2d)
        $('#goBack').on('click',this.goBack)
        $('#roomPart').on('click',this.roomPartClicked)
        $("#goBack").hover(this.goBackHover,null);
        $('#bookArea').on('click',this.bookAreaClicked)
        $('#characterArea').on('click',this.characterAreaClicked)
        $('#quizArea').on('click',this.quizAreaClicked)
        $('#organArea').on('click',this.organAreaClicked)
        $(window).on('click', this.getCPS);
    },
    goBack: async function (event) {//hzyToBeImproved 可以改用栈
        if(this.durTrans) return
        if(event.keyCode === 27 || event.target.id === "goBack" || event.target.id === "goBackCircle"|| event.target.id === "goBackArrow") {
            this.mouseEventBind()
            switch(this.curOnShow) {
                case "setting":{
                    this.settingUnload()
                    break;
                }
                case "mainRoom":{
                    this.mainRoomUnload()
                    setTimeout(()=>{
                        this.lobbyInit()
                    },100)
                    break;
                }
                case "lobby":{
                    break;
                }
                case "character":{
                    this.characterPartUnload()
                    setTimeout(()=>{
                        this.mainRoomInit()
                    },100)
                    break;
                }
                case "book":{
                    this.bookPartUnload()
                    setTimeout(()=>{
                        this.mainRoomInit()
                    },100)
                    break;
                }
                case "organ":{
                    this.organPartUnload()
                    setTimeout(()=>{
                        this.mainRoomInit()
                    },100)
                    break;
                }
                case "quiz":{
                    this.quizPartUnload()
                    setTimeout(()=>{
                        this.mainRoomInit()
                    },100)
                    break;
                }
                default :{
                    break;
                }
            }
        }
    },/*逝去的懒加载方法
    lazyLoader: async function () {
        const scrollY = window.scrollY;

        this.switchesAndButtonsShow = scrollY <= 300;

        if (scrollY > this.partSize) {
            this.lobby.onShow = false;
            if (PARTICLE_RENDERER2.onShow) {
                PARTICLE_RENDERER2.particleOff()
                PARTICLE_RENDERER2.onShow = false
            }
            $("#lobbyString").empty();
            $("#lobby").hide();
        } else if (!this.lobby.onShow) {
            this.lobby.onShow = true;
            if (!PARTICLE_RENDERER2.onShow) {
                PARTICLE_RENDERER2.particleOn()
                PARTICLE_RENDERER2.onShow = true
            }
            $("#lobby").show();
            this.lobbyCharacterShow();
        }


        if (scrollY < this.partGap || scrollY > this.partGap + this.partSize * 2) {

            BOOK_RENDERER.onShow = false
            BOOK_RENDERER.searchEnable = false
            $('#searchInput').css({
                'width':'0',
                'borderBottomWidth':'0',
            })
            setTimeout(()=>{
                $('#searchInput').hide()
            },300)

            $('#bookString').empty()
            BOOK_RENDERER.book.characterCount = 0
            BOOK_RENDERER.book.playType = -1
            $("#bookPlay").attr({
                'src': '',
            })
            $("#bookPlay2").attr({
                'src': '',
            })
            $('#swiperContent').empty()
            BOOK_RENDERER.currentId = []
            $("#book").hide();
            $("#switchBook").css({
                "filter": 'drop-shadow(7px 7px 3px #5e5227)',
                "transform": 'translateX('+ 0 + 'px)',
            });
        } else if (!BOOK_RENDERER.onShow) {
            this.mouseEventBind()
            BOOK_RENDERER.onShow = true
            BOOK_RENDERER.bookClicked(null,false)
            $("#book").show();
            BOOK_RENDERER.book.onShow = true;
            await sleep(150)
            await BOOK_RENDERER.arrowClicked(null, true)
            await sleep(150)
            await BOOK_RENDERER.arrowClicked(null, true)
            await sleep(150)
            await BOOK_RENDERER.arrowClicked(null, true)
        }

        if (scrollY < this.partGap * 2 + this.partSize || scrollY > this.partGap * 2 + this.partSize * 3) {
            CHARACTER_RENDERER.onShow = false;
            $('#LiCharacters').empty()
            CHARACTER_RENDERER.characterEvents.textAnimation.textCount = 0
            CHARACTER_RENDERER.characterEvents.onshow = ''
            $("#character").hide();
            $("#switchCharacter").css({
                "filter": 'drop-shadow(7px 7px 3px #5e5227)',
                "transform": 'translateX('+ 0 + 'px)',
            });
        } else if (!CHARACTER_RENDERER.onShow) {
            this.mouseEventBind()
            CHARACTER_RENDERER.onShow = true;
            $('#LiPics').empty()
            CHARACTER_RENDERER.LiLabelClicked(null,'defaultC')
            $("#character").show();
        }

        if (scrollY < this.partGap * 3 + this.partSize * 2 || scrollY > this.partGap * 3 + this.partSize * 4) {
            ORGAN_RENDERER.onShow = false;
            $('#bodyText').empty()
            $('#organText').empty()
            $("#organ").hide();
            $('#organs').empty()
            $("#switchOrgan").css({
                "filter": 'drop-shadow(7px 7px 3px #5e5227)',
                "transform": 'translateX('+ 0 + 'px)',
            });
        } else if (!ORGAN_RENDERER.onShow) {
            ORGAN_RENDERER.onShow = true;
            ORGAN_RENDERER.bodyCharacterShow(ORGAN_RENDERER.body.text)
            ORGAN_RENDERER.organHintTwinkle()
            this.mouseEventBind()
            await ORGAN_RENDERER.organInit();
            await ORGAN_RENDERER.bodyInit();
            $("#organ").show();
        }

        if (scrollY < this.partGap * 4 + this.partSize * 3) {
            QUIZ_RENDERER.onShow = false;
            $('#quizText').empty()
            $('#quizFeedback').text('')
            $('#quizResult').text('')
            $('#quizNext').hide()
            $('#quizTable').hide()
            $("#quiz").hide();
            QUIZ_RENDERER.isCorrect=-1
            QUIZ_RENDERER.choice.ASelected = false
            QUIZ_RENDERER.choice.BSelected = false
            QUIZ_RENDERER.choice.CSelected = false
            QUIZ_RENDERER.choice.DSelected = false
            $("#switchQuiz").css({
                "filter": 'drop-shadow(7px 7px 3px #5e5227)',
                "transform": 'translateX('+ 0 + 'px)',
            });
        } else if (!QUIZ_RENDERER.onShow) {
            this.mouseEventBind()
            QUIZ_RENDERER.onShow = true;
            QUIZ_RENDERER.isReady = false
            $('#quizStartPart').css({
                'opacity':'1',
            })
            $('#quizStartPart').show()
            $("#quiz").show();
        }

    },*/
    mouseEventBind: function () {
        for (let i = 0; i < this.mouseEnter.idList.length; i++) {
            $('#'+this.mouseEnter.idList[i]).on("mouseenter",this.mouseEnterSpecial)
        }
        for (let i = 0; i < this.mouseEnter.classList.length; i++) {
            $('.'+this.mouseEnter.classList[i]).on("mouseenter",this.mouseEnterSpecial)
        }
        for (let i = 0; i < this.mouseEnter.idList.length; i++) {
            $('#'+this.mouseEnter.idList[i]).on("mouseleave",this.mouseLeaveSpecial)
        }
        for (let i = 0; i < this.mouseEnter.classList.length; i++) {
            $('.'+this.mouseEnter.classList[i]).on("mouseleave",this.mouseLeaveSpecial)
        }
    },
    mouseEnterSpecial: function () {
        $('#mouse-center').stop()
        //$('#mouse-fill img').stop()
        $('#mouse-poly img').stop()/*
        $('#mouse-center').animate({
            'width':this.mouseEnter.size+'px',
            'height':this.mouseEnter.size+'px',
        },200)
        $('#mouse-poly').animate({
            'width':this.mouseEnter.size+'px',
            'height':this.mouseEnter.size+'px',
        },200)
        $('#mouse-fill').animate({
            'opacity':this.mouseEnter.opacity,
            'width':this.mouseEnter.size+'px',
            'height':this.mouseEnter.size+'px',
        },200)*/
        $('#mouse-poly img').css({
            'transform':'rotate(180deg)',
        })
        $('#mouse-center img').css({
            'transform':'rotate(180deg)',
        })
    },
    mouseLeaveSpecial: function () {
        $('#mouse-center').stop()
        //$('#mouse-fill img').stop()
        $('#mouse-poly img').stop()/*
        $('#mouse-center').animate({
            'width':this.mouseEnter.preSize+'px',
            'height':this.mouseEnter.preSize+'px',
        },200)
        $('#mouse-poly').animate({
            'width':this.mouseEnter.preSize+'px',
            'height':this.mouseEnter.preSize+'px',
        },200)
        $('#mouse-fill').animate({
            'opacity':0,
            'width':this.mouseEnter.preSize+'px',
            'height':this.mouseEnter.preSize+'px',
        },200)*/
        $('#mouse-poly img').css({
            'transform':'rotate(0deg)',
        })
        $('#mouse-center img').css({
            'transform':'rotate(0deg)',
        })
    },
    mouseParameters: function () {
        this.mouse_poly = document.getElementById("mouse-poly")
        this.mouse_center = document.getElementById("mouse-center")
        //this.mouse_fill = document.getElementById("mouse-fill")
        this.mousevx = 0;
        this.mousevy = 0;
        this.mousex = 0;
        this.mousey = 0;
    },
    mouseMove: function (event) {
        const mouseX = event.clientX
        const mouseY = event.clientY
        const scrollX = window.scrollX
        const scrollY = window.scrollY
        this.mousex = mouseX;
        this.mousey = mouseY;
        $('#BGtxt').css({
            'backgroundPosition': Math.min((mouseX + scrollX - 100),2560) +'px ' + Math.min((mouseY + scrollY - 100),4000) + 'px',
        })/*
        if(!this.switchesAndButtonsShow) {
            if(mouseX<150) {
                this.switchesMousePri = true
                $('#switche').css({
                    'transform': 'translateX(0px)'
                })
            } else if(mouseX>350 && this.switchesMousePri) {
                this.switchesMousePri = false
                $('#switche').css({
                    'transform': 'translateX(-350px)'
                })
            }
            if(mouseY<100) {
                this.topButtonsMousePri = true
                $('#topButtonsC').css({
                    'transform': 'translateY(0px)'
                })
            } else if(mouseY>150 && this.topButtonsMousePri) {
                this.topButtonsMousePri = false
                $('#topButtonsC').css({
                    'transform': 'translateY(-150px)'
                })
            }
        }*/
        if(this.BGimg.BGimgEnable) {
            let deltaX = (mouseX - this.BGimg.BGimgWidth) / 10
            let deltaY = (mouseY - this.BGimg.BGimgHeight) / 10
            $('#BGimgsC').css({
                'transform': 'translateX(' + deltaX + 'px) translateY(' + Math.min(5847,deltaY) + 'px)',
            })
        }
    },
    drawMouseImage: function () {
        requestAnimationFrame(this.drawMouseImage);
        this.mousevx += (this.mousex - this.mouse_poly.offsetLeft - this.mouse_poly.offsetWidth / 2) * this.MOUSE_SPRING;
        this.mousevy += (this.mousey - this.mouse_poly.offsetTop - this.mouse_poly.offsetHeight / 2) * this.MOUSE_SPRING;

        this.mousevx *= this.MOUSE_FRICTION;
        this.mousevy *= this.MOUSE_FRICTION;

        this.mouse_poly.style.left = this.mousevx + this.mouse_poly.offsetLeft + 'px';
        this.mouse_poly.style.top = this.mousevy + this.mouse_poly.offsetTop + 'px';

        //this.mouse_fill.style.left = this.mousevx + this.mouse_fill.offsetLeft + 'px';
        //this.mouse_fill.style.top = this.mousevy + this.mouse_fill.offsetTop + 'px';

        this.mouse_center.style.left = this.mousex - this.mouse_center.offsetWidth/2 + 'px'
        this.mouse_center.style.top = this.mousey - this.mouse_center.offsetHeight/2 + 'px'

    },
    BGimgDivScrollListener: function () {
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        $('#BGimgs').css({
            'transform':'translateX(' + scrollX + 'px) translateY(' + Math.min(5847,scrollY) + 'px)',
        })
    },
    BGimgTimer: function () {
        requestAnimationFrame(this.BGimgTimer);
        this.BGimg.BGimgCount++;
        if(this.BGimg.BGimgCount>=this.BGimg.BGimgInterval) {
            this.BGimg.BGimgCount = 0;
            if(this.BGimg.BGimgEnable) {
                this.generateNewImg()
            }
        }
    },
    generateNewImg: async function () {
        let picName;
        let params = null
        await getRandomIngredientPic(params).then(res => {
            if (res.code === 1) {
                picName = res.data.picName
            } else {
                console.log(res.msg || '操作失败')
            }
        }).catch(err => {
            console.log('请求出错了：' + err)
        });
        const img = $('<img crossorigin="anonymous" alt="BGimg">')
        img.attr({
            'id':'BGimg'+picName,
            'src':'./images/mdc/swiper/'+picName,
        })
        img.css({
            'position':'absolute',
            'display':'none',
            'width':'100px',
            'height':'auto',
            'left':Math.random()*this.BGimg.BGimgWidth+'px',
            'top':Math.random()*this.BGimg.BGimgHeight+'px',
            'transform':'rotate('+ (Math.random()*2-1)*this.BGimg.maxAngle +'deg)',
        })
        $('#BGimgsC').append(img)
        img.fadeIn(this.BGimg.BGimgLife/4)
        setTimeout(()=>{
            img.fadeOut(this.BGimg.BGimgLife/4)
        },3*this.BGimg.BGimgLife/4)
        setTimeout(()=>{
            img.remove()
        },this.BGimg.BGimgLife)
    },
    startButtonClicked: async function (e) {
        $('#goBack').fadeIn(500)
        $('#preloadPart').fadeOut(500)
        $('#preload_startBtn').off('click',this.startButtonClicked)
        if(this.BGMOn) {
            document.getElementById('bgm').currentTime = 0
            document.getElementById('bgm').play()
        }
        setTimeout(()=>{
            this.lobbyInit()
        },100)
    },
    roomPartClicked: async function () {
        this.lobbyUnload()
        setTimeout(()=>{
            this.mainRoomInit()
        },100)
    },
    characterAreaClicked: async function () {
        this.mainRoomUnload()
        setTimeout(()=>{
            this.characterPartInit()
        },100)
    },
    bookAreaClicked: async function () {
        this.mainRoomUnload()
        setTimeout(()=>{
            this.bookPartInit()
        },100)
    },
    organAreaClicked: async function () {
        this.mainRoomUnload()
        setTimeout(()=>{
            this.organPartInit()
        },100)
    },
    quizAreaClicked: async function () {
        this.mainRoomUnload()
        setTimeout(()=>{
            this.quizPartInit()
        },100)
    },
    settingInit: async function () {//hzyToBeImproved
        if(this.durTrans) return
        if(this.curOnShow==='setting'||!this.settingShowMutex) return
        this.settingShowMutex = false
        this.durTrans = true
        $('#particles2').fadeOut(500)
        $('#lobby').fadeOut(500)
        if(this.BGimg.BGimgEnable) {
            $('#imgParallel').text('开')
            $('#imgParallel').removeClass('defaultSwitchDeacvtived')
            $('#imgParallel').addClass('defaultSwitchAcvtived')
        } else {
            $('#imgParallel').text('关')
            $('#imgParallel').removeClass('defaultSwitchAcvtived')
            $('#imgParallel').addClass('defaultSwitchDeacvtived')
        }
        if(this.mouseClick) {
            $('#clickCharacterToggle').text('开')
            $('#clickCharacterToggle').removeClass('defaultSwitchDeacvtived')
            $('#clickCharacterToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#clickCharacterToggle').text('关')
            $('#clickCharacterToggle').removeClass('defaultSwitchAcvtived')
            $('#clickCharacterToggle').addClass('defaultSwitchDeacvtived')
        }
        if(this.BGMOn) {
            $('#musicToggle').text('开')
            $('#musicToggle').removeClass('defaultSwitchDeacvtived')
            $('#musicToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#musicToggle').text('关')
            $('#musicToggle').removeClass('defaultSwitchAcvtived')
            $('#musicToggle').addClass('defaultSwitchDeacvtived')
        }
        if(this.mouseClickMusic) {
            $('#noteToggle').text('开')
            $('#noteToggle').removeClass('defaultSwitchDeacvtived')
            $('#noteToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#noteToggle').text('关')
            $('#noteToggle').removeClass('defaultSwitchAcvtived')
            $('#noteToggle').addClass('defaultSwitchDeacvtived')
        }
        if(this.live2dOn) {
            $('#live2dToggle').text('开')
            $('#live2dToggle').removeClass('defaultSwitchDeacvtived')
            $('#live2dToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#live2dToggle').text('关')
            $('#live2dToggle').removeClass('defaultSwitchAcvtived')
            $('#live2dToggle').addClass('defaultSwitchDeacvtived')
        }
        $('#settingMenu').fadeIn(500)
        await sleep(500)
        this.curOnShow = 'setting'
        this.durTrans = false
        this.settingShowMutex = true
    },
    settingUnload: async function () {
        if(this.curOnShow!=='setting'||!this.settingShowMutex) return
        this.settingShowMutex = false
        $('#settingMenu').fadeOut(500)
        $('#particles2').fadeIn(500)
        $('#lobby').fadeIn(500)
        await sleep(500)
        this.curOnShow = 'lobby'
        this.settingShowMutex = true
    },
    settingLive2d: function (event) {
        if(event!==undefined&&event!==null)
            this.live2dOn = !this.live2dOn
        if(this.live2dOn) {
            $('#live2d').show()
            $('#live2dToggle').text('开')
            $('#live2dToggle').removeClass('defaultSwitchDeacvtived')
            $('#live2dToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#live2d').hide()
            $('#live2dToggle').text('关')
            $('#live2dToggle').removeClass('defaultSwitchAcvtived')
            $('#live2dToggle').addClass('defaultSwitchDeacvtived')
        }
    },
    settingImg: function (event) {
        if(event!==undefined&&event!==null)
        this.BGimg.BGimgEnable = !this.BGimg.BGimgEnable
        if(this.BGimg.BGimgEnable) {
            $('#imgParallel').text('开')
            $('#imgParallel').removeClass('defaultSwitchDeacvtived')
            $('#imgParallel').addClass('defaultSwitchAcvtived')
        } else {
            $('#imgParallel').text('关')
            $('#imgParallel').removeClass('defaultSwitchAcvtived')
            $('#imgParallel').addClass('defaultSwitchDeacvtived')
        }
    },
    settingMouse: function (event) {
        if(event!==undefined&&event!==null)
        this.mouseClick = !this.mouseClick
        if(this.mouseClick) {
            $('#clickCharacterToggle').text('开')
            $('#clickCharacterToggle').removeClass('defaultSwitchDeacvtived')
            $('#clickCharacterToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#clickCharacterToggle').text('关')
            $('#clickCharacterToggle').removeClass('defaultSwitchAcvtived')
            $('#clickCharacterToggle').addClass('defaultSwitchDeacvtived')
        }
    },
    settingBGM: function (event) {
        if(event!==undefined&&event!==null)
        this.BGMOn = !this.BGMOn
        if(this.BGMOn) {
            $('#bgm')[0].currentTime = 0
            $('#bgm')[0].play()
            $('#musicToggle').text('开')
            $('#musicToggle').removeClass('defaultSwitchDeacvtived')
            $('#musicToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#bgm')[0].currentTime = 0
            $('#bgm')[0].pause()
            $('#musicToggle').text('关')
            $('#musicToggle').removeClass('defaultSwitchAcvtived')
            $('#musicToggle').addClass('defaultSwitchDeacvtived')
        }
    },
    settingNote: function (event) {
        if(event!==undefined&&event!==null)
        this.mouseClickMusic = !this.mouseClickMusic
        if(this.mouseClickMusic) {
            $('#noteToggle').text('开')
            $('#noteToggle').removeClass('defaultSwitchDeacvtived')
            $('#noteToggle').addClass('defaultSwitchAcvtived')
        } else {
            $('#noteToggle').text('关')
            $('#noteToggle').removeClass('defaultSwitchAcvtived')
            $('#noteToggle').addClass('defaultSwitchDeacvtived')
        }
    },
    characterPartInit: async function () {
        if(this.durTrans) return
        if(CHARACTER_RENDERER.onShow||!CHARACTER_RENDERER.showMutex) return
        CHARACTER_RENDERER.onShow = true;
        CHARACTER_RENDERER.showMutex = false
        this.durTrans = true
        $('#LiPics').empty()
        $("#character").fadeIn();
        await CHARACTER_RENDERER.LiLabelClicked(null,'defaultC')
        this.durTrans = false
        CHARACTER_RENDERER.showMutex = true
        this.curOnShow = "character"
    },
    characterPartUnload: async function () {
        if(!CHARACTER_RENDERER.onShow||!CHARACTER_RENDERER.showMutex) return
        CHARACTER_RENDERER.onShow = false;
        CHARACTER_RENDERER.showMutex = false
        CHARACTER_RENDERER.characterEvents.textAnimation.textCount = 0
        CHARACTER_RENDERER.characterEvents.onshow = ''
        $("#character").fadeOut();
        $("#switchCharacter").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        await sleep(500)
        $('#LiCharacters').empty()
        CHARACTER_RENDERER.showMutex = true
    },
    bookPartInit: async function () {
        if(this.durTrans) return
        if(BOOK_RENDERER.onShow||!BOOK_RENDERER.showMutex) return
        BOOK_RENDERER.onShow = true;
        BOOK_RENDERER.showMutex = false
        this.durTrans = true
        BOOK_RENDERER.bookClicked(null,false)
        $("#book").show();
        BOOK_RENDERER.book.onShow = true;
        await sleep(150)
        await BOOK_RENDERER.arrowClicked(null, true)
        await sleep(150)
        await BOOK_RENDERER.arrowClicked(null, true)
        await sleep(150)
        await BOOK_RENDERER.arrowClicked(null, true)
        this.durTrans = false
        BOOK_RENDERER.showMutex = true
        this.curOnShow = "book"
    },
    bookPartUnload: async function () {
        if(!BOOK_RENDERER.onShow||!BOOK_RENDERER.showMutex) return
        BOOK_RENDERER.onShow = false;
        BOOK_RENDERER.showMutex = false
        BOOK_RENDERER.book.onShow = false;
        $('#searchInput').fadeOut()
        $("#book").fadeOut();
        await sleep(800)
        BOOK_RENDERER.searchEnable = false
        $('#searchInput').css({
            'width':'0',
            'borderBottomWidth':'0',
        })

        $('#bookString').empty()
        BOOK_RENDERER.book.characterCount = 0
        BOOK_RENDERER.book.playType = -1
        $("#bookPlay").attr({
            'src': '',
        })
        $("#bookPlay2").attr({
            'src': '',
        })
        $('#swiperContent').empty()
        BOOK_RENDERER.currentId = []
        $("#switchBook").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        BOOK_RENDERER.showMutex = true
    },
    organPartInit: async function () {
        if(this.durTrans) return
        if(ORGAN_RENDERER.onShow||!ORGAN_RENDERER.showMutex) return
        ORGAN_RENDERER.onShow = true;
        ORGAN_RENDERER.showMutex = false
        this.durTrans = true
        $("#organ").fadeIn();
        ORGAN_RENDERER.organHintTwinkle()
        ORGAN_RENDERER.organSizeInit()
        await ORGAN_RENDERER.organDblClicked(null, true)
        this.durTrans = false
        ORGAN_RENDERER.showMutex = true
        this.curOnShow = "organ"
    },
    organPartUnload: async function () {
        if(!ORGAN_RENDERER.onShow||!ORGAN_RENDERER.showMutex) return
        ORGAN_RENDERER.onShow = false;
        ORGAN_RENDERER.showMutex = false
        $('#bodyText').fadeOut()
        $('#organText').fadeOut()
        $("#organ").fadeOut()
        await sleep(1000)
        $('#organs').empty()
        $("#switchOrgan").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        ORGAN_RENDERER.showMutex = true
    },
    quizPartInit: async function () {
        if(this.durTrans) return
        if(QUIZ_RENDERER.onShow||!QUIZ_RENDERER.showMutex) return
        QUIZ_RENDERER.onShow = true;
        QUIZ_RENDERER.showMutex = false
        this.durTrans = true
        QUIZ_RENDERER.isReady = false
        QUIZ_RENDERER.getStarted()
        //$('#quizStartPart').fadeIn(500)
        $("#quiz").fadeIn()
        this.durTrans = false
        QUIZ_RENDERER.showMutex = true
        this.curOnShow = "quiz"
    },
    quizPartUnload: async function () {
        if(!QUIZ_RENDERER.onShow||!QUIZ_RENDERER.showMutex) return
        QUIZ_RENDERER.onShow = false;
        QUIZ_RENDERER.showMutex = false
        $('#quizNext').fadeOut()
        $('#quizTable').fadeOut()
        $("#quiz").fadeOut();
        await sleep(1000)
        $('#quizText').empty()
        $('#quizFeedback').text('')
        $('#quizResult').text('')
        QUIZ_RENDERER.isCorrect=-1
        QUIZ_RENDERER.choice.ASelected = false
        QUIZ_RENDERER.choice.BSelected = false
        QUIZ_RENDERER.choice.CSelected = false
        QUIZ_RENDERER.choice.DSelected = false
        $("#switchQuiz").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        QUIZ_RENDERER.showMutex = true
    },
    mainRoomInit: function () {
        if(this.durTrans) return
        if(this.mainRoom.onShow||!this.mainRoom.showMutex) return
        this.mainRoom.onShow = true
        this.mainRoom.showMutex = false
        this.durTrans = true
        $('#mainRoom').show()
        for (let i = 0; i < this.mainRoom.layerSizes.length; i++) {
            setTimeout(()=>{
                switch (i) {
                    case 1:{
                        $('#bookArea').fadeIn(500)
                        $('#quizArea').fadeIn(500)
                        break
                    }
                    case 2:{
                        $('#characterArea').fadeIn(500)
                        break
                    }
                    case 3:{
                        $('#organArea').fadeIn(500)
                        break
                    }
                }
                switch (i) {
                    case 4:{
                        $('#layerImg5').animate({
                            'width': this.mainRoom.layerSizes[6].width+'px',
                            'height': this.mainRoom.layerSizes[6].height+'px',
                            'left': this.mainRoom.layerSizes[6].left+'px',
                            'top': this.mainRoom.layerSizes[6].top+'px',
                        },500)
                        break
                    }
                    case 3: {
                        $('#layerImg4').animate({
                            'width': this.mainRoom.layerSizes[4].width+'px',
                            'height': this.mainRoom.layerSizes[4].height+'px',
                            'left': this.mainRoom.layerSizes[4].left+'px',
                            'top': this.mainRoom.layerSizes[4].top+'px',
                        },500)
                        $('#layerImgOrgan').animate({
                            'width': this.mainRoom.layerSizes[5].width+'px',
                            'height': this.mainRoom.layerSizes[5].height+'px',
                            'left': this.mainRoom.layerSizes[5].left+'px',
                            'top': this.mainRoom.layerSizes[5].top+'px',
                        },500)
                        $('#organHL').animate({
                            'width': this.mainRoom.layerSizes[5].width+'px',
                            'height': this.mainRoom.layerSizes[5].height+'px',
                            'left': this.mainRoom.layerSizes[5].left+'px',
                            'top': this.mainRoom.layerSizes[5].top+'px',
                        },500)
                        break
                    }
                    case 2: {
                        $('#layerImgCharacter').animate({
                            'width': this.mainRoom.layerSizes[3].width+'px',
                            'height': this.mainRoom.layerSizes[3].height+'px',
                            'left': this.mainRoom.layerSizes[3].left+'px',
                            'top': this.mainRoom.layerSizes[3].top+'px',
                        },500)
                        $('#characterHL').animate({
                            'width': this.mainRoom.layerSizes[3].width+'px',
                            'height': this.mainRoom.layerSizes[3].height+'px',
                            'left': this.mainRoom.layerSizes[3].left+'px',
                            'top': this.mainRoom.layerSizes[3].top+'px',
                        },500)
                        break
                    }
                    case 1: {
                        $('#layerImgBook').animate({
                            'width': this.mainRoom.layerSizes[1].width+'px',
                            'height': this.mainRoom.layerSizes[1].height+'px',
                            'left': this.mainRoom.layerSizes[1].left+'px',
                            'top': this.mainRoom.layerSizes[1].top+'px',
                        },500)
                        $('#layerImgQuiz').animate({
                            'width': this.mainRoom.layerSizes[2].width+'px',
                            'height': this.mainRoom.layerSizes[2].height+'px',
                            'left': this.mainRoom.layerSizes[2].left+'px',
                            'top': this.mainRoom.layerSizes[2].top+'px',
                        },500)
                        $('#bookHL').animate({
                            'width': this.mainRoom.layerSizes[1].width+'px',
                            'height': this.mainRoom.layerSizes[1].height+'px',
                            'left': this.mainRoom.layerSizes[1].left+'px',
                            'top': this.mainRoom.layerSizes[1].top+'px',
                        },500)
                        $('#quizHL').animate({
                            'width': this.mainRoom.layerSizes[2].width+'px',
                            'height': this.mainRoom.layerSizes[2].height+'px',
                            'left': this.mainRoom.layerSizes[2].left+'px',
                            'top': this.mainRoom.layerSizes[2].top+'px',
                        },500)
                        break
                    }
                    case 0:{
                        $('#layerImg1').animate({
                            'width': this.mainRoom.layerSizes[0].width+'px',
                            'height': this.mainRoom.layerSizes[0].height+'px',
                            'left': this.mainRoom.layerSizes[0].left+'px',
                            'top': this.mainRoom.layerSizes[0].top+'px',
                        },500)
                        break
                    }
                }
                $('#roomLayer'+(i+1)).fadeIn(500)
                $('#roomLayer'+(i+1)).animate({
                    'opacity':'1',
                },500)
            },50*i)
        }
        setTimeout(()=>{
            this.mainRoom.bookTimer = window.setInterval(()=>{
                document.getElementById('bookHL').currentTime = 0
                document.getElementById('bookHL').play()
            },this.HLInterval)
            this.mainRoom.characterTimer = window.setInterval(()=>{
                document.getElementById('characterHL').currentTime = 0
                document.getElementById('characterHL').play()
            },this.HLInterval)
            this.mainRoom.quizTimer = window.setInterval(()=>{
                document.getElementById('quizHL').currentTime = 0
                document.getElementById('quizHL').play()
            },this.HLInterval)
            this.mainRoom.organTimer = window.setInterval(()=>{
                document.getElementById('organHL').currentTime = 0
                document.getElementById('organHL').play()
            },this.HLInterval)
            $('#characterArea').on('click',this.characterAreaClicked)
            $('#bookArea').on('click',this.bookAreaClicked)
            $('#quizArea').on('click',this.quizAreaClicked)
            $('#organArea').on('click',this.organAreaClicked)
            this.durTrans = false
            this.mainRoom.showMutex = true
            this.curOnShow = "mainRoom"
        },1000)
    },
    mainRoomUnload: function () {
        if(!this.mainRoom.onShow||!this.mainRoom.showMutex) return
        this.mainRoom.onShow = false
        this.mainRoom.showMutex = false
        clearInterval(this.mainRoom.bookTimer)
        this.mainRoom.bookTimer = null
        clearInterval(this.mainRoom.characterTimer)
        this.mainRoom.characterTimer = null
        clearInterval(this.mainRoom.quizTimer)
        this.mainRoom.quizTimer = null
        clearInterval(this.mainRoom.organTimer)
        this.mainRoom.organTimer = null
        $('#characterArea').off('click',this.characterAreaClicked)
        $('#bookArea').off('click',this.bookAreaClicked)
        $('#quizArea').off('click',this.quizAreaClicked)
        $('#organArea').off('click',this.organAreaClicked)
        for (let i = this.mainRoom.layerSizes.length - 1; i >= 0; i--) {
            setTimeout(()=>{
                switch (i) {
                    case 1:{
                        $('#bookArea').fadeOut(500)
                        $('#quizArea').fadeOut(500)
                        break
                    }
                    case 2:{
                        $('#characterArea').fadeOut(500)
                        break
                    }
                    case 3:{
                        $('#organArea').fadeOut(500)
                        break
                    }
                }
                switch (i) {
                    case 4:{
                        $('#layerImg5').animate({
                            'width': this.mainRoom.layerSizes[6].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[6].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[6].left - this.mainRoom.layerSizes[6].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[6].top - this.mainRoom.layerSizes[6].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        break
                    }
                    case 3: {
                        $('#layerImg4').animate({
                            'width': this.mainRoom.layerSizes[4].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[4].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[4].left - this.mainRoom.layerSizes[4].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[4].top - this.mainRoom.layerSizes[4].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        $('#layerImgOrgan').animate({
                            'width': this.mainRoom.layerSizes[5].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[5].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[5].left - this.mainRoom.layerSizes[5].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[5].top - this.mainRoom.layerSizes[5].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        $('#organHL').animate({
                            'width': this.mainRoom.layerSizes[5].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[5].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[5].left - this.mainRoom.layerSizes[5].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[5].top - this.mainRoom.layerSizes[5].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        break
                    }
                    case 2: {
                        $('#layerImgCharacter').animate({
                            'width': this.mainRoom.layerSizes[3].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[3].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[3].left - this.mainRoom.layerSizes[3].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[3].top - this.mainRoom.layerSizes[3].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        $('#characterHL').animate({
                            'width': this.mainRoom.layerSizes[3].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[3].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[3].left - this.mainRoom.layerSizes[3].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[3].top - this.mainRoom.layerSizes[3].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        break
                    }
                    case 1: {
                        $('#layerImgBook').animate({
                            'width': this.mainRoom.layerSizes[1].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[1].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[1].left - this.mainRoom.layerSizes[1].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[1].top - this.mainRoom.layerSizes[1].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        $('#layerImgQuiz').animate({
                            'width': this.mainRoom.layerSizes[2].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[2].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[2].left - this.mainRoom.layerSizes[2].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[2].top - this.mainRoom.layerSizes[2].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        $('#bookHL').animate({
                            'width': this.mainRoom.layerSizes[1].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[1].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[1].left - this.mainRoom.layerSizes[1].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[1].top - this.mainRoom.layerSizes[1].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        $('#quizHL').animate({
                            'width': this.mainRoom.layerSizes[2].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[2].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[2].left - this.mainRoom.layerSizes[2].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[2].top - this.mainRoom.layerSizes[2].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        break
                    }
                    case 0:{
                        $('#layerImg1').animate({
                            'width': this.mainRoom.layerSizes[0].width * this.mainRoom.scale+'px',
                            'height': this.mainRoom.layerSizes[0].height * this.mainRoom.scale+'px',
                            'left': this.mainRoom.layerSizes[0].left - this.mainRoom.layerSizes[0].width * (this.mainRoom.scale-1)/2+'px',
                            'top': this.mainRoom.layerSizes[0].top - this.mainRoom.layerSizes[0].height * (this.mainRoom.scale-1)/2+'px',
                        },500)
                        break
                    }
                }
                $('#roomLayer'+(i+1)).fadeOut(500)
                $('#roomLayer'+(i+1)).animate({
                    'opacity':'0',
                },500)
            },50*i)
        }
        setTimeout(()=>{
            $('#mainRoom').hide()
            this.mainRoom.showMutex = true
        },1000)
    },
    lobbyInit: async function () {
        if(this.durTrans) return
        if(this.lobby.onShow||!this.lobby.showMutex) return
        this.lobby.showMutex = false
        this.lobby.onShow = true;
        this.durTrans = true
        $('#particles2').show()
        $('#lobby').fadeIn(500)
        $('#lobby').css({
            'transform': 'scale(1)',
        })
        $('#lobby').animate({
            'opacity':'1',
        },500)
        setTimeout(()=>{
            this.webIntroClicked()
        },300)
        setTimeout(()=>{
            $('#roomPart').fadeIn(400)
            this.lobby.roomLinesTimer = window.setInterval(()=>{
                document.getElementById('roomLinesHL').currentTime = 0
                document.getElementById('roomLinesHL').play()
            },this.HLInterval)
            if (!PARTICLE_RENDERER2.onShow) {
                PARTICLE_RENDERER2.particleOn()
                PARTICLE_RENDERER2.onShow = true
            }
        },150)
        setTimeout(()=>{
            $('#roomPart').on('click',this.roomPartClicked)
        },500)
        await sleep(500)
        this.durTrans = false
        this.lobby.showMutex = true
        this.curOnShow = "lobby"
    },
    lobbyUnload: async function () {
        if(!this.lobby.onShow||!this.lobby.showMutex) return
        this.lobby.showMutex = false
        this.lobby.onShow = false;
        $('#roomPart').off('click',this.roomPartClicked)
        clearInterval(this.lobby.roomLinesTimer)
        this.lobby.roomLinesTimer = null
        $('#lobby').fadeOut(500)
        $('#lobby').css({
            'transform': 'scale(1.22)',
            'opacity': '0',
        })
        setTimeout(()=>{
            $('#roomPart').fadeOut(400)
            if (PARTICLE_RENDERER2.onShow) {
                PARTICLE_RENDERER2.particleOff()
                PARTICLE_RENDERER2.onShow = false
            }
        },150)
        await sleep(500)
        $('#particles2').hide()
        this.lobby.showMutex = true
    },
    referencesClicked: async function () {
        if(this.lobby.onShow) {
            if(this.lobby.lobbyString.showMutex) {
                if(this.lobby.lobbyString.onShow === 'references') return
                this.lobby.lobbyString.showMutex = false
                await this.lobbyCharacterUnshow()
                this.lobby.lobbyString.target =   this.lobby.lobbyString.references
                this.lobby.lobbyString.onShow = 'references'
                await this.lobbyCharacterShow()
                this.lobby.lobbyString.showMutex = true
            }
        }
    },
    webIntroClicked: async function () {
        if(this.lobby.onShow) {
            if(this.lobby.lobbyString.showMutex) {
                if (this.lobby.lobbyString.onShow === 'webIntro') return
                this.lobby.lobbyString.showMutex = false
                await this.lobbyCharacterUnshow()
                this.lobby.lobbyString.target = this.lobby.lobbyString.intro
                this.lobby.lobbyString.onShow = 'webIntro'
                await this.lobbyCharacterShow()
                this.lobby.lobbyString.showMutex = true
            }
        }
    },
    aboutUsClicked: async function () {
        if(this.lobby.onShow) {
            if(this.lobby.lobbyString.showMutex) {
                if (this.lobby.lobbyString.onShow === 'aboutUs') return
                this.lobby.lobbyString.showMutex = false
                await this.lobbyCharacterUnshow()
                this.lobby.lobbyString.target = this.lobby.lobbyString.aboutUs
                this.lobby.lobbyString.onShow = 'aboutUs'
                await this.lobbyCharacterShow()
                this.lobby.lobbyString.showMutex = true
            }
        }
    },
    mouseClickToggle: function () {
        this.mouseClick = !this.mouseClick
        if(this.mouseClick) {
            $(window).on('click', this.mouseFadingString);
        } else {
            $(window).off('click', this.mouseFadingString);
        }
    },
    BGimgToggle: function () {
        this.BGimg.BGimgEnable = !this.BGimg.BGimgEnable
    },
    mouseFadingNote: async function (event) {//点击音符特效
        if(!this.mouseClickMusic) return
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const img = $("<img crossorigin='anonymous' alt='note'>");

        let randId = Math.round(Math.random()*4 + 0.5)
        if(randId !==1&&randId !==2&&randId !==3&&randId !==4) randId = 1
        img.attr({
            'src':'./images/main/note'+randId+'.png',
        })
        $('body').append(img);
        img.css({
            "zIndex":50,
            "width":12 + "px",
            "height":12 + "px",
            "position":'absolute',
            "opacity":'0.7',
            "userSelect":'none',
            "left": event.clientX + scrollX - 6 +'px',
            "top": event.clientY + scrollY +'px',
            "filter": 'drop-shadow(0px 0px 1.3px rgba(255, 255, 255, 1)) brightness(2)',
        })
        let angle = Math.PI * Math.random() / 2 + Math.PI/4
        img.animate({
            "width":this.CLICK_NOTE_SIZE + "px",
            "height":this.CLICK_NOTE_SIZE + "px",
            "left": event.clientX + scrollX - this.CLICK_NOTE_SIZE/2 + Math.cos(angle) * this.CLICK_NOTE_DIST + 'px',
            "top": event.clientY + scrollY-Math.sin(angle) * this.CLICK_NOTE_DIST + 'px',
            "opacity": "0",
        },600);

        const audio = $("<audio preload></audio>");

        let randId2 = Math.round(Math.random()*5 + 0.5)
        if(randId2 !==1&&randId2 !==2&&randId2 !==3&&randId2 !==4&&randId2 !==5) randId = 1
        audio.attr({
            'src':'./bgm/clickS'+randId2+'.wav',
        })
        $('body').append(audio);
        audio[0].play()

        setTimeout(() => {
            img.remove();
        },600)
        setTimeout(() => {
            audio.remove();
        },1200)
    },
    mouseFadingString: async function (event) {//点击药材名特效
        if(!this.mouseClick) return
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const character = $("<div></div>");
        let text
        await getRandomIngredient(null).then(res => {
            if (res.code === 1) {
                text = res.data.ingredientName
            } else {
                console.log(res.msg || '操作失败')
            }
        }).catch(err => {
            console.log('请求出错了：' + err)
        });
        character.text(text +'')
        $('body').append(character);
        character.css({
            "zIndex":50,
            "width":this.CLICK_CHARACTER_SIZE*text.length + "px",
            "position":'absolute',
            "fontSize":12+'px',
            "fontFamily":'defaultCharacter',
            "opacity":1,
            "userSelect":'none',
            "left": event.clientX - 6 + scrollX +'px',
            "top": event.clientY - 6 + scrollY +'px',
            "filter": 'drop-shadow(0px 0px 1.3px rgba(255, 255, 255, 1)) brightness(2)',
        })
        character.animate({
            "fontSize": this.CLICK_CHARACTER_SIZE + "px",
            "left": event.clientX - this.CLICK_CHARACTER_SIZE*text.length/2 + scrollX + 'px',
            "top": event.clientY - this.CLICK_CHARACTER_SIZE/2 + scrollY + 'px',
            "opacity": "0",
        },600);
        setTimeout(() => {
            character.remove();
        },600)
    },
    lobbyCharacterShow: async function () {
        for(let i = 0;i<this.lobby.lobbyString.target.length;i++) {
            for (let j = 0; j < this.lobby.lobbyString.target[i].length; j++) {
                if(!this.lobby.onShow) return
                const character = $("<div></div>");
                character.attr({
                    'id':'lobbyCharacter' + this.lobby.lobbyCharacterCount
                })
                this.lobby.lobbyCharacterCount++
                character.css({
                    "textStroke":"0.6px #7F754C",
                    "fontSize": this.lobby.lobbyFontSize+'px',
                    "fontFamily":'defaultCharacter',
                    "opacity":0,
                    "position":'absolute',
                    /*'color': '#7F754C',*/
                    'color': '#000',
                    'left': (this.lobby.lobbyFontSize + this.lobby.lobbyCharacterSpacing) * j +'px',
                    'top': (this.lobby.lobbyFontSize + this.lobby.lobbyLineSpacing) * i +'px',
                });
                character.text(this.lobby.lobbyString.target[i].charAt(j))
                $('#lobbyString').append(character);
                character.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                character.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                await sleep(this.lobby.lobbyShowInterval)
            }
        }
    },
    lobbyCharacterUnshow: async function() {
        for(let i = 0;i<this.lobby.lobbyCharacterCount;i++) {
            $('#lobbyCharacter'+i).animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            },400);
            $('#lobbyCharacter'+i).animate({
                "marginTop": 0 + 'px',
                "opacity": 0,
            },400);
            setTimeout(()=>{
                $('#lobbyCharacter'+i).remove()
            },800)
            await sleep(this.lobby.lobbyShowInterval)
        }
        this.lobby.lobbyCharacterCount = 0
    },
    toTopClicked: function () {
        this.selection.bookSelected = false
        this.selection.characterSelected = false
        this.selection.organSelected = false
        this.selection.quizSelected = false
        $("#switchBook").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchCharacter").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchOrgan").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchQuiz").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },
    goBackHover: function () {
        $("#goBack").animate({
            'marginLeft': '0px',
        },150);
        $("#goBack").animate({
            'marginLeft': '-10px',
        },150);
        $("#goBack").animate({
            'marginLeft': '0px',
        },150);
        $("#goBack").animate({
            'marginLeft': '-10px',
        },150);
    },
    /*
    setHoverListeners: function () {
        $("#switchBook").hover(this.switchBookHover,this.switchBookUnhover);

        $("#switchCharacter").hover(this.switchCharacterHover,this.switchCharacterUnhover);

        $("#switchOrgan").hover(this.switchOrganHover,this.switchOrganUnhover);

        $("#switchQuiz").hover(this.switchQuizHover,this.switchQuizUnhover);

        $("#toTop").hover(this.toTopHover,null);
    },
    toTopHover: function () {
        $("#toTop").animate({
            'marginTop': '0px',
        },150);
        $("#toTop").animate({
            'marginTop': '-10px',
        },150);
        $("#toTop").animate({
            'marginTop': '0px',
        },150);
        $("#toTop").animate({
            'marginTop': '-10px',
        },150);
    },
    switchBookHover: function () {
        $("#switchBook").css({
            "transform": 'translateX('+ 40 + 'px)',
        });
    },
    switchCharacterHover: function () {
        $("#switchCharacter").css({
            "transform": 'translateX('+ 40 + 'px)',
        });
    },
    switchOrganHover: function () {
        $("#switchOrgan").css({
            "transform": 'translateX('+ 40 + 'px)',
        });
    },
    switchQuizHover: function () {
        $("#switchQuiz").css({
            "transform": 'translateX('+ 40 + 'px)',
        });
    },
    switchBookUnhover: function () {
        $("#switchBook").css({
            "transform": 'translateX('+ (this.selection.bookSelected?40:0) + 'px)',
        });
    },
    switchCharacterUnhover: function () {
        $("#switchCharacter").css({
            "transform": 'translateX('+ (this.selection.characterSelected?40:0) + 'px)',
        });
    },
    switchOrganUnhover: function () {
        $("#switchOrgan").css({
            "transform": 'translateX('+ (this.selection.organSelected?40:0) + 'px)',
        });
    },
    switchQuizUnhover: function () {
        $("#switchQuiz").css({
            "transform": 'translateX('+ (this.selection.quizSelected?40:0) + 'px)',
        });
    },
    switchesScrollListener: function () {
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        $('#switches').css({
            'marginTop': 30 + scrollY + 'px',
            'left': -200 + scrollX + 'px',
        })
        $('#toTop').css({
            'top': scrollY + 'px',
            'left': 70 + scrollX + 'px',
        })
        if(scrollY < 300) {
            $('#switche').css({
                'transform': 'translateX(0px)'
            })
        }
        else if(!this.switchesMousePri){
            $('#switche').css({
                'transform': 'translateX(-350px)'
            })
        }


    },
    topButtonsScrollListener: function () {
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        $('#topButtons').css({
            'top': scrollY + 'px',
            'marginLeft': scrollX+'px',
        })
        if(scrollY < 300) {
            $('#topButtonsC').css({
                'transform': 'translateY(0px)'
            })
        }
        else if(!this.switchesMousePri){
            $('#topButtonsC').css({
                'transform': 'translateY(-150px)'
            })
        }


    },*/
    switchBookClicked: function () {
        this.selection.bookSelected = true
        this.selection.characterSelected = false
        this.selection.organSelected = false
        this.selection.quizSelected = false
        $("#switchBook").css({
        });
        $("#switchCharacter").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchOrgan").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchQuiz").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        window.scrollTo({
            top: (this.partSize+this.partGap),
            behavior: "smooth"
        });
    },
    switchCharacterClicked: function () {
        this.selection.bookSelected = false
        this.selection.characterSelected = true
        this.selection.organSelected = false
        this.selection.quizSelected = false
        $("#switchBook").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchCharacter").css({
        });
        $("#switchOrgan").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchQuiz").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        window.scrollTo({
            top: (this.partSize+this.partGap) * 2,
            behavior: "smooth"
        });
    },
    switchOrganClicked: function () {
        this.selection.bookSelected = false
        this.selection.characterSelected = false
        this.selection.organSelected = true
        this.selection.quizSelected = false
        $("#switchBook").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchCharacter").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchOrgan").css({
        });
        $("#switchQuiz").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        window.scrollTo({
            top: (this.partSize+this.partGap) * 3,
            behavior: "smooth"
        });
    },
    switchQuizClicked: function () {
        this.selection.bookSelected = false
        this.selection.characterSelected = false
        this.selection.organSelected = false
        this.selection.quizSelected = true
        $("#switchBook").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchCharacter").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchOrgan").css({
            "transform": 'translateX('+ 0 + 'px)',
        });
        $("#switchQuiz").css({
        });
        window.scrollTo({
            top: (this.partSize+this.partGap) * 4,
            behavior: "smooth"
        });
    },
    getCPS: function () {
        this.CPS.clickCount++
        $('#cpsShow').text('CPS:'+(this.CPS.clickCount/this.CPS.duration))
        setTimeout(()=>{
            this.CPS.clickCount--
            $('#cpsShow').text('CPS:'+(this.CPS.clickCount/this.CPS.duration))
        },this.CPS.duration*1000)
    },
};