var RECORDER_RENDERER = {

    record:null,
    ws:null,

    init:function () {
        this.reconstructMethod()
        this.setParameters()
        this.bindEvent()
    },
    setParameters: function () {
        this.ws = null; //实现WebSocket
        this.record = null; //多媒体对象，用来处理音频
    },
    bindEvent: function () {
        //$('#intercomBegin').on('click',this.startRecorder)
        //$('#intercomEnd').on('click',this.endRecorder)
        $('#searchMicro').on('click',this.microClicked)
    },
    reconstructMethod: function () {
        this.microClicked = this.microClicked.bind(this);
        this.wsOnOpen = this.wsOnOpen.bind(this);
        this.setRecorder = this.setRecorder.bind(this);
        this.startRecorder = this.startRecorder.bind(this);
        this.endRecorder = this.endRecorder.bind(this);
        this.useWebSocket = this.useWebSocket.bind(this);
        this.mediaStreamF = this.mediaStreamF.bind(this);
        this.mediaError = this.mediaError.bind(this);
    },
    microClicked:function () {
        let state = $('#searchMicro').attr('state')
        if(state === 'off') {
            this.startRecorder()
            $('#searchMicro').attr({
                'state':'on',
            })
            $('#searchMicro').css({
                'color':'#f3ca92',
            })
        } else {
            this.endRecorder()
            $('#searchMicro').attr({
                'state':'off',
            })
            $('#searchMicro').css({
                'color':'#65552e',
            })
        }
    },
    setRecorder: function (rec) {
        this.record = rec
    },
    useWebSocket: function () {
        let baseUrl = 'localhost'
        this.ws = new WebSocket("ws://" + baseUrl + ":8089");
        this.ws.binaryType = 'arraybuffer'; //传输的是 ArrayBuffer 类型的数据
        this.ws.onopen = this.wsOnOpen
    },
    wsOnOpen:function () {
        console.log('握手成功');
        if (this.ws.readyState === 1) { //ws进入连接状态，则每隔500毫秒发送一包数据
            this.record.start();
        }
        this.ws.onmessage=function (event) {
            console.log('Message from server ', event);
        };
    },
    mediaStreamF: function (mediaStream) {
        this.useWebSocket();
        console.log('开始对讲');
        this.setRecorder(new Recorder(mediaStream,this.ws));
    },
    mediaError: function (error) {
        console.log(error);
        switch (error.message || error.name) {
            case 'PERMISSION_DENIED':
            case 'PermissionDeniedError':
                console.info('用户拒绝提供信息。');
                break;
            case 'NOT_SUPPORTED_ERROR':
            case 'NotSupportedError':
                console.info('浏览器不支持硬件设备。');
                break;
            case 'MANDATORY_UNSATISFIED_ERROR':
            case 'MandatoryUnsatisfiedError':
                console.info('无法发现指定的硬件设备。');
                break;
            default:
                console.info('无法打开麦克风。异常信息:' + (error.code || error.name));
                break;
        }
    },
    startRecorder: function () {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        if (!navigator.getUserMedia) {
            alert('浏览器不支持音频输入');
        } else {
            navigator.getUserMedia({
                    audio: true
                },
                this.mediaStreamF,
                this.mediaError,
            )
        }
    },
    endRecorder: function () {
        if (this.ws) {
            this.record.stop();
            console.log('关闭对讲以及WebSocket');
            this.ws.close(1000)
        }
    },
}

