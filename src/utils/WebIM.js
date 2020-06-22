import config from "./WebIMConfig";
import websdk from "easemob-websdk";
import emedia from "easemob-emedia";
import webrtc from "easemob-webrtc";

function ack(message) {
    var bodyId = message.id; // 需要发送已读回执的消息id
    var msg = new WebIM.message("read", WebIM.conn.getUniqueId());
    msg.set({
        id: bodyId,
        to: message.from
    });
    WebIM.conn.send(msg.body);
}

// 初始化IM SDK
var WebIM = {};
WebIM = window.WebIM = websdk;
WebIM.config = config;
WebIM.conn = new WebIM.connection({
    appKey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery
});
if (!WebIM.conn.apiUrl) {
    WebIM.conn.apiUrl = WebIM.config.apiURL;
}


let tool = {
    //查询好友
    queryFriends: function () {
        //查询好友列表
        WebIM.conn.getRoster({
            success: function (roster) {
                let arr = [];
                for (var i = 0, l = roster.length; i < l; i++) {
                    var ros = roster[i];
                    if (ros.subscription === 'both' || ros.subscription === 'to') {
                        arr.push(ros);
                    }
                }
                Vue.$store.commit('setMyFriend', arr);
            },
        });
    },
    //查询群组
    queryGroup: function () {
        // 列出当前登录用户加入的所有群组
        WebIM.conn.getGroup({
            success: function (resp) {
                // console.log("群组: ", resp)
                Vue.$store.commit('setMyGroup', resp.data);
            },
            error: function (e) { }
        });
    },
    //查询聊天室
    queryChatRoom: function () {
        // 列出所有聊天室，支持分页查询
        WebIM.conn.getChatRooms({
            apiUrl: 'https://a1.easemob.com',
            pagenum: 1,                                 // 页数
            pagesize: 20,                               // 每页个数
            success: function (list) {
                Vue.$store.commit('setChatRoom', list.data);
            },
            error: function () {
                console.log('List chat room error');
            }
        });
    }
}

// 注册监听回调
WebIM.conn.listen({
    onOpened: function (message) { // 连接成功回调
        Vue.$store.commit("setLoadingSheen", false);
        tool.queryFriends();
        tool.queryGroup();
        tool.queryChatRoom();
    },
    onClosed: function (message) {// 连接关闭回调
    },
    onTextMessage: function (message) {// 收到文本消息     
        Vue.$store.commit('setMassage', message);
        Vue.$store.commit('setTpismusic');
    },
    onEmojiMessage: function (message) {// 收到表情消息

    },
    onPictureMessage: function (message) {// 收到图片消息

    },
    onCmdMessage: function (message) {// 收到命令消息

    },
    onAudioMessage: function (message) {// 收到音频消息

    },
    onLocationMessage: function (message) {// 收到位置消息

    },
    onFileMessage: function (message) {// 收到文件消息

    },
    onVideoMessage: function (message) {// 收到视频消息

    },
    onPresence: function (message) {// 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息

        //（发送者希望订阅接收者的出席信息），即别人申请加你为好友
        if (message.type === 'subscribe') {
            //弹出模态框
            Vue.$store.commit('setFriendsAdd', message);
            Vue.$store.commit('setEject', {
                sheen: true,
                ifinput: false,
                title: message.from + '请求添加好友',
                content: message.from + ':' + message.status,
                btntitle: {
                    yes: '同意',
                    no: '忽略'
                }
            })
        }
        if (message.type === 'subscribed') {
            // console.log(message);
            //弹出模态框
            Vue.$store.commit('setEject', {
                sheen: true,
                ifinput: false,
                title: '广播消息',
                content: message.from + '同意您的申请',
                btntitle: {
                    yes: '确定',
                    no: ''
                }
            })
            tool.queryFriends();
        }

    },
    onRoster: function (message) {// 处理好友申请
        console.log("onRoster", message);
    },
    onInviteMessage: function (message) {// 处理群组邀请
        console.log("onInviteMessage", message);
    },
    onOnline: function () {// 本机网络连接成功
        console.log("onOnline 网络已连接");
    },
    onOffline: function () {// 本机网络掉线
        console.log("onOffline 网络已断开");
    },
    onError: function (message) {
        let err = JSON.parse(message.data.data).error_description;
        if (message.type == 0) {
            console.log('请输入账号密码')
        } else if (message.type == 28) {
            console.log("未登陆")
        } else if (err == "user not found" || err == "invalid password" || err == "user not activated") {
            //弹出模态框
            Vue.$store.commit('setEject', {
                sheen: true,
                ifinput: false,
                title: '登录',
                content: '用户名或密码不正确!',
                btntitle: {
                    yes: '注册账号',
                    no: '返回'
                }
            })
        } else if (message.type == "504") {
            // Message("消息撤回失败");
            console.log("消息撤回失败");
        }
        // 报错返回到登录页面
        // Vue.$router.push({ path: '/login' });
    }, // 失败回调
    onRecallMessage: message => {

    },
    onBlacklistUpdate: function (list) { // 黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        // 更新好友黑名单

    },
    onReceivedMessage: function (message) {

    }, // 收到消息送达服务器回执

    onDeliveredMessage: function (message) {
        console.log("onDeliveredMessage", message);
        // Vue.$store.commit('updateMessageStatus', message)
    }, // 收到消息送达客户端回执

    onReadMessage: function (message) {
        console.log("onReadMessage", message);
    }, // 收到消息已读回执

    onCreateGroup: function (message) {
        console.log("onCreateGroup", message);
    }, // 创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) {
        console.log("onMutedMessage", message);
    } // 如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});

WebIM.Tool = tool;
WebIM.WebRTC = webrtc;
WebIM.EMedia = emedia;
export default WebIM;