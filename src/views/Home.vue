<template>
  <div id="home">
    <div class="welcome">
      <div>
        <h1>{{$store.state.user.userId}}</h1>
      </div>
    </div>

    <!-- 头部栏 -->
    <div class="top"></div>
    <div class="director">
      <div class="left" :style="!listSheen&&{transform:` translateX(-100%)`}">
        <div class="newsList">
          <div class="listTitle">
            <div>消息列表</div>
            <div @click="listSheen=false">
              <svg
                class="bi bi-chevron-left"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </div>
          </div>
          <!-- 好友列表 -->
          <NewsList :list="friendList" :type="`chat`">好友列表</NewsList>
          <!-- 群组列表 -->
          <NewsList :list="group" :type="`groupchat`">群组列表</NewsList>
          <!-- 聊天室列表 -->
          <NewsList :list="chatRoom" :type="`chatroom`">聊天室</NewsList>
        </div>
      </div>

      <div class="right">
        <div class="Sheenwindow">
          <div class="title">
            <!-- 列表展开按钮 -->
            <div class="listBtn" @click="listShow">
              <svg
                class="bi bi-justify"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </div>
            <h1>{{topTitle}}</h1>
            <!-- 功能按钮 -->
            <div class="functionBtn" @click="addClick">
              <svg
                class="bi bi-plus-circle"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                />
                <path
                  fill-rule="evenodd"
                  d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
              </svg>
            </div>
          </div>
          <!-- 聊天框 -->
          <div class="anms">
            <LoandAnms :title="amnsTitle"></LoandAnms>
          </div>
          <ChatWin></ChatWin>
        </div>
        <div class="inputwindow">
          <div class="toMsgbtn">
            <!-- animation: mymove 5s infinite; -->
            <button
              :style="massgeg!=''&&{animation:'mymove 5s infinite'}"
              type="button"
              class="gobtn btn btn-primary"
              @click="toMassage"
            >发送</button>
          </div>
          <div class="txt">
            <textarea
              @click="listSheen=false"
              @keyup.enter="toMassage"
              :disabled="disableInput&&`disabled`"
              v-model="massgeg"
              rows="10"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsList from "../components/NewsList";
import ChatWin from "../components/ChatWin";
import LoandAnms from "../components/LoandAnms";

export default {
  name: "hoem",
  data() {
    return {
      massgeg: "",
      listSheen: false
    };
  },
  computed: {
    //target Title
    topTitle() {
      return this.$store.state.tomassage.target;
    },
    //动画title
    amnsTitle() {
      let topo = "Welcome to BiaolgChat";
      this.$store.state.massage.map(item => {
        if (item.from) {
          topo = item.from;
        }
      });
      return topo;
    },
    //好友列表
    friendList() {
      return this.$store.state.user.myFriend;
    },
    //群组列表
    group() {
      return this.$store.state.user.myGroup;
    },
    //聊天室列表
    chatRoom() {
      return this.$store.state.user.chatRoom;
    },
    //输入框禁用
    disableInput() {
      return this.$store.state.target.id == "";
    },
    //是否为聊天室
    chatRoom_b() {
      if (this.$store.state.target.type == "chatroom") {
        return true;
      }
      return false;
    }
  },
  watch: {
    topTitle() {
      this.listSheen = false;
    }
  },
  components: {
    NewsList,
    ChatWin,
    LoandAnms
  },
  methods: {
    //发送消息
    toMassage() {
      if (this.massgeg == "\n" || this.massgeg == "") {
        this.massgeg = "";
        return;
      }

      var id = WebIM.conn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: this.massgeg, // 消息内容
        to: this.$store.state.target.id, // 接收消息对象（用户id）
        roomType: this.chatRoom_b,
        success: function(id, serverMsgId) {
          console.log("send private text Success");
        }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
        fail: function(e) {
          console.log("Send private text error");
        } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
      });

      if (this.$store.state.target.type != "chat") {
        msg.setGroup("groupchat");
      }

      WebIM.conn.send(msg.body);
      msg.body.type = this.$store.state.target.type;
      this.$store.commit("setMassage", msg.body);

      //输入回空
      this.massgeg = "";
    },
    listShow() {
      this.listSheen = !this.listSheen;
    },
    //添加操作
    addClick() {
      this.$store.commit("setEject", {
        sheen: true,
        ifinput: true,
        title: "添加好友",
        content: "请输入用户名:",
        btntitle: {
          yes: "添加",
          no: "取消"
        }
      });
    }
  },
  created() {
    if (this.$store.state.token == "") {
      this.$router.push("Ling");
    }
  },
  mounted() {
    setTimeout(() => {
      this.listSheen = true;
    }, 3000);
  }
};
</script>

<style lang="less" scoped>
#home {
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
@keyframes titleMove {
  0% {
    height: 100%;
  }
  100% {
    height: 50px;
  }
}
.welcome {
  animation: titleMove 3s;
  width: 100%;
  height: 50px;
  position: fixed;
  z-index: 100;
  display: flex;
  background-color: #000;
  align-items: center;
  border-bottom: 2px #fff solid;
  > div {
    margin: 10px;
    background-image: -webkit-linear-gradient(
      left,
      rgb(253, 253, 253),
      #6700a3,
      rgb(0, 183, 255)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    span {
      display: inline-block;
    }
  }
}
.top {
  margin-top: 50px;
}
.listTitle {
  height: 50px;
  border-bottom: 2px solid #fff;
  line-height: 50px;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
}
.director {
  height: calc(100% - 50px);
  position: relative;
  display: flex;
  .left {
    min-width: 300px;
    border: solid #fff 2px;
    position: absolute;
    background-color: #000;
    height: 100%;
    z-index: 90;
    transition: all 0.5s;
  }
  .right {
    width: 100%;
    border-right: solid #fff 2px;
    border-bottom: #fff solid 2px;
    border-left: solid #fff 2px;
    padding: 0px;
    .Sheenwindow {
      width: 100%;
      height: 70%;
      position: relative;
      border-bottom: 2px #fff solid;
      .anms {
        width: 100%;
        height: calc(100% - 50px);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title {
        text-align: center;
        height: 50px;
        border-bottom: #fff solid 2px;
        background-color: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
          padding: 0px;
          margin: 0px;
        }
        > div {
          width: 30px;
          height: 30px;
          margin: 0px 10px;
        }
        svg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}

.inputwindow {
  height: 100%;
  min-height: 100px;
  .toMsgbtn {
    height: 50px;
  }
  .txt {
    width: 100%;
    height: calc(100% - 50px);
    position: relative;
    textarea {
      width: 100%;
      border: none;
      resize: none;
      padding: 1vw;
      background-color: #000;
      color: #fff;
      outline: none;
      transition: all 0.3s;
      &:focus {
        background-color: #999;
        animation: mymoveinset infinite 5s;
      }
    }
  }
  .gobtn {
    z-index: 2000;
    width: 100px;
    height: 30px;
    margin: 10px;
    float: right;
    background-color: #000;
    border: none;
    transition: all 1s;
    border-radius: 50px;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      color: #000;
      background-color: #eee;
    }
  }
}
</style>