var Recorder = function (stream,ws) {
    this.recorderInit(stream,ws)
};
//录音对象
Recorder.prototype = {
    ws:null,
    sampleBits : 16, //输出采样数位 8, 16
    sampleRate : 16000, //输出采样率
    context : null,
    audioInput : null,
    recorder : null,
    buffer: [],
    size:0,
    audioData : {
        size: 0, //录音文件长度
        buffer: [], //录音缓存
        inputSampleRate: 48000, //输入采样率
        inputSampleBits: 16, //输入采样数位 8, 16
        outputSampleRate: 16000, //输出采样数位
        outputSampleBits: 16, //输出采样率
    },
    recorderInit:function (stream,ws) {
        this.reconstructMethod()
        this.setRecParameters(stream,ws)
    },
    setRecParameters: function (stream,ws) {
        this.ws = ws
        this.context = new AudioContext();
        this.audioInput = this.context.createMediaStreamSource(stream);
        this.recorder = this.context.createScriptProcessor(4096, 1, 1);
        this.recorder.onaudioprocess = this.audioProcess
    },
    reconstructMethod: function () {
        this.audioInputF = this.audioInputF.bind(this);
        this.sendData = this.sendData.bind(this);
        this.audioClear = this.audioClear.bind(this);
        this.audioProcess = this.audioProcess.bind(this);
        this.audioCompress = this.audioCompress.bind(this);
    },
    audioClear: function() {
        this.buffer = [];
        this.size = 0;
    },
    audioInputF: function(data) {
        this.buffer.push(new Float32Array(data));
        this.size += data.length;
    },
    audioCompress: function() { //合并压缩
        //合并
        let data = new Float32Array(this.size);
        let offset = 0;
        for (let i = 0; i < this.buffer.length; i++) {
            data.set(this.buffer[i], offset);
            offset += this.buffer[i].length;
        }
        //压缩
        let compression = parseInt(this.audioData.inputSampleRate / this.audioData.outputSampleRate);
        let length = data.length / compression;
        let result = new Float32Array(length);
        let index = 0,
            j = 0;
        while (index < length) {
            result[index] = data[j];
            j += compression;
            index++;
        }
        return result;
    },
    audioEncodePCM: function() { //这里不对采集到的数据进行其他格式处理，如有需要均交给服务器端处理。
        let sampleRate = Math.min(this.audioData.inputSampleRate, this.audioData.outputSampleRate);
        let sampleBits = Math.min(this.audioData.inputSampleBits, this.audioData.outputSampleBits);
        let bytes = this.audioCompress()
        let dataLength = bytes.length * (sampleBits / 8);
        let buffer = new ArrayBuffer(dataLength);
        let data = new DataView(buffer);
        let offset = 0;
        for (let i = 0; i < bytes.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, bytes[i]));
            data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
        //console.log(this.buffer)
        return new Blob([data]);
    },
    audioProcess: function (e) {
        let inputBuffer = e.inputBuffer.getChannelData(0);
        this.audioInputF(inputBuffer);
        this.sendData();
    },
    sendData : function() { //对以获取的数据进行处理(分包)
        let reader = new FileReader();
        reader.onload = e => {
            let outbuffer = e.target.result;
            let arr = new Int8Array(outbuffer);
            if (arr.length > 0) {
                let tmparr = new Int8Array(1024);
                let j = 0;
                for (let i = 0; i < arr.byteLength; i++) {
                    tmparr[j++] = arr[i];
                    if (((i + 1) % 1024) === 0) {
                        this.ws.send(tmparr);
                        if (arr.byteLength - i - 1 >= 1024) {
                            tmparr = new Int8Array(1024);
                        } else {
                            tmparr = new Int8Array(arr.byteLength - i - 1);
                        }
                        j = 0;
                    }
                    if ((i + 1 === arr.byteLength) && ((i + 1) % 1024) !== 0) {
                        this.ws.send(tmparr);
                    }
                }
            }
        };
        reader.readAsArrayBuffer(this.audioEncodePCM());
        this.audioClear();//每次发送完成则清理掉旧数据
    },

    start : function() {
        this.buffer = [];
        this.size = 0;
        this.audioInput.connect(this.recorder);
        this.recorder.connect(this.context.destination);
    },

    stop : async function () {
        this.recorder.disconnect();
        let resStr = ''
        for (let i = 0; i < 15; i++) {
            await getVocalData(null).then(res => {
                if (res.code === 1) {
                    console.log(resStr)
                    if(res.data!==undefined&&res.data!==null&&res.data.length>resStr.length) {
                        resStr = res.data
                        if(resStr !== '') {
                            if(resStr.length>2 &&resStr.charAt(resStr.length-2)==='。'||resStr.charAt(resStr.length-2)==='？') resStr = resStr.substring(0,resStr.length-2)
                            console.log(resStr)
                            $('#searchInput').val(resStr)
                        }
                    }
                } else {
                    console.log(res.msg || '操作失败')
                }
            }).catch(err => {
                console.log('请求出错了：' + err)
            });
            await sleep(200)
        }
        this.clear()
    },

    getBlob : function() {
        return this.audioEncodePCM()
    },

    clear : function() {
        this.audioClear()
    },
    onmessage: function(msg) {
        console.log(msg)
    },
}
