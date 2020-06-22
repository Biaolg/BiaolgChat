import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    //组件状态_______________________________________________
    //弹出框状态
    eject: {
      sheen: false,
      ifinput: false,
      title: '标题',
      content: '内容',
      btntitle: {
        yes: '确认',
        no: '取消'
      }
    },
    londing: {
      sheen: false,
      title: '加载中'
    },
    // 路由状态______________________________________________
    //ling状态
    ling: {
      sheen: false
    },

    // 账号相关信息__________________________________________
    user: {
      userId: '',
      myFriend: [],
      myGroup: [],
      chatRoom: []
    },

    // 聊天目标______________________________________________
    target: {
      id: '',
      type: ''
    },

    //接收消息_________________________________________________
    massage: [],

    // 发送消息________________________________________________
    tomassage: {
      target: '',
      text: ''
    },

    //同意好友__________________________________________________
    FriendsAdd: {
    },
    tpismusic: 0
  },
  mutations: {
    // 组件状态设置_________________________________________________________________________________________

    //弹出框开始_______________________________________________
    //弹出框btn选择
    setEjectBtnchoice(state, value) {
      state.eject.btnchoice = value;
    },
    //弹出框显隐设置
    setEjectSheen(state, value) {
      state.eject.sheen = value;
    },
    //弹出框状态设置
    setEject(state, value) {
      state.eject = value;
    },
    //弹出框结束________________________________________________

    //加载中状态设置____________________________________________
    setLonging(state, value) {
      state.londing = value;
    },
    //单独显隐设置
    setLoadingSheen(state, value) {
      state.londing.sheen = value;
    },
    //加载中状态设置end_________________________________________


    //路由状态设置__________________________________________________________________________________________
    //ling状态设置______________________________________________
    setLingSheen(state, value) {
      state.ling.sheen = value;
    },
    //ling状态设置end___________________________________________

    //消息相关_______________________________________________________________________________________________
    //好友列表
    setMyFriend(state, value) {
      state.user.myFriend = value;
    },
    //群组列表
    setMyGroup(state, data) {
      state.user.myGroup = data;
    },
    //聊天室列表
    setChatRoom(state, data) {
      state.user.chatRoom = data;
    },

    //接收消息______________________________________________________
    setMassage(state, obj) {
      state.massage.push(obj);
    },

    // 发送消息______________________________________________________
    steTomassageValue(state, value) {
      state.tomassage.text = value;
    },
    setTomassageTarget(state, id) {
      state.tomassage.target = id;
    },

    //设置聊天目标____________________________________________________
    setTarget(state, obj) {
      state.target = obj;
    },

    // 好友添加_______________________________________________________
    setFriendsAdd(state, obj) {
      state.FriendsAdd = obj;
    },

    //提示音___________________________________________________________
    setTpismusic(state) {
      state.tpismusic++;
    }
  },
  actions: {

  },
  getters: {

  }
})
