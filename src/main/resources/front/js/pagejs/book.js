
var BOOK_RENDERER = {
    onShow:false,//避免离开该part某些方法依然在执行。该值为false时，该类大部分方法立即停止
    currentIds:[],//轮播图中当前拥有的药材id集合
    searchEnable: false,
    showMutex:true,//在翻页时采用的动画互斥量，不允许翻页动画进行时还会触发翻页函数
    swiperCss:{//轮播图相关参数
        divSize:180,
        fontSize:32,
        cntSize:120,
        cntGap:30,
        tier3Scale:0.66,
        tier2Scale:0.8,
        tier1Scale:1,
    },
    book:{
        onShow:false,
        lineCharacters:15,
        bookFontSize: 30,
        bookCharacterSpacing:5,
        bookLineSpacing:25.8,
        bookShowInterval: 10,//ms
        playType: -1,
        durTransition: false,
        bookTitle:'',
        bookExplanations:'',
        bookInterpretation:'',
        characterCount: 0,
    },

    init: async function () {
        this.reconstructMethod();
        this.bindEvent();/*
        await sleep(150)
        await this.arrowClicked(null, true)
        await sleep(150)
        await this.arrowClicked(null, true)
        await sleep(150)
        await this.arrowClicked(null, true)*/
    },
    reconstructMethod: function () {//让函数的this变为外层的this
        this.generateNewPart = this.generateNewPart.bind(this);
        this.arrowClicked = this.arrowClicked.bind(this);
        this.bookCharacterShow = this.bookCharacterShow.bind(this);
        this.bookCharacterUnshow = this.bookCharacterUnshow.bind(this);
        this.bookClicked = this.bookClicked.bind(this);
        this.swiperPartClicked = this.swiperPartClicked.bind(this);
        this.searchAction = this.searchAction.bind(this);
    },
    bindEvent: function () {
        $('#bookContent').on('click', this.bookClicked);
        $('#swiperGoTop').on('click', this.arrowClicked);
        $('#swiperGoBottom').on('click', this.arrowClicked);
        $('#searchIcon').on('click', this.searchIconClicked);
        $('#searchInput').on('keydown', this.searchAction);
        $('#searchCheck').on('click', this.searchAction);
    },
    searchIconClicked: function () {
      this.searchEnable = !this.searchEnable
      if(this.searchEnable) {
          $('#searchInput').show()
          $('#searchInput').css({
              'width':'200px',
              'borderBottomWidth':'4px',
          })
      } else {
          $('#searchInput').css({
              'width':'0',
              'borderBottomWidth':'0',
          })
          setTimeout(()=>{
              $('#searchInput').hide()
          },300)
      }
    },
    searchAction: async function (event, check) {
        if (event.keyCode === 13 || event.target.id === 'searchCheck') {
            let code
            const params = {
                ingredientName:$('#searchInput').val(),
            }
            await getIngredientByName(params).then(res => {
                code = res.code
                if (res.code === 1) {
                    this.book.bookTitle = res.data.ingredientName
                    this.book.bookExplanations = res.data.explanations
                    this.book.bookInterpretation= res.data.interpretation
                } else {
                    console.log(res.msg || '操作失败')
                }
            }).catch(err => {
                console.log('请求出错了：' + err)
            });
            if(code === 1)
            this.bookClicked(null,true)
        }
    },
    bookClicked: async function (e,otherClicked) {
        if(otherClicked===false||e!==null) {
            let params = null
            await getRandomIngredient(params).then(res => {
                if (res.code === 1) {
                    this.book.bookTitle = res.data.ingredientName
                    this.book.bookExplanations = res.data.explanations
                    this.book.bookInterpretation= res.data.interpretation
                } else {
                    console.log(res.msg || '操作失败')
                }
            }).catch(err => {
                console.log('请求出错了：' + err)
            });
        }
        this.book.bookExplanations = this.book.bookExplanations.replace(/；/g," ");
        this.book.bookExplanations = this.book.bookExplanations.replace(/。/g," ");
        this.book.bookExplanations = this.book.bookExplanations.replace(/，/g," ");
        this.book.bookExplanations = this.book.bookExplanations.replace(/［/g,"『");
        this.book.bookExplanations = this.book.bookExplanations.replace(/］/g,"』");
        this.book.bookInterpretation = this.book.bookInterpretation.replace(/；/g," ");
        this.book.bookInterpretation = this.book.bookInterpretation.replace(/。/g," ");
        this.book.bookInterpretation = this.book.bookInterpretation.replace(/，/g," ");
        this.book.bookInterpretation = this.book.bookInterpretation.replace(/［/g,"『");
        this.book.bookInterpretation = this.book.bookInterpretation.replace(/］/g,"』");
        if(!this.book.durTransition) {
            this.book.durTransition = true
            if(this.book.playType === -1 ) {
                await this.bookCharacterUnshow();
                this.book.playType = 0
                $("#bookPlay2").attr({
                    'src': './video/book/bookAll.webm',
                })
                await sleep(2600);
                await this.bookCharacterShow();
            } else {
                let coo = this.book.characterCount
                await this.bookCharacterUnshow();
                $("#bookPlay").attr({
                    'src': './video/book/pageTurn2.webm',
                })
                this.book.playType = 0;
                await sleep(1200);
                await this.bookCharacterShow();
            }
            this.book.durTransition = false
        }
    },
    bookCharacterUnshow: async function() {
        for(let i = 0;i<this.book.characterCount;i++) {
            $('#bookCharacter'+i).animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            },400);
            $('#bookCharacter'+i).animate({
                "marginTop": 0 + 'px',
                "opacity": 0,
            },400);
            setTimeout(()=>{
                $('#bookCharacter'+i).remove()
            },800)
            await sleep(this.book.bookShowInterval)
        }
        this.book.characterCount = 0
    },
    bookCharacterShow: async function () {
        for (let i = 0; i < this.book.bookTitle.length; i++) {
            if(!this.onShow) return
            if(!this.book.onShow) continue;
            const character = $("<div></div>");
            character.css({
                "textStroke":"0.4px #563e20",
                "fontSize": this.book.bookFontSize+'px',
                "fontFamily":'defaultCharacter',
                "opacity":0,/*
                "filter": 'drop-shadow(5px 5px 2px rgba(52, 47, 13, 0.82))',*/
                "position":'absolute',
                //'color': '#563e20',
                'color': '#000',
                'left': 550 +'px',
                'top': (this.book.bookFontSize + this.book.bookCharacterSpacing) * i +'px',
            });
            character.text(this.book.bookTitle.charAt(i))
            $('#bookString').append(character);
            character.animate({
                "marginTop": -10 + 'px',
                "opacity": 0.5,
            },400);
            character.animate({
                "marginTop": 0 + 'px',
                "opacity": 1,
            },400);
            character.attr({
                'id': 'bookCharacter'+this.book.characterCount,
            })
            this.book.characterCount ++;
            await sleep(this.book.bookShowInterval)
        }
        let lineCount =0;
        if(this.book.bookExplanations!==undefined&&this.book.bookExplanations!==null&&this.book.bookExplanations!=='') {
            for (let i = 0; i < this.book.bookExplanations.length; i++) {
                if(!this.book.onShow) continue;
                if(i%this.book.lineCharacters===0) lineCount++;
                if(lineCount>12) break;
                const character = $("<div></div>");
                character.css({
                    "textStroke":"0.23px #563e20",
                    "fontSize": this.book.bookFontSize+'px',
                    "fontFamily":'FZTZ',
                    "opacity":0,
                    "position":'absolute',
                    /*'color': '#5b5230',*/
                    'color': '#000',
                    'left': 550 - (lineCount>6?86:0) - (this.book.bookFontSize + this.book.bookLineSpacing) * lineCount +'px',
                    'top': (this.book.bookFontSize + this.book.bookCharacterSpacing) * (i - (lineCount - 1) * this.book.lineCharacters) +'px',
                });
                if(this.book.bookExplanations.charAt(i) === ')' ||this.book.bookExplanations.charAt(i) === '(' ||this.book.bookExplanations.charAt(i) === '）' ||this.book.bookExplanations.charAt(i) === '（' ||this.book.bookExplanations.charAt(i) === '『' || this.book.bookExplanations.charAt(i) === '』' || this.book.bookExplanations.charAt(i) === '《' ||this.book.bookExplanations.charAt(i) === '》') {
                    character.css({
                        'transform': 'rotate(90deg)',
                    })
                }
                character.text(this.book.bookExplanations.charAt(i))
                $('#bookString').append(character);
                character.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                },400);
                character.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                },400);
                character.attr({
                    'id': 'bookCharacter'+this.book.characterCount,
                })
                this.book.characterCount ++;
                await sleep(this.book.bookShowInterval)
            }
            lineCount++;
        }
        if(this.book.bookInterpretation!==undefined&&this.book.bookInterpretation!==null&&this.book.bookInterpretation!=='') {
            for (let i = 0; i < this.book.bookInterpretation.length; i++) {
                if (!this.book.onShow) continue;
                if (i % this.book.lineCharacters === 0) lineCount++;
                if(lineCount>12) break;
                const character = $("<div></div>");
                character.css({
                    "fontSize": this.book.bookFontSize + 'px',
                    "fontFamily": 'FZTZ',
                    "opacity": 0,
                    "position": 'absolute',
                    /*'color': '#5b5230',*/
                    'color': '#000',
                    'left': 550 - (lineCount > 6 ? 86 : 0) - (this.book.bookFontSize + this.book.bookLineSpacing) * lineCount + 'px',
                    'top': (this.book.bookFontSize + this.book.bookCharacterSpacing) * (i - (lineCount - 1) * this.book.lineCharacters) + 'px',
                });
                if(this.book.bookInterpretation.charAt(i) === ')' ||this.book.bookInterpretation.charAt(i) === '(' ||this.book.bookInterpretation.charAt(i) === '）' ||this.book.bookInterpretation.charAt(i) === '（' ||this.book.bookInterpretation.charAt(i) === '『' || this.book.bookInterpretation.charAt(i) === '』' || this.book.bookInterpretation.charAt(i) === '《' ||this.book.bookInterpretation.charAt(i) === '》') {
                    character.css({
                        'transform': 'rotate(90deg)',
                    })
                }
                character.text(this.book.bookInterpretation.charAt(i))
                $('#bookString').append(character);
                character.animate({
                    "marginTop": -10 + 'px',
                    "opacity": 0.5,
                }, 400);
                character.animate({
                    "marginTop": 0 + 'px',
                    "opacity": 1,
                }, 400);
                character.attr({
                    'id': 'bookCharacter' + this.book.characterCount,
                })
                this.book.characterCount++;
                await sleep(this.book.bookShowInterval)
            }
        }
    },
    generateNewPart: async function (atTop) {
        let mdcName = null;
        let mdcType = null;
        let mdcId = null;
        let mdcPic = null;
        let params = null
        if(this.currentIds.length !== 0) {
            params = {
                existingIds:this.currentIds+'',
            }
        }
        await getRandomIngredient(params).then(res => {
            if (res.code === 1) {
                switch (res.data.ingredientType) {
                    case 0:
                        mdcType = '水  部';
                        break;
                    case 1:
                        mdcType = '火  部';
                        break;
                    case 2:
                        mdcType = '土  部';
                        break;
                    case 3:
                        mdcType = '金石部';
                        break;
                    case 4:
                        mdcType = '草  部';
                        break;
                    case 5:
                        mdcType = '谷  部';
                        break;
                    case 6:
                        mdcType = '菜  部';
                        break;
                    case 7:
                        mdcType = '果  部';
                        break;
                    case 8:
                        mdcType = '木  部';
                        break;
                    case 9:
                        mdcType = '服器部';
                        break;
                    case 10:
                        mdcType = '虫  部';
                        break;
                    case 11:
                        mdcType = '鳞  部';
                        break;
                    case 12:
                        mdcType = '介  部';
                        break;
                    case 13:
                        mdcType = '禽  部';
                        break;
                    case 14:
                        mdcType = '兽  部';
                        break;
                    case 15:
                        mdcType = '人  部';
                        break;
                    default:
                        break;
                }//hzyToBeImproved
                mdcName = res.data.ingredientName
                mdcPic = res.data.picName
                mdcId = res.data.ingredientId
                this.currentIds.push(mdcId)
            } else {
                console.log(res.msg || '操作失败')
            }
        }).catch(err => {
            console.log('请求出错了：' + err)
        });
        const partDivP = $('<div></div>')
        partDivP.attr({
            'id':'swiperPartP'+mdcId,
            'class':'swiperPartP',
            'swiperPos': atTop?'topOrigin':'bottomOrigin',
            'mdcId':mdcId,
            'mdcType': mdcType,
        })
        partDivP.css({
            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
            'height':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',

            'top':(atTop?-50:450)-this.swiperCss.divSize*this.swiperCss.tier3Scale/2+'px',
            'opacity':0,
        })
        $('#swiperContent').append(partDivP)
        partDivP.bind('click',this.swiperPartClicked)
      const partDiv=$('<div></div>')
        partDiv.attr({
            'id':'swiperPart'+mdcId,
            'class':'swiperPart',
            'mdcId':mdcId,
        })
        partDiv.css({
            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
            'height':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
            'zIndex':0,
        })
        partDivP.append(partDiv)
        /*
        if(mdcPic !== null && mdcPic !== '') {
            const partImg = $('<img crossorigin="anonymous" alt="null">')
            partImg.attr({
                'id':'swiperPartContent'+mdcId,
                'src':'./images/mdc/swiper/'+mdcPic,
            })
            partImg.css({
                'width':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                'height':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                'left':this.swiperCss.cntGap*this.swiperCss.tier3Scale+'px',
                'top':this.swiperCss.cntGap*this.swiperCss.tier3Scale+'px',
                'zIndex':1,
            })
            partDiv.append(partImg)
        } else*/
            const partTxt = $('<div></div>')
            partTxt.text(mdcName)
            partTxt.attr({
                'id':'swiperPartContent'+mdcId,
                'mdcId':mdcId,
                'class':'swiperPartContent',
            })
            partTxt.css({
                'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                'height':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                'top':this.swiperCss.cntGap*this.swiperCss.tier3Scale+'px',
                'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                'fontSize':this.swiperCss.FontSize*this.swiperCss.tier3Scale+'px',
                'color':'#ffe85b',
                'zIndex':1,
            })
            partTxt.bind('click',this.swiperPartClicked)
            partDiv.append(partTxt)
    },
    swiperPartClicked: async function (event) {
        let mdcId = $('#'+event.target.id).attr('mdcId');
        const params = {
            ingredientId:mdcId,
        }
        await getIngredientById(params).then(res => {
            if (res.code === 1) {
                this.book.bookTitle = res.data.ingredientName
                this.book.bookExplanations = res.data.explanations
                this.book.bookInterpretation= res.data.interpretation
            } else {
                console.log(res.msg || '操作失败')
            }
        }).catch(err => {
            console.log('请求出错了：' + err)
        });
        this.bookClicked(null,true)
    },
    arrowClicked: async function (event,atTop) {
        await sleep(100)
        if(atTop === undefined)
            atTop = (event.target.id === 'swiperGoTop' || event.target.id === 'swiperGoTopArrow')
        await this.generateNewPart(!atTop)
        let idToDel = null
        let idxToDel = null
        for(let i = 0;i<this.currentIds.length;i++) {
            $('#swiperPartP'+this.currentIds[i]).css({
                'transition':'none',
            })
        }
        if(atTop) {
            for(let i = 0;i<this.currentIds.length;i++) {
                switch($('#swiperPartP'+this.currentIds[i]).attr('swiperPos')) {
                    case 'top':
                        idxToDel = i
                        idToDel = this.currentIds[i]
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'topDis',
                        })

                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':0,
                        })

                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':1,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'opacity':0,
                            'left':0,
                            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'top':-50-this.swiperCss.divSize*this.swiperCss.tier3Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                        },200)

                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier3Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier3Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                        },200)
                        break;
                    case 'medium':
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'top',
                        })
                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':1,
                        })
                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':2,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'left':(this.swiperCss.tier3Scale - this.swiperCss.tier2Scale)*this.swiperCss.divSize+'px',
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'top':75-this.swiperCss.divSize*this.swiperCss.tier2Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier2Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier2Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        break;
                    case 'bottom':
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'medium',
                        })
                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':2,
                        })
                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':3,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'left':(this.swiperCss.tier2Scale - this.swiperCss.tier1Scale)*this.swiperCss.divSize+'px',
                            'width':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'top':200-this.swiperCss.divSize*this.swiperCss.tier1Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                        },200)
                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier1Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier1Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier1Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier1Scale+'px',
                        },200)
                        break;
                    case 'bottomOrigin':
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'bottom',
                        })
                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':1,
                        })
                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':2,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'opacity':1,
                            'left':(this.swiperCss.tier3Scale - this.swiperCss.tier2Scale)*this.swiperCss.divSize+'px',
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'top':325-this.swiperCss.divSize*this.swiperCss.tier2Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier2Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier2Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        break;
                }
            }
        } else {
            for(let i = 0;i<this.currentIds.length;i++) {
                switch($('#swiperPartP'+this.currentIds[i]).attr('swiperPos')) {
                    case 'bottom':
                        idxToDel = i
                        idToDel = this.currentIds[i]
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'bottomDis',
                        })
                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':0,
                        })
                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':1,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'opacity':0,
                            'left':0,
                            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'top':450-this.swiperCss.divSize*this.swiperCss.tier3Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                        },200)
                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier3Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier3Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier3Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier3Scale+'px',
                        },200)
                        break;
                    case 'medium':
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'bottom',
                        })
                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':1,
                        })
                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':2,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'left':(this.swiperCss.tier3Scale - this.swiperCss.tier2Scale)*this.swiperCss.divSize+'px',
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'top':325-this.swiperCss.divSize*this.swiperCss.tier2Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier2Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier2Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        break;
                    case 'top':
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'medium',
                        })
                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':2,
                        })
                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':3,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'left':(this.swiperCss.tier2Scale - this.swiperCss.tier1Scale)*this.swiperCss.divSize+'px',
                            'width':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'top':200-this.swiperCss.divSize*this.swiperCss.tier1Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                        },200)
                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier1Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier1Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier1Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier1Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier1Scale+'px',
                        },200)
                        break;
                    case 'topOrigin':
                        $('#swiperPartP'+this.currentIds[i]).attr({
                            'swiperPos':'top',
                        })
                        $('#swiperPart'+this.currentIds[i]).css({
                            'zIndex':1,
                        })
                        $('#swiperPartContent'+this.currentIds[i]).css({
                            'zIndex':2,
                        })
                        $('#swiperPartP'+this.currentIds[i]).animate({
                            'left':(this.swiperCss.tier3Scale - this.swiperCss.tier2Scale)*this.swiperCss.divSize+'px',
                            'opacity':1,
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'top':75-this.swiperCss.divSize*this.swiperCss.tier2Scale/2+'px',
                        },200)
                        $('#swiperPart'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        $('#swiperPartContent'+this.currentIds[i]).animate({
                            'width':this.swiperCss.divSize*this.swiperCss.tier2Scale+'px',
                            'height':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                            'top':this.swiperCss.cntGap*this.swiperCss.tier2Scale+'px',
                            'fontSize':this.swiperCss.fontSize*this.swiperCss.tier2Scale+'px',
                            'lineHeight':this.swiperCss.cntSize*this.swiperCss.tier2Scale+'px',
                        },200)
                        break;
                }
            }
        }
        setTimeout(()=>{
            for(let i = 0;i<this.currentIds.length;i++) {
                $('#swiperPartP'+this.currentIds[i]).css({
                    'transition':'0.2s ease',
                })
            }
            if(idxToDel !== null) {
                $('#swiperPartP'+idToDel).remove()
                for(let i=0;i<this.currentIds.length;i++) {
                    if(this.currentIds[i] === idToDel) {
                        this.currentIds.splice(i,1)
                        break;
                    }
                }
            }
        },200)
    },
};