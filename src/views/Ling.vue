<template>
  <div class="Ling">
    <div class="box" :class="{register:!register}">
      <!-- 注册 -->
      <div class="Logo">
        <h1>注册账号</h1>
      </div>
      <form>
        <div class="form-group toinp">
          <label for="exampleInputEmail2">账号</label>
          <input type="text" class="form-control" id="exampleInputEmail2" v-model="user" />
        </div>
        <div class="form-group toinp">
          <label for="exampleInputPassword2">密码</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword2" />
        </div>
        <div class="form-group toinp">
          <label for="exampleInputNickName">昵称</label>
          <input v-model="nickName" type="text" class="form-control" id="exampleInputNickName" />
        </div>
        <div class="btn-box">
          <button
            @click="toRegister"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >注册</button>
          <button @click="$store.commit(`setLingSheen`, false)" class="btn btn-primary">返回</button>
        </div>
      </form>
    </div>

    <!-- 登录 -->
    <div class="box sing" :class="{ligNone:register,lindSheen:lindSheen}">
      <div class="Logo">
        <h1>BiaolgChat</h1>
      </div>
      <form>
        <div class="form-group toinp">
          <label for="exampleInputEmail1">账号</label>
          <input type="text" class="form-control" id="exampleInputEmail1" v-model="user" />
        </div>
        <div class="form-group toinp">
          <label for="exampleInputPassword1">密码</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="btn-box">
          <button @click="toLoing" class="btn btn-primary">登录</button>
          <button @click="$store.commit(`setLingSheen`, true)" class="btn btn-primary">注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Ling",
  data() {
    return {
      user: "",
      password: "",
      nickName: "",
      lindSheen: false
    };
  },
  computed: {
    register() {
      return this.$store.state.ling.sheen;
    }
  },
  methods: {
    //登录
    toLoing() {
      this.$store.commit("setLonging", {
        sheen: true,
        title: "登录中"
      });
      this.$store.state.user.userId = this.user.toLowerCase();
      var options = {
        apiUrl: WebIM.config.apiURL,
        user: this.user,
        pwd: this.password,
        appKey: WebIM.config.appkey,
        success: res => {
          var token = res.access_token;
          this.$store.state.token = token;
          this.$router.push({ path: "Home" });
          //加载页隐藏
          this.$store.commit("setLoadingSheen", false);
        },
        error: err => {
          this.$store.commit("setLoadingSheen", false);
          this.ejectSet("未知错误!");
        }
      };
      WebIM.conn.open(options);
    },
    //注册
    toRegister() {
      this.$store.commit("setLonging", {
        sheen: true,
        title: "注册中"
      });
      var options = {
        apiUrl: WebIM.config.apiURL,
        username: this.user,
        password: this.password,
        nickname: this.nickName,
        appKey: WebIM.config.appkey,
        success: () => {
          this.ejectSet("注册成功");
          this.$store.commit("setLingSheen", false);
          //加载页隐藏
          this.$store.commit("setLoadingSheen", false);
        },
        error: err => {
          //加载页隐藏
          this.$store.commit("setLoadingSheen", false);
          if (
            JSON.parse(err.data).error == "duplicate_unique_property_exists"
          ) {
            this.ejectSet("用户已存在！");
          } else if (JSON.parse(err.data).error == "illegal_argument") {
            this.ejectSet("用户名不合法!");
          } else if (JSON.parse(err.data).error == "unauthorized") {
            this.ejectSet("注册失败，无权限！");
          } else if (JSON.parse(err.data).error == "resource_limited") {
            this.ejectSet("您的App用户注册数量已达上限,请升级至企业版！");
          }
        }
      };
      WebIM.conn.registerUser(options);
    },
    ejectSet(value) {
      this.$store.commit("setEject", {
        sheen: true,
        title: "注册",
        content: value,
        btntitle: {
          yes: "确认",
          no: ""
        }
      });
    }
  },
  mounted() {
    this.$store.commit("setLonging", {
      sheen: true,
      title: "加载中"
    });
    setTimeout(() => {
      this.lindSheen = true;
      this.$store.commit("setLoadingSheen", false);
    }, 3000);
  }
};
</script>

<style lang="less" scoped>
.Ling {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #000;
  color: #fff;
  .lindSheen {
    transform: translateY(0px);
  }
  .get-into {
    transform: translateY(0px);
  }
  .register {
    transform: translateX(-1000%);
  }
  .ligNone {
    transform: translateX(1000%);
  }
}

.sing {
  transform: translateY(-1000px);
}

.box {
  animation: mymove 5s infinite;
  box-shadow: 0px 0px 25px #fff;
  width: 30%;
  min-width: 350px;
  padding: 20px;
  border: 2px #fff solid;
  border-radius: 50px;
  min-height: 300px;
  transition: all 0.5s;
  transition-timing-function: cubic-bezier(0, 0, 0.7, 1.3);
  position: absolute;
  h1 {
    text-align: center;
    background-image: -webkit-linear-gradient(
      left,
      rgb(253, 253, 253),
      #6700a3,
      rgb(0, 183, 255)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .btn-box {
    display: flex;
    .btn-primary {
      width: 100%;
      border-radius: 50px;
      margin: 15px;
      background-color: #000;
      border: none;
      box-shadow: 0px 0px 15px rgb(0, 0, 0);
      transition: all 0.3s;
    }
    .btn-primary:hover {
      animation: mymove 5s infinite;
    }
  }

  .toinp {
    input {
      border-radius: 50px;
      animation: mymove 5s infinite;
    }
  }
}
</style>