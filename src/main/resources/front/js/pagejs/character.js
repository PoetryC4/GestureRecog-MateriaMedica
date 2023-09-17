
var CHARACTER_RENDERER = {
    onShow:false,//避免离开该part某些方法依然在执行。该值为false时，该类大部分方法立即停止
    showMutex: true,//在文字浮现过程中避免再次触发文字动画函数
    characterEvents:{
        showMutex:false,
        onshow:'',
        textAnimation:{
            textCount:0,
            FontSize: 26,
            CharacterSpacing:2,
            LineSpacing:5,
            lineCharacters: 29,
            ShowInterval: 0,//ms
        },
        writing:{
            text:'李时珍一生勤奋好学，对药物学的研究特别热衷，他经常到山林野外收集草药，对于草木花果的外形、习性、药用功效等都了如指掌。他曾经在《本草纲目》序言中写道：“余虽不才，愿以粗识，绍先贤之遗意，发一时之积蕴，庶几有裨于后世，有传于远人。”\n' +
                '\n' +
                '李时珍耗费了27年的时间撰写《本草纲目》，整部书分为16卷，约有1100余万字，收录药物1892种、附方1100余种。李时珍的研究、整理和归纳药物资料的方法和角度是前所未有的，他不仅在书中对药物的形态、生态、药理作了详细描述，还在药物的来源、历史、化学成分、药理作用等方面做了深入探讨。在这部著作中，李时珍对许多草药的生长环境、形态特征、药用功效进行了详细的描述和评价，其中很多内容至今仍然被广泛引用。\n' +
                '\n' +
                '由于李时珍在编纂《本草纲目》时的认真治学态度和深入探究的精神，他被誉为“东方药学宝库”的代表人物，这部著作成为中医药文化的经典之一，影响了中国乃至世界的药学、医学发展。',
            picName:'writing.png',
        },
        gathering:{
            text:'李时珍在撰写《本草纲目》的过程中，他亲身采集药材、观察研究，这些经历不仅成就了他卓越的药理学成就，也形成了不少传奇故事。以下是其中一则李时珍采药的故事：\n' +
                '\n' +
                '有一年，李时珍在寻找制药用的珍贵药材时，听闻一种名叫“千年银花”的药材，据传只在一座位于偏远山区的山顶上生长。李时珍决定亲自前往寻找这种神奇的药材。\n' +
                '\n' +
                '他穿过千山万水，跋山涉水，来到那座山顶。这里的地形险要，崎岖不平，加上极度寒冷，采集药材的过程非常艰难。尽管如此，李时珍仍然决定坚持下去。他找到了药材所在的地方，但那里的天气十分恶劣，大雪纷飞，可李时珍依旧兢兢业业地采集药材。\n' +
                '\n' +
                '由于采集药材的时间较长，加上天气十分恶劣，李时珍不幸感染了寒热病，身体状况极差。在这种情况下，他仍然坚持了下山，回到了家中，用这种药材亲手炮制出了一副药方，最终治好了自己的病。\n' +
                '\n' +
                '这次经历让李时珍更加坚定了自己的信念，他深深认识到了药物对于人类健康的重要性，也更加深刻地理解到，只有对于药材进行全面深入的了解和研究，才能发挥出药物的最大功效。',
            picName:'gathering.png',
        },
        talking:{
            text:'据传，李时珍担任太医院医官期间，他与众多患者进行过深入的交流，了解他们的病情、痛苦和需求，从而帮助他们治疗疾病，缓解痛苦。\n' +
                '\n' +
                '其中一则著名的故事是，一位名叫赵老的老人，因为胸口气滞，无法进食，经过多方治疗仍然未能好转，他前往太医院求医，最终找到了李时珍。\n' +
                '\n' +
                '李时珍认真询问了赵老的病情，并详细观察了他的身体。他认为赵老的病情属于中医学上的“胸中瘀滞”病症，而他所学的西方医学也称之为“胸腔积液”，因为心脏疾病或肺病等原因导致胸腔中积液，引起胸部不适和呼吸困难。\n' +
                '\n' +
                '李时珍向赵老详细解释了病因和治疗方法，而赵老则表示自己不相信中医，只相信西方医学。李时珍并没有生气或反驳，而是耐心地向赵老解释中医学的治疗理念和疗效，并邀请他试一试自己的治疗方案。\n' +
                '\n' +
                '赵老在听了李时珍的解释后，决定试一试中医的治疗方法。他按照李时珍的药方进行治疗，不久便感到身体逐渐好转，胃口增加，身体恢复了健康。',
            picName:'talking.png',
        },
        defaultC:{
            text:'李时珍（1518年－1593年），字东篱，号芝田，是明朝著名的医学家、药学家、博物学家和诗人。他出生于江西南昌，自幼聪颖好学，热爱医学和草药，曾游历多地采集草药，并与当地的医师交流学习。后来，他在大量的实践和学习中，积累了丰富的药物学和医学知识。\n' +
                '\n' +
                '李时珍最著名的贡献是编纂了《本草纲目》。这部著作是一部全面、系统地介绍中国草药和药物的著作，收录了药物条目达1万多种，超过了前代所有药物著作的总和。《本草纲目》的编纂历时27年，涵盖了当时的所有药物知识和经验，成为中医药学的重要参考书。\n' +
                '\n' +
                '李时珍的学术成就得到了当时的医学界的高度认可和赞赏。他曾受聘为御医，也曾担任官职，为了搜集草药和研究医药，他曾在全国各地旅行数万里。除此之外，他还积极传授药学和医学知识，推广中药治疗，强调实践经验的重要性，并为医学教育的改革提出了自己的见解和建议。\n' +
                '\n' +
                '李时珍除了在医学和药学方面的贡献，还是一位文学家和诗人，他的诗文清新简洁，以自然为题材，具有浓郁的人文情怀。\n' +
                '\n' +
                '李时珍一生致力于医学和药学的研究，成为中国传统医学和药学的重要代表人物之一，他的贡献不仅在中国，也对世界药学的发展做出了重要的贡献。他被誉为“中医药学之父”和“中国药王”。',
            picName:'default.png',
        },
    },

    init: async function () {
        this.reconstructMethod();
        this.bindEvent();
    },
    reconstructMethod: function () {//让函数的this变为外层的this
        this.LiCharacterShow= this.LiCharacterShow.bind(this);
        this.LiCharacterUnshow= this.LiCharacterUnshow.bind(this);
        this.LiPicShow= this.LiPicShow.bind(this);
        this.LiPicUnshow= this.LiPicUnshow.bind(this);
        this.LiLabelClicked= this.LiLabelClicked.bind(this);
    },
    bindEvent: function () {
        $("#writing").on('click', this.LiLabelClicked);
        $("#defaultC").on('click', this.LiLabelClicked);
        $("#gathering").on('click', this.LiLabelClicked);
        $("#talking").on('click', this.LiLabelClicked);
    },
    LiLabelClicked: async function (event,defaultP) {
        if (event !== null && event.target.id === this.characterEvents.onshow) return
        if(this.characterEvents.showMutex === true) return
        this.characterEvents.showMutex = true
        let clickedId = defaultP === 'defaultC'?'defaultC':event.target.id
        this.LiPicUnshow()
        this.LiPicShow(clickedId)
        await this.LiCharacterUnshow()
        await this.LiCharacterShow(clickedId)
        this.characterEvents.onshow = clickedId
        this.characterEvents.showMutex = false
    },
    LiPicShow: async function (eventId) {
        await sleep(400)
        const img = $("<img crossorigin='anonymous' alt='Li' src=''>");
        switch (eventId) {
            case 'writing':case 'writingC1':case 'writingC2':
                img.attr({
                    'src': './images/char/writing.png',
                    'id': 'writingPic',
                })
                $('#writingC1').css({
                    'color':'#ff7700',
                })
                $('#gatheringC1').css({
                    'color':'#293610',
                })
                $('#talkingC1').css({
                    'color':'#293610',
                })
                $('#defaultCC1').css({
                    'color':'#293610',
                })
                $('#writingC2').css({
                    'color':'#ff7700',
                })
                $('#gatheringC2').css({
                    'color':'#293610',
                })
                $('#talkingC2').css({
                    'color':'#293610',
                })
                $('#defaultCC2').css({
                    'color':'#293610',
                })
                break
            case 'gathering':case 'gatheringC1':case 'gatheringC2':
                img.attr({
                    'src': './images/char/gathering.png',
                    'id': 'gatheringPic',
                })
                $('#gatheringC1').css({
                    'color':'#ff7700',
                })
                $('#writingC1').css({
                    'color':'#293610',
                })
                $('#talkingC1').css({
                    'color':'#293610',
                })
                $('#defaultCC1').css({
                    'color':'#293610',
                })
                $('#gatheringC2').css({
                    'color':'#ff7700',
                })
                $('#writingC2').css({
                    'color':'#293610',
                })
                $('#talkingC2').css({
                    'color':'#293610',
                })
                $('#defaultCC2').css({
                    'color':'#293610',
                })
                break
            case 'talking':case 'talkingC1':case 'talkingC2':
                img.attr({
                    'src': './images/char/talking.png',
                    'id': 'talkingPic',
                })
                $('#talkingC1').css({
                    'color':'#ff7700',
                })
                $('#gatheringC1').css({
                    'color':'#293610',
                })
                $('#writingC1').css({
                    'color':'#293610',
                })
                $('#defaultCC1').css({
                    'color':'#293610',
                })
                $('#talkingC2').css({
                    'color':'#ff7700',
                })
                $('#gatheringC2').css({
                    'color':'#293610',
                })
                $('#writingC2').css({
                    'color':'#293610',
                })
                $('#defaultCC2').css({
                    'color':'#293610',
                })
                break
            default:
                img.attr({
                    'src': './images/char/defaultC.png',
                    'id': 'defaultCPic',
                })
                $('#defaultCC1').css({
                    'color':'#ff7700',
                })
                $('#gatheringC1').css({
                    'color':'#293610',
                })
                $('#writingC1').css({
                    'color':'#293610',
                })
                $('#talkingC1').css({
                    'color':'#293610',
                })
                $('#defaultCC2').css({
                    'color':'#ff7700',
                })
                $('#gatheringC2').css({
                    'color':'#293610',
                })
                $('#writingC2').css({
                    'color':'#293610',
                })
                $('#talkingC2').css({
                    'color':'#293610',
                })
                break
        }
        img.css({
            'left': '100px',
            'opacity': '0',
            'width': 0.9 * 512 + 'px',
        })
        $('#LiPics').append(img)
        img.animate({
            'left': '50px',
            'opacity': '1',
            'width': 512 + 'px',
        }, 500)

    },
    LiPicUnshow: function () {
        let picId = this.characterEvents.onshow
        if(picId === '') return
        $('#' + picId + 'Pic').animate({
            'left':'0',
            'opacity':'0',
            'width':512*0.9+'px',
        },500)
        setTimeout(()=>{
            $('#' + picId + 'Pic').remove()
        },500)
    },
    LiCharacterShow: async function (eventId) {
        this.characterEvents.textAnimation.textCount = 0
        $('#LiCharacters').empty()
        let targetString
        switch (eventId) {
            case 'writing':case 'writingC1':case 'writingC2':
                targetString = this.characterEvents.writing.text
                break
            case 'gathering':case 'gatheringC1':case 'gatheringC2':
                targetString = this.characterEvents.gathering.text
                break
            case 'talking':case 'talkingC1':case 'talkingC2':
                targetString = this.characterEvents.talking.text
                break
            default:
                targetString = this.characterEvents.defaultC.text
                break
        }
        let x = 0, y = 0
        for (let i = 0; i < targetString.length; i++) {
            if(!this.onShow) return
            if (targetString.charAt(i) === '\n' || x >= this.characterEvents.textAnimation.lineCharacters) {
                x = 0
                y++
            }
            const character = $("<div></div>");
            character.css({
                "textStroke":'0.2px #563e20',
                "fontSize": this.characterEvents.textAnimation.FontSize + 'px',
                "fontFamily": 'defaultCharacter',
                "opacity": 0,
                "position": 'absolute',
                /*'color': '#563e20',*/
                'color': '#000',
                'left': (this.characterEvents.textAnimation.FontSize + this.characterEvents.textAnimation.CharacterSpacing) * x + 'px',
                'top': (this.characterEvents.textAnimation.FontSize + this.characterEvents.textAnimation.LineSpacing) * y + 'px',
            });
            character.text(targetString.charAt(i))
            $('#LiCharacters').append(character);
            character.animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            }, 400);
            character.animate({
                "marginTop": 0 + 'px',
                "opacity": 1,
            }, 400);
            character.attr({
                'id': 'LiCharacter' + i,
            })
            x++;
            this.characterEvents.textAnimation.textCount ++
            await sleep(this.characterEvents.textAnimation.ShowInterval)
        }
        await sleep(800)
    },
    LiCharacterUnshow: async function() {
        for(let i = 0;i<this.characterEvents.textAnimation.textCount;i++) {
            $('#LiCharacter'+i).animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            },400);
            $('#LiCharacter'+i).animate({
                "marginTop": 0 + 'px',
                "opacity": 0,
            },400);
            setTimeout(()=>{
                $('#LiCharacter'+i).remove()
            },800)
            await sleep(this.characterEvents.textAnimation.ShowInterval)
        }
        await sleep(800)
    },
};