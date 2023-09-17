//单选框和复选框的自我实现
var QUIZ_RENDERER = {
    showMutex:true,
    onShow:false,//避免离开该part某些方法依然在执行。该值为false时，该类大部分方法立即停止
    isReady:false,
    inputChoice: [],
    quizData:[],
    quizType: 0,
    isSingle:true,
    isCorrect:-1,
    isPro:false,
    choice:{
        FontSize: 33,
        CharacterSpacing:-2,
        LineSpacing:15,
        lineCharacters: 35,
        ShowInterval: 6,//ms
        ASelected:false,
        BSelected:false,
        CSelected:false,
        DSelected:false,
    },
    title:{
        FontSize: 37,
        CharacterSpacing:-2,
        LineSpacing:15,
        lineCharacters: 25,
        ShowInterval: 10,//ms
    },
    quizResult:{
        FontSize: 50,
        CharacterSpacing:10,
        ShowInterval: 20,//ms
        correct:'正确~',
        wrong:'不正确',
    },
    init: async function () {
        this.reconstructMethod();
        this.bindEvent();
    },
    reconstructMethod: function () {//让函数的this变为外层的this
        this.getNewQuiz = this.getNewQuiz.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.quizResultShow = this.quizResultShow.bind(this);
        this.quizShow = this.quizShow.bind(this);
        this.quizUnshow = this.quizUnshow.bind(this);
        this.getStarted = this.getStarted.bind(this);
        this.ACheckboxClicked = this.ACheckboxClicked.bind(this);
        this.BCheckboxClicked = this.BCheckboxClicked.bind(this);
        this.CCheckboxClicked = this.CCheckboxClicked.bind(this);
        this.DCheckboxClicked = this.DCheckboxClicked.bind(this);
        this.ARadioClicked = this.ARadioClicked.bind(this);
        this.BRadioClicked = this.BRadioClicked.bind(this);
        this.CRadioClicked = this.CRadioClicked.bind(this);
        this.DRadioClicked = this.DRadioClicked.bind(this);
        this.getNext = this.getNext.bind(this);
        this.isProClicked = this.isProClicked.bind(this);
        this.isNewClicked = this.isNewClicked.bind(this);
    },
    bindEvent: function () {
        //$("#quizStart").on('click', this.getStarted);
        $("#quizNext").on('click', this.getNext);
        $("#quizSubmit").on('click', this.handleSubmit);
        $("#quizPro").on('click', this.isProClicked);
        $("#quizNew").on('click', this.isNewClicked);
    },
    handleSubmit: async function () {
        if (!(this.choice.ASelected || this.choice.BSelected || this.choice.CSelected || this.choice.DSelected)) {
            $('#quizFeedback').text('需要至少选择一项~')
        } else {
            let webAns = ""
            webAns += this.choice.ASelected ? 'A' : '';
            webAns += this.choice.BSelected ? 'B' : '';
            webAns += this.choice.CSelected ? 'C' : '';
            webAns += this.choice.DSelected ? 'D' : '';
            this.isCorrect = webAns === this.quizData.answers ? 1 : 0
            await this.quizResultUnshow();
            this.quizResultShow();
            $('#quizNext').fadeIn()
        }
    },
    getNext: async function () {
        this.quizResultUnshow();
        $('#quizNext').fadeOut()
        this.isCorrect=-1
        this.choice.ASelected = false
        this.choice.BSelected = false
        this.choice.CSelected = false
        this.choice.DSelected = false
        let countT = (this.quizData.quizTitle===undefined||this.quizData.quizTitle===null||this.quizData.quizTitle.length===0)?0:this.quizData.quizTitle.length
        let countA = (this.quizData.choiceA===undefined||this.quizData.choiceA===null||this.quizData.choiceA.length===0)?0:this.quizData.choiceA.length
        let countB = (this.quizData.choiceB===undefined||this.quizData.choiceB===null||this.quizData.choiceB.length===0)?0:this.quizData.choiceB.length
        let countC = (this.quizData.choiceC===undefined||this.quizData.choiceC===null||this.quizData.choiceC.length===0)?0:this.quizData.choiceC.length
        let countD = (this.quizData.choiceD===undefined||this.quizData.choiceD===null||this.quizData.choiceD.length===0)?0:this.quizData.choiceD.length
        await this.quizUnshow(countT,countA,countB,countC,countD,this.quizData.isSingle)
        await sleep(500)
        await this.getNewQuiz()
        await this.quizShow()
    },
    getStarted: async function () {
        //$('#quizStartPart').fadeOut();
        $('#quizTable').fadeIn();
        this.isReady = true;
        await this.getNewQuiz()
        await this.quizShow()
    },
    isProClicked: function () {
        this.isPro = true
        $('#quizChoiceProRadio').removeClass('quizChoiceRadio');
        $('#quizChoiceProRadio').addClass('quizChoiceRadioActived')
        $('#quizChoiceNewRadio').removeClass('quizChoiceRadioActived');
        $('#quizChoiceNewRadio').addClass('quizChoiceRadio')
        $('#quizProPlay').show()
        $('#quizProPlay').attr({
            src:'./video/quiz/inkCircle.webm'
        })
        $('#quizNewPlay').fadeOut(200)
        setTimeout(()=>{
            $('#quizNewPlay').attr({
                src:''
            })
        },200)
    },
    isNewClicked: function () {
        this.isPro = false
        $('#quizChoiceNewRadio').removeClass('quizChoiceRadio');
        $('#quizChoiceNewRadio').addClass('quizChoiceRadioActived')
        $('#quizChoiceProRadio').removeClass('quizChoiceRadioActived');
        $('#quizChoiceProRadio').addClass('quizChoiceRadio')
        $('#quizNewPlay').show()
        $('#quizNewPlay').attr({
            src:'./video/quiz/inkCircle.webm'
        })
        $('#quizProPlay').fadeOut(200)
        setTimeout(()=>{
            $('#quizProPlay').attr({
                src:''
            })
        },200)
    },
    ACheckboxClicked: function () {
        console.log(this)
        $('#quizFeedback').text('')
        this.choice.ASelected = !this.choice.ASelected
        if(this.choice.ASelected) {
            $('#quizAPlay').show()
            $('#quizAPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceACheckbox').removeClass('quizChoiceCheckbox');
            $('#quizChoiceACheckbox').addClass('quizChoiceCheckboxActived')
        }
        else {
            $('#quizAPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizAPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceACheckbox').removeClass('quizChoiceCheckboxActived');
            $('#quizChoiceACheckbox').addClass('quizChoiceCheckbox')
        }
    },
    BCheckboxClicked: function () {
        $('#quizFeedback').text('')
        this.choice.BSelected = !this.choice.BSelected
        if(this.choice.BSelected) {
            $('#quizBPlay').show()
            $('#quizBPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceBCheckbox').removeClass('quizChoiceCheckbox');
            $('#quizChoiceBCheckbox').addClass('quizChoiceCheckboxActived')
        }
        else {
            $('#quizBPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizBPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceBCheckbox').removeClass('quizChoiceCheckboxActived');
            $('#quizChoiceBCheckbox').addClass('quizChoiceCheckbox')
        }
    },
    CCheckboxClicked: function () {
        $('#quizFeedback').text('')
        this.choice.CSelected = !this.choice.CSelected
        if(this.choice.CSelected) {
            $('#quizCPlay').show()
            $('#quizCPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceCCheckbox').removeClass('quizChoiceCheckbox');
            $('#quizChoiceCCheckbox').addClass('quizChoiceCheckboxActived')
        }
        else {
            $('#quizCPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizCPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceCCheckbox').removeClass('quizChoiceCheckboxActived');
            $('#quizChoiceCCheckbox').addClass('quizChoiceCheckbox')
        }
    },
    DCheckboxClicked: function () {
        $('#quizFeedback').text('')
        this.choice.DSelected = !this.choice.DSelected
        if(this.choice.DSelected) {
            $('#quizDPlay').show()
            $('#quizDPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceDCheckbox').removeClass('quizChoiceCheckbox');
            $('#quizChoiceDCheckbox').addClass('quizChoiceCheckboxActived')
        }
        else {
            $('#quizDPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizDPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceDCheckbox').removeClass('quizChoiceCheckboxActived');
            $('#quizChoiceDCheckbox').addClass('quizChoiceCheckbox')
        }
    },
    ARadioClicked: function () {
        console.log(this)
        $('#quizFeedback').text('')
        this.choice.ASelected = !this.choice.ASelected
        if(this.choice.ASelected) {
            $('#quizAPlay').show()
            $('#quizAPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceARadio').removeClass('quizChoiceRadio');
            $('#quizChoiceARadio').addClass('quizChoiceRadioActived')
            $('#quizChoiceBRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceBRadio').addClass('quizChoiceRadio')
            $('#quizChoiceCRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceCRadio').addClass('quizChoiceRadio')
            $('#quizChoiceDRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceDRadio').addClass('quizChoiceRadio')
            $('#quizBPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizBPlay').attr({
                    src:''
                })
            },200)
            $('#quizCPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizCPlay').attr({
                    src:''
                })
            },200)
            $('#quizDPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizDPlay').attr({
                    src:''
                })
            },200)
            this.choice.BSelected = false
            this.choice.CSelected = false
            this.choice.DSelected = false
        }
        else {
            $('#quizAPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizAPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceARadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceARadio').addClass('quizChoiceRadio')
        }
    },
    BRadioClicked: function () {
        $('#quizFeedback').text('')
        this.choice.BSelected = !this.choice.BSelected
        if(this.choice.BSelected) {
            $('#quizBPlay').show()
            $('#quizBPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceBRadio').removeClass('quizChoiceRadio');
            $('#quizChoiceBRadio').addClass('quizChoiceRadioActived')
            $('#quizChoiceARadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceARadio').addClass('quizChoiceRadio')
            $('#quizChoiceCRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceCRadio').addClass('quizChoiceRadio')
            $('#quizChoiceDRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceDRadio').addClass('quizChoiceRadio')
            $('#quizAPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizAPlay').attr({
                    src:''
                })
            },200)
            $('#quizCPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizCPlay').attr({
                    src:''
                })
            },200)
            $('#quizDPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizDPlay').attr({
                    src:''
                })
            },200)
            this.choice.ASelected = false
            this.choice.CSelected = false
            this.choice.DSelected = false
        }
        else {
            $('#quizBPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizBPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceBRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceBRadio').addClass('quizChoiceRadio')
        }
    },
    CRadioClicked: function () {
        $('#quizFeedback').text('')
        this.choice.CSelected = !this.choice.CSelected
        if(this.choice.CSelected) {
            $('#quizCPlay').show()
            $('#quizCPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceCRadio').removeClass('quizChoiceRadio');
            $('#quizChoiceCRadio').addClass('quizChoiceRadioActived')
            $('#quizChoiceARadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceARadio').addClass('quizChoiceRadio')
            $('#quizChoiceBRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceBRadio').addClass('quizChoiceRadio')
            $('#quizChoiceDRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceDRadio').addClass('quizChoiceRadio')
            $('#quizAPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizAPlay').attr({
                    src:''
                })
            },200)
            $('#quizBPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizBPlay').attr({
                    src:''
                })
            },200)
            $('#quizDPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizDPlay').attr({
                    src:''
                })
            },200)
            this.choice.ASelected = false
            this.choice.BSelected = false
            this.choice.DSelected = false
        }
        else {
            $('#quizCPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizCPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceCRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceCRadio').addClass('quizChoiceRadio')
        }
    },
    DRadioClicked: function () {
        $('#quizFeedback').text('')
        this.choice.DSelected = !this.choice.DSelected
        if(this.choice.DSelected) {
            $('#quizDPlay').show()
            $('#quizDPlay').attr({
                src:'./video/quiz/inkCircle.webm'
            })
            $('#quizChoiceDRadio').removeClass('quizChoiceRadio');
            $('#quizChoiceDRadio').addClass('quizChoiceRadioActived')
            $('#quizChoiceARadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceARadio').addClass('quizChoiceRadio')
            $('#quizChoiceBRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceBRadio').addClass('quizChoiceRadio')
            $('#quizChoiceCRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceCRadio').addClass('quizChoiceRadio')
            $('#quizAPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizAPlay').attr({
                    src:''
                })
            },200)
            $('#quizBPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizBPlay').attr({
                    src:''
                })
            },200)
            $('#quizCPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizCPlay').attr({
                    src:''
                })
            },200)
            this.choice.ASelected = false
            this.choice.BSelected = false
            this.choice.CSelected = false
        }
        else {
            $('#quizDPlay').fadeOut(200)
            setTimeout(()=>{
                $('#quizDPlay').attr({
                    src:''
                })
            },200)
            $('#quizChoiceDRadio').removeClass('quizChoiceRadioActived');
            $('#quizChoiceDRadio').addClass('quizChoiceRadio')
        }
    },
    getNewQuiz: async function () {
        this.isCorrect = -1
        this.userInput = []
        const params = {
            quizId:this.quizData.quizId,
            quizType:this.quizType,
            quizLvl:this.isPro?1:0,
        }
        await getQuizByType(params).then(res => {
            if (String(res.code) === '1') {
                this.quizData = res.data || []
                this.isSingle = res.data.isSingle === 1
                this.quizId = res.data.quizId
            }
        }).catch(err => {
            console.log('请求出错了：' + err)
        })
    },
    quizResultShow: async function() {
      let str = this.isCorrect===1?this.quizResult.correct:this.quizResult.wrong;
        for(let i = 0;i<str.length;i++) {
            if(!this.onShow) return
            const resultChar = $("<div></div>");
            resultChar.attr({
                'class':'quizResultCharacter',
                'id':'quizResultCharacter'+i,
            })
            resultChar.css({
                "fontSize": this.quizResult.FontSize+'px',
                "opacity":0,
                'left': (this.quizResult.FontSize+this.quizResult.CharacterSpacing) * i+'px',
                'top': 15 +'px',
            });
            resultChar.text(str.charAt(i))
            $('#quizResult').append(resultChar);
            resultChar.animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            },400);
            resultChar.animate({
                "marginTop": 0 + 'px',
                "opacity": 1,
            },400);
            await sleep(this.quizResult.ShowInterval)
        }
    },
    quizResultUnshow: async function () {
        if($('#quizResult').text() === undefined || $('#quizResult').text() === null ||$('#quizResult').text() === '') return
        let str = this.isCorrect===1?this.quizResult.correct:this.quizResult.wrong;
        for(let i = 0 ;i<str.length;i++) {
            $('#quizResultCharacter'+i).animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            },200);
            $('#quizResultCharacter'+i).animate({
                "marginTop": 0 + 'px',
                "opacity": 0,
            },200);
            setTimeout(()=>{
                $('#quizResultCharacter'+i).remove()
            },400)
            await sleep(this.quizResult.ShowInterval/2)
        }
    },
    quizShow: async function () {
        let lineCountT = 0
        let lineCount = 0
        let lineCountA = 0
        let lineCountB = 0
        let lineCountC = 0
        let lineCountD = 0
        if(this.quizData.quizTitle !== undefined && this.quizData.quizTitle !== null && this.quizData.quizTitle.length !== 0) {
            const title = $("<div></div>");
            title.attr({
                'class':'quizTitle',
                'id':'quizTitle',
            })
            title.css({
                'height':Math.floor(this.quizData.quizTitle.length/this.title.lineCharacters)*(this.title.FontSize+this.title.LineSpacing)+50+'px',
            });
            $('#quizText').append(title);
            for(let i = 0;i<this.quizData.quizTitle.length;i++) {
                if(!this.onShow) return
                if(i%this.title.lineCharacters===0) lineCountT++;
                const titleChar = $("<div></div>");
                titleChar.attr({
                    'class':'quizTitleCharacter',
                    'id':'quizTitleACharacter'+i,
                })
                titleChar.css({
                    "textStroke":'0.3px #5b5230',
                    "fontSize": this.title.FontSize+'px',
                    "opacity":0,
                    'left': (this.title.FontSize+this.title.CharacterSpacing) * (i-(lineCountT-1)*this.title.lineCharacters)+'px',
                    'top': lineCountT*(this.title.FontSize+this.title.LineSpacing) + 20 +'px',
                });
                titleChar.text(this.quizData.quizTitle.charAt(i))
                $('#quizTitle').append(titleChar);
                titleChar.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                titleChar.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                await sleep(this.title.ShowInterval)
            }
        }

        if(this.quizData.choiceA !== undefined && this.quizData.choiceA !== null && this.quizData.choiceA.length !== 0) {
            const choiceDiv = $("<div></div>");
            choiceDiv.attr({
                'class':'quizDiv',
                'id':'quizDivA',
            })
            choiceDiv.css({
                'top': 160 + lineCountT * (this.title.FontSize+this.title.LineSpacing) + lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
            });
            $('#quizText').append(choiceDiv);


            if(this.quizData.isSingle) {
                const choiceRadio = $("<div></div>");
                choiceRadio.attr({
                    'class':'quizChoiceRadio',
                    'id':'quizChoiceARadio',
                })
                choiceRadio.css({
                    'opacity':0,
                    'top': 7.5 +'px',
                });
                $('#quizDivA').append(choiceRadio);
                choiceRadio.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceRadio.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivA").on('click', this.ARadioClicked);
            } else {
                const choiceCheckbox = $("<div></div>");
                choiceCheckbox.attr({
                    'class':'quizChoiceCheckbox',
                    'id':'quizChoiceACheckbox',
                })
                choiceCheckbox.css({
                    'opacity':0,
                    'top': 7.5 + 'px',
                });
                $('#quizDivA').append(choiceCheckbox);
                choiceCheckbox.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceCheckbox.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivA").on('click', this.ACheckboxClicked);
            }

            const inkCircle = $("<video src='' autoplay muted width='50px' height='50px'></video>");
            inkCircle.attr({
                'id':'quizAPlay',
            })
            inkCircle.hide()
            $('#quizDivA').append(inkCircle);

            const choice = $("<div></div>");
            choice.attr({
                'class':'quizChoice',
                'id':'quizChoiceA',
            })
            choice.css({
                'top': 180 + lineCountT * (this.title.FontSize+this.title.LineSpacing) + lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
                'height':Math.floor(this.quizData.choiceA.length/this.choice.lineCharacters)*(this.choice.FontSize+this.choice.LineSpacing)+30+'px',
            });
            $('#quizText').append(choice);
            for(let i = 0;i<this.quizData.choiceA.length;i++) {
                if(!this.onShow) return
                if(i%this.choice.lineCharacters===0) lineCountA++;
                const choiceChar = $("<div></div>");
                choiceChar.attr({
                    'class':'quizChoiceCharacter',
                    'id':'quizChoiceACharacter'+i,
                })
                choiceChar.css({
                    "textStroke":'0.3px #5b5230',
                    "fontSize": this.choice.FontSize+'px',
                    "opacity":0,
                    'left': (this.choice.FontSize+this.choice.CharacterSpacing) * (i-(lineCountA-1)*this.choice.lineCharacters)+'px',
                    'top': (lineCountA-1)*(this.choice.FontSize+this.choice.LineSpacing) + 'px',
                });
                choiceChar.text(this.quizData.choiceA.charAt(i))
                $('#quizChoiceA').append(choiceChar);
                choiceChar.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceChar.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                await sleep(this.choice.ShowInterval)
            }
            lineCount+= lineCountA;
        }
        if(this.quizData.choiceB !== undefined && this.quizData.choiceB !== null && this.quizData.choiceB.length !== 0) {
            const choiceDiv = $("<div></div>");
            choiceDiv.attr({
                'class':'quizDiv',
                'id':'quizDivB',
            })
            choiceDiv.css({
                'top': 180 + lineCountT * (this.title.FontSize+this.title.LineSpacing) + lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
            });
            $('#quizText').append(choiceDiv);


            if(this.quizData.isSingle) {
                const choiceRadio = $("<div></div>");
                choiceRadio.attr({
                    'class':'quizChoiceRadio',
                    'id':'quizChoiceBRadio',
                })
                choiceRadio.css({
                    'opacity':0,
                    'top': 7.5 +'px',
                });
                $('#quizDivB').append(choiceRadio);
                choiceRadio.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceRadio.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivB").on('click', this.BRadioClicked);
            } else {
                const choiceCheckbox = $("<div></div>");
                choiceCheckbox.attr({
                    'class':'quizChoiceCheckbox',
                    'id':'quizChoiceBCheckbox',
                })
                choiceCheckbox.css({
                    'opacity':0,
                    'top': 7.5 + 'px',
                });
                $('#quizDivB').append(choiceCheckbox);
                choiceCheckbox.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceCheckbox.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivB").on('click', this.BCheckboxClicked);
            }

            const inkCircle = $("<video src='' autoplay muted width='50px' height='50px'></video>");
            inkCircle.attr({
                'id':'quizBPlay',
            })
            inkCircle.hide()
            $('#quizDivB').append(inkCircle);

            const choice = $("<div></div>");
            choice.attr({
                'class':'quizChoice',
                'id':'quizChoiceB',
            })
            choice.css({
                'top': 200 + lineCountT * (this.title.FontSize+this.title.LineSpacing)+lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
                'height':Math.floor(this.quizData.choiceB.length/this.choice.lineCharacters)*(this.choice.FontSize+this.choice.LineSpacing)+30+'px',
            });
            $('#quizText').append(choice);
            for(let i = 0;i<this.quizData.choiceB.length;i++) {
                if(!this.onShow) return
                if(i%this.choice.lineCharacters===0) lineCountB++;
                const choiceChar = $("<div></div>");
                choiceChar.attr({
                    'class':'quizChoiceCharacter',
                    'id':'quizChoiceBCharacter'+i,
                })
                choiceChar.css({
                    "fontSize": this.choice.FontSize+'px',
                    "opacity":0,
                    'left': (this.choice.FontSize+this.choice.CharacterSpacing) * (i-(lineCountB-1)*this.choice.lineCharacters)+'px',
                    'top': (lineCountB-1)*(this.choice.FontSize+this.choice.LineSpacing) + 'px',
                });
                choiceChar.text(this.quizData.choiceB.charAt(i))
                $('#quizChoiceB').append(choiceChar);
                choiceChar.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceChar.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                await sleep(this.choice.ShowInterval)
            }
            lineCount+= lineCountB;
        }
        if(this.quizData.choiceC !== undefined && this.quizData.choiceC !== null && this.quizData.choiceC.length !== 0) {
            const choiceDiv = $("<div></div>");
            choiceDiv.attr({
                'class':'quizDiv',
                'id':'quizDivC',
            })
            choiceDiv.css({
                'top': 200 + lineCountT * (this.title.FontSize+this.title.LineSpacing) + lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
            });
            $('#quizText').append(choiceDiv);


            if(this.quizData.isSingle) {
                const choiceRadio = $("<div></div>");
                choiceRadio.attr({
                    'class':'quizChoiceRadio',
                    'id':'quizChoiceCRadio',
                })
                choiceRadio.css({
                    'opacity':0,
                    'top': 7.5 + 'px',
                });
                $('#quizDivC').append(choiceRadio);
                choiceRadio.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceRadio.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivC").on('click', this.CRadioClicked);
            } else {
                const choiceCheckbox = $("<div></div>");
                choiceCheckbox.attr({
                    'class':'quizChoiceCheckbox',
                    'id':'quizChoiceCCheckbox',
                })
                choiceCheckbox.css({
                    'opacity':0,
                    'top': 7.5 + 'px',
                });
                $('#quizDivC').append(choiceCheckbox);
                choiceCheckbox.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceCheckbox.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivC").on('click', this.CCheckboxClicked);
            }

            const inkCircle = $("<video src='' autoplay muted width='50px' height='50px'></video>");
            inkCircle.attr({
                'id':'quizCPlay',
            })
            inkCircle.hide()
            $('#quizDivC').append(inkCircle);

            const choice = $("<div></div>");
            choice.attr({
                'class':'quizChoice',
                'id':'quizChoiceC',
            })
            choice.css({
                'top': 220 + lineCountT * (this.title.FontSize+this.title.LineSpacing)+lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
                'height':Math.floor(this.quizData.choiceC.length/this.choice.lineCharacters)*(this.choice.FontSize+this.choice.LineSpacing)+30+'px',
            });
            $('#quizText').append(choice);
            for(let i = 0;i<this.quizData.choiceC.length;i++) {
                if(!this.onShow) return
                if(i%this.choice.lineCharacters===0) lineCountC++;
                const choiceChar = $("<div></div>");
                choiceChar.attr({
                    'class':'quizChoiceCharacter',
                    'id':'quizChoiceCCharacter'+i,
                })
                choiceChar.css({
                    "fontSize": this.choice.FontSize+'px',
                    "opacity":0,
                    'left': (this.choice.FontSize+this.choice.CharacterSpacing) * (i-(lineCountC-1)*this.choice.lineCharacters)+'px',
                    'top': (lineCountC-1)*(this.choice.FontSize+this.choice.LineSpacing) + 'px',
                });
                choiceChar.text(this.quizData.choiceC.charAt(i))
                $('#quizChoiceC').append(choiceChar);
                choiceChar.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceChar.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                await sleep(this.choice.ShowInterval)
            }
            lineCount+= lineCountC;
        }
        if(this.quizData.choiceD !== undefined && this.quizData.choiceD !== null && this.quizData.choiceD.length !== 0) {
            const choiceDiv = $("<div></div>");
            choiceDiv.attr({
                'class':'quizDiv',
                'id':'quizDivD',
            })
            choiceDiv.css({
                'top': 220 + lineCountT * (this.title.FontSize+this.title.LineSpacing) + lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
            });
            $('#quizText').append(choiceDiv);


            if(this.quizData.isSingle) {
                const choiceRadio = $("<div></div>");
                choiceRadio.attr({
                    'class':'quizChoiceRadio',
                    'id':'quizChoiceDRadio',
                })
                choiceRadio.css({
                    'opacity':0,
                    'top': 7.5 + 'px',
                });
                $('#quizDivD').append(choiceRadio);
                choiceRadio.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceRadio.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivD").on('click', this.DRadioClicked);
            } else {
                const choiceCheckbox = $("<div></div>");
                choiceCheckbox.attr({
                    'class':'quizChoiceCheckbox',
                    'id':'quizChoiceDCheckbox',
                })
                choiceCheckbox.css({
                    'opacity':0,
                    'top': 7.5 + 'px',
                });
                $('#quizDivD').append(choiceCheckbox);
                choiceCheckbox.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceCheckbox.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                $("#quizDivD").on('click', this.DCheckboxClicked);
            }

            const inkCircle = $("<video src='' autoplay muted width='50px' height='50px'></video>");
            inkCircle.attr({
                'id':'quizDPlay',
            })
            inkCircle.hide()
            $('#quizDivD').append(inkCircle);

            const choice = $("<div></div>");
            choice.attr({
                'class':'quizChoice',
                'id':'quizChoiceD',
            })
            choice.css({
                'top': 240 + lineCountT * (this.title.FontSize+this.title.LineSpacing) + lineCount*(this.choice.FontSize+this.choice.LineSpacing) +'px',
                'height':Math.floor(this.quizData.choiceD.length/this.choice.lineCharacters)*(this.choice.FontSize+this.choice.LineSpacing)+30+'px',
            });
            $('#quizText').append(choice);
            for(let i = 0;i<this.quizData.choiceD.length;i++) {
                if(!this.onShow) return
                if(i%this.choice.lineCharacters===0) lineCountD++;
                const choiceChar = $("<div></div>");
                choiceChar.attr({
                    'class':'quizChoiceCharacter',
                    'id':'quizChoiceDCharacter'+i,
                })
                choiceChar.css({
                    "fontSize": this.choice.FontSize+'px',
                    "opacity":0,
                    'left': (this.choice.FontSize+this.choice.CharacterSpacing) * (i-(lineCountD-1)*this.choice.lineCharacters)+'px',
                    'top': (lineCountD-1)*(this.choice.FontSize+this.choice.LineSpacing) + 'px',
                });
                choiceChar.text(this.quizData.choiceD.charAt(i))
                $('#quizChoiceD').append(choiceChar);
                choiceChar.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                choiceChar.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                await sleep(this.choice.ShowInterval)
            }
            lineCount+= lineCountD;
        }
    },
    quizUnshow: async function (countT,countA,countB,countC,countD,isSingle) {
        if(countT !== 0) {
            for(let i = 0 ;i<countT;i++) {
                $('#quizTitleACharacter'+i).animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },200);
                $('#quizTitleACharacter'+i).animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                },200);
                setTimeout(()=>{
                    $('#quizTitleACharacter'+i).remove()
                },400)
                await sleep(this.title.ShowInterval/2)
            }
            setTimeout(()=>{
                $('#quizTitle').remove()
            },400)
        }
        if(countA !== 0) {
            if(isSingle) {
                $("#quizDivA").off('click', this.ARadioClicked);
                $('#quizDivA').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivA').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceARadio').remove()
                    $('#quizDivA').remove()
                }, 400)
            } else {
                $("#quizDivA").off('click', this.ACheckboxClicked);
                $('#quizDivA').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivA').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceACheckbox').remove()
                    $('#quizDivA').remove()
                }, 400)
            }
            for (let i = 0; i < countA; i++) {
                $('#quizChoiceACharacter' + i).animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizChoiceACharacter' + i).animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceACharacter' + i).remove()
                }, 400)
                await sleep(this.choice.ShowInterval / 2)
            }
            setTimeout(()=>{
                $('#quizChoiceA').remove()
            },400)
        }

        if(countB !== 0) {
            if(isSingle) {
                $("#quizDivB").off('click', this.BRadioClicked);
                $('#quizDivB').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivB').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceBRadio').remove()
                    $('#quizDivB').remove()
                }, 400)
            } else {
                $("#quizDivB").off('click', this.BCheckboxClicked);
                $('#quizDivB').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivB').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceBCheckbox').remove()
                    $('#quizDivB').remove()
                }, 400)
            }
            for (let i = 0; i < countB; i++) {
                $('#quizChoiceBCharacter' + i).animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizChoiceBCharacter' + i).animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceBCharacter' + i).remove()
                }, 400)
                await sleep(this.choice.ShowInterval / 2)
            }
            setTimeout(()=>{
                $('#quizChoiceB').remove()
            },400)
        }
        if(countC !== 0) {
            if(isSingle) {
                $("#quizDivC").off('click', this.CRadioClicked);
                $('#quizDivC').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivC').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceCRadio').remove()
                    $('#quizDivC').remove()
                }, 400)
            } else {
                $("#quizDivC").off('click', this.CCheckboxClicked);
                $('#quizDivC').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivC').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceCCheckbox').remove()
                    $('#quizDivC').remove()
                }, 400)
            }
            for (let i = 0; i < countC; i++) {
                $('#quizChoiceCCharacter' + i).animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizChoiceCCharacter' + i).animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceCCharacter' + i).remove()
                }, 400)
                await sleep(this.choice.ShowInterval / 2)
            }
            setTimeout(()=>{
                $('#quizChoiceC').remove()
            },400)
        }
        if(countD !== 0) {
            if(isSingle) {
                $("#quizDivD").off('click', this.DRadioClicked);
                $('#quizDivD').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivD').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceDRadio').remove()
                    $('#quizDivD').remove()
                }, 400)
            } else {
                $("#quizDivD").off('click', this.DCheckboxClicked);
                $('#quizDivD').animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizDivD').animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceDCheckbox').remove()
                    $('#quizDivD').remove()
                }, 400)
            }
            for (let i = 0; i < countD; i++) {
                $('#quizChoiceDCharacter' + i).animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 200);
                $('#quizChoiceDCharacter' + i).animate({
                    "marginTop": 0 + 'px',
                    "opacity": 0,
                }, 200);
                setTimeout(() => {
                    $('#quizChoiceDCharacter' + i).remove()
                }, 400)
                await sleep(this.choice.ShowInterval / 2)
            }
            setTimeout(()=>{
                $('#quizChoiceD').remove()
            },400)
        }
    },
};