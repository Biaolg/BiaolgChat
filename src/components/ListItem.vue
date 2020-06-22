<template>
  <div class="Listitem" @click="toMassageWin" :class="{pos:pos}">
    <div class="head" :class="{animation:animation}">{{item.name?item.name:item.groupname}}</div>
    <div class="massage" :class="{posMsg:!pos,animation:animation}">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: "Listitem",
  props: ["item", "pos", "type"],
  data() {
    return {
      msg: "斩无消息",
      animation: false
    };
  },
  computed: {
    Massage() {
      if (this.$store.state.massage) {
        return this.$store.state.massage[this.$store.state.massage.length - 1];
      }
      return [];
    },
    id() {
      if (this.type == "groupchat") return this.item.groupid;
      else if (this.type == "chatroom") return this.item.id;
      return this.item.name;
    }
  },
  watch: {
    Massage(value) {
      this.messageTips(value);
    }
  },
  methods: {
    toMassageWin() {
      this.animation = false;
      this.$store.commit("setTarget", {
        id: this.id,
        type: this.type
      });
      if (this.type == "groupchat") {
        this.$store.commit("setTomassageTarget", this.item.groupname);
        return;
      }
      this.$store.commit("setTomassageTarget", this.item.name);
    },
    //消息提示
    messageTips(value) {
      if (!value.data) {
        return;
      }
      //好友列表消息提示
      if (
        //好友列表
        this.type == "chat" &&
        //哪个好友
        value.from == this.id &&
        //是否发送给本账号
        value.to == this.$store.state.user.userId &&
        //类型要为TEXT
        value.contentsType == "TEXT"
      ) {
        this.animation = true;
        this.msg = value.data;
        return;
      }
      //好友非TEXT类型提示
      if (
        //好友列表
        this.type == "chat" &&
        //哪个好友
        value.from == this.id &&
        //是否发送给本账号
        value.to == this.$store.state.user.userId
      ) {
        this.animation = true;
        this.msg = "有新消息";
        return;
      }
      //群组&聊天室消息
      if (value.to == this.id) {
        this.animation = true;
        this.msg = value.data;
        return;
      }
    }
  },
  created() {
    this.$store.state.massage.map(item => {
      this.messageTips(item);
    });
  }
};
</script>

<style lang="less" scoped>
.Listitem {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  &:hover {
    .head {
      border-radius: 0%;
      width: 100%;
      background-image: -webkit-linear-gradient(
        left,
        #fdfdfd,
        #cc74ff,
        #00b7ff
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      max-width: 1190px;
    }
    .massage {
      width: 0px;
      height: 0px;
      border: none;
    }
  }
}
.pos {
  flex-direction: row-reverse;
}
.animation {
  animation: mymove 2s infinite;
  // 200 230 200
  font-weight: 700;
  background-color: #aaa;
}
.head {
  overflow: hidden;
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 20px;
  transition: all 0.3s;
  border: 2px solid #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  z-index: 10;
}
.massage {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 50px);
  height: 50%;
  border: 2px solid #fff;
  border-right: none;
  border-radius: 50px 0 0 50px;
  margin-right: -5px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.3s;
}
.posMsg {
  margin-left: -5px;
  border: 2px solid #fff;
  border-left: none;
  border-radius: 0 50px 50px 0;
}
</style>