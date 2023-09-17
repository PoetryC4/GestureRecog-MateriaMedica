
var ORGAN_RENDERER = {
    onShow:false,//避免离开该part某些方法依然在执行。该值为false时，该类大部分方法立即停止
    showMutex:true,
    organs:{
        showMutex: true,
        textAnimation:{
            showMutex: true,
            textCount:0,
            FontSize: 25,
            CharacterSpacing:2,
            LineSpacing:15,
            lineCharacters: 21,
            ShowInterval: 1,//ms
        },
        organScale: 1.20,
        organs:[
            {
                name:'gallbladder',
                text:"胆居六腑之首，又隶属于奇恒之府，其形呈囊状，若悬瓠，附于肝之短叶间。胆属阳属木，与肝相表里，肝为脏属阴木，胆为腑属阳木。胆贮藏排泄胆汁，主决断，调节脏腑气。",
                left:211,
                top: 408,
                width:100,
                height:80,
            },
            {
                name:'largeIntestine',
                text:"大肠居腹中，其上口在阑门处接小肠，其下端紧接肛门，包括结肠和直肠。主传化糟粕和吸收津液。属金、属阳。",
                left:167,
                top: 402,
                width:225,
                height:306,
            },
            {
                name:'liver',
                text:"肝位于腹部，横膈之下，右胁下而偏左。与胆、目、筋、爪等构成肝系统。主疏泄、藏喜条达而恶抑郁，体阴用阳。在五行属木，为阴中之阳。肝与四时之春相应：",
                left:157,
                top: 345,
                width:183,
                height:138,
            },
            {
                name:'lung',
                text:"肺，位居胸中，左右各一，呈分叶状，质疏松。与心同居膈上，上连气管，通窍于鼻，与自然界之大气直接相通。与大肠、皮、毛、鼻等构成肺系统。在五行属金，为阳中之阴脏。主气司呼吸，助心行血，通调水道。在五脏六腑中，位居最高，为五脏之长。肺与四时之秋相应。",
                left:143,
                top: 3,
                width:261,
                height:300,
            },
            {
                name:'pancreas',
                text:"脾位于腹腔上部，膈膜之下，与胃以膜相连，“形如犬舌，状如鸡冠”，与胃、肉、唇、口等构成脾系统。主运化、统血，输布水谷精微，为气血生化之源，人体脏腑百骸皆赖脾以濡养，故有后天之本之称。在五行属土，为阴中之至阴。脾与四时之长夏相应。",
                left:240,
                top: 404,
                width:113,
                height:105,
            },
            {
                name:'womb',
                text:"女子胞，又称胞宫、子宫、子脏、胞脏、子处、血脏，位于小腹正中部，是女性的内生殖器官，有主持月经和孕育胎儿的作用。",
                left:174,
                top: 600,
                width:219,
                height:147,
            },
            {
                name:'bladder',
                text:"膀胱又称净腑、水府、玉海、脬、尿胞。位于下腹部，在脏腑中，居最下处。主贮存尿液及排泄尿液，与肾相表里，在五行属水，其阴阳属性为阳。",
                left:208,
                top: 474,
                width:159,
                height:261,
            },
            {
                name:'heart',
                text:"心位于胸腔偏左，膈膜之上，肺之下，圆而下尖，形如莲蕊，外有心包卫护。心与小肠、脉、面、舌等构成心系统。心，在五行属火，为阳中之阳脏，主血脉，藏神志，为五脏六腑之大主、生命之主宰。心与四时之夏相通应。",
                left:239,
                top: 171,
                width: 114,
                height:165,
            },
            {
                name:'smallIntestine',
                text:"小肠居腹中，上接幽门，与胃相通，下连大肠，包括回肠、空肠、十二指肠。主受盛化物和泌别清浊。与心相表里，属火属阳。",
                left:197,
                top: 433,
                width:186,
                height:225,
            },
            {
                name:'stomach',
                text:"胃是腹腔中容纳食物的器官。其外形屈曲，上连食道，下通小肠。主受纳腐熟水谷，为水谷精微之仓、气血之海，胃以通降为顺，与脾相表里，脾胃常合称为后天之本。胃与脾同居中土，但胃为燥土属阳，脾为湿土属阴。",
                left:202,
                top: 259,
                width:171,
                height:174,
            },
            {
                name:'spleen',
                text:"脾位于腹腔上部，膈膜之下，与胃以膜相连，“形如犬舌，状如鸡冠”，与胃、肉、唇、口等构成脾系统。主运化、统血，输布水谷精微，为气血生化之源，人体脏腑百骸皆赖脾以濡养，故有后天之本之称。在五行属土，为阴中之至阴。脾与四时之长夏相应。",
                left:330,
                top: 344,
                width:91,
                height:103,
            },
        ],
    },
    init: async function () {
        this.reconstructMethod();
        this.bindEvent();
        this.organDraggable();
        /*
        await this.organInit();
        await this.bodyInit();*/
    },
    reconstructMethod: function () {//让函数的this变为外层的this
        this.organDblClicked = this.organDblClicked.bind(this);
        this.organCharacterShow = this.organCharacterShow.bind(this);
        this.organCharacterUnshow = this.organCharacterUnshow.bind(this);
        this.layerToggle = this.layerToggle.bind(this);
        this.organHintTwinkle = this.organHintTwinkle.bind(this);
        this.organDraggable = this.organDraggable.bind(this);
        this.organSizeInit = this.organSizeInit.bind(this);
    },
    bindEvent: function () {
        $("#acupoint_char").on('click', this.layerToggle);
        $("#layer1_char").on('click', this.layerToggle);
        $("#layer2_char").on('click', this.layerToggle);
        $('#gallbladder').on('dblclick', this.organDblClicked);
        $('#largeIntestine').on('dblclick', this.organDblClicked);
        $('#liver').on('dblclick', this.organDblClicked);
        $('#lung').on('dblclick', this.organDblClicked);
        $('#pancreas').on('dblclick', this.organDblClicked);
        $('#womb').on('dblclick', this.organDblClicked);
        $('#bladder').on('dblclick', this.organDblClicked);
        $('#heart').on('dblclick', this.organDblClicked);
        $('#smallIntestine').on('dblclick', this.organDblClicked);
        $('#stomach').on('dblclick', this.organDblClicked);
        $('#spleen').on('dblclick', this.organDblClicked);
    },
    organHintTwinkle: async function () {
        await sleep(1500)
        $('#organHint').css({
            'opacity': '0',
        })
        $('#organHint').animate({
            'opacity': '0.8',
        }, 100)
        $('#organHint').animate({
            'opacity': '0',
        }, 100)
        $('#organHint').animate({
            'opacity': '0.8',
        }, 100)
        $('#organHint').animate({
            'opacity': '0',
        }, 100)
    },
    organCharacterUnshow: async function () {
        for (let i = 0; i < this.organs.textAnimation.textCount; i++) {
            $('#organCharacter' + i).animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            }, 200);
            $('#organCharacter' + i).animate({
                "marginTop": 0 + 'px',
                "opacity": 0,
            }, 200);
            setTimeout(() => {
                $('#organCharacter' + i).remove()
            }, 400)
            await sleep(this.organs.textAnimation.ShowInterval / 2)
        }
        $('#organText').empty()
    },
    organCharacterShow: async function (target) {
        this.organs.textAnimation.textCount = 0
        let lineCount = 0
        for (let i = 0; i < target.length; i++) {
            if(!this.onShow) return
            if (i % this.organs.textAnimation.lineCharacters === 0) lineCount++;
            const organChar = $("<div></div>");
            organChar.attr({
                'class': 'organCharacter',
                'id': 'organCharacter' + i,
            })
            organChar.css({
                "textStroke":'0.3px #5b5230',
                "fontSize": this.organs.textAnimation.FontSize + 'px',
                "opacity": 0,
                'left': (this.organs.textAnimation.FontSize + this.organs.textAnimation.CharacterSpacing) * (i - (lineCount - 1) * this.organs.textAnimation.lineCharacters) + 'px',
                'top': (lineCount - 1) * (this.organs.textAnimation.FontSize + this.organs.textAnimation.LineSpacing) + 'px',
            });
            organChar.text(target.charAt(i))
            $('#organText').append(organChar);
            organChar.animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            }, 400);
            organChar.animate({
                "marginTop": 0 + 'px',
                "opacity": 1,
            }, 400);
            this.organs.textAnimation.textCount++
            await sleep(this.organs.textAnimation.ShowInterval)
        }
    },
    organDraggable: function () {
        for (let i = 0; i < 11; i++) {
            $('#'+this.organs.organs[i].name).draggable()
        }
    },
    organSizeInit: function () {
        for (let i = 0; i < 11; i++) {
            $('#'+this.organs.organs[i].name).css({
                'height':this.organs.organs[i].height*this.organs.organScale+'px',
                'width':this.organs.organs[i].width*this.organs.organScale+'px',
                'left':this.organs.organs[i].left+'px',
                'top':this.organs.organs[i].top+'px',
            })
        }
    },
    organDblClicked: async function (event, isStart) {
        if(! this.organs.showMutex) return;
        this.organs.showMutex = false
        let targetId
        let serial
        if(isStart === true) {
            targetId = 'lung'
            serial = 3
        }
        else {
            targetId = event.target.id
            serial = parseInt($('#'+targetId).attr('organId'))
        }
        if($('#organFocus').attr('on-show')===targetId) {
            this.organs.showMutex = true
            return
        }
        $('#organFocus').attr({
            'on-show':targetId
        })
        let lastImg = $('#organShow').attr('src')
        $('#organUnshow').attr({
            'src':lastImg,
        })
        $('#organUnshow').show()
        $('#organUnshow').fadeOut(500)

        $('#organShow').attr({
            'src':'./images/organs/focused/organs_'+targetId+'.png',
        })
        $('#organShow').hide()
        $('#organShow').fadeIn(500)

        await this.organCharacterUnshow()
        await this.organCharacterShow(this.organs.organs[serial].text)

        this.organs.showMutex = true
    },
    layerToggle: function (event) {
        let targetId = event.target.id
        switch (targetId) {
            case 'acupoint_char':{
                if($('#acupoint_char').attr('state')==='on') {
                    $('#acupoint_char').attr({
                        'state':'off',
                    })
                    $('#acupoint').fadeOut(500)
                    $('#acupoint_char').css({
                        'color':'#484f47',
                    })
                } else {
                    $('#acupoint_char').attr({
                    'state':'on',
                    })
                    $('#acupoint').fadeIn(500)
                    $('#acupoint_char').css({
                        'color':'#323023',
                    })
                }
                break
            }
            case 'layer1_char':{
                if($('#layer1_char').attr('state')==='on') {
                    $('#layer1_char').attr({
                        'state':'off',
                    })
                    $('#organ_layer1').fadeOut(500)
                    $('#layer1_char').css({
                        'color':'#484f47',
                    })
                } else {
                    $('#layer1_char').attr({
                        'state':'on',
                    })
                    $('#organ_layer1').fadeIn(500)
                    $('#layer1_char').css({
                        'color':'#323023',
                    })
                }
                break
            }
            case 'layer2_char':{
                if($('#layer2_char').attr('state')==='on') {
                    $('#layer2_char').attr({
                        'state':'off',
                    })
                    $('#organ_layer2').fadeOut(500)
                    $('#layer2_char').css({
                        'color':'#484f47',
                    })
                } else {
                    $('#layer2_char').attr({
                        'state':'on',
                    })
                    $('#organ_layer2').fadeIn(500)
                    $('#layer2_char').css({
                        'color':'#323023',
                    })
                }
                break
            }
        }
    },
};