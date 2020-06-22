<template>
  <div class="newsList">
    <div class="title" @click="litsSheen=!litsSheen">
      <slot></slot>
      <span>↑</span>
      <span>↓</span>
    </div>
    <div class="list" :class="{litsSheen:!litsSheen}">
      <div class="ico" v-show="litsSheen" @click="litsSheen=false">
        <svg
          class="bi bi-chevron-compact-down"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
          />
        </svg>
      </div>
      <div v-for="(item,i) in list" :key="i">
        <ListItem :item="item" :type="type" :pos="i%2==0"></ListItem>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem";
export default {
  name: "newsList",
  props: ["list", "type"],
  data() {
    return {
      litsSheen: false
    };
  },
  components: {
    ListItem
  }
};
</script>

<style lang="less" scoped>
.newsList {
  .title {
    height: 50px;
    line-height: 50px;
    text-align: left;
    border-bottom: solid #fff 2px;
    text-align: center;
    cursor: pointer;
  }
  .list {
    max-height: 0px;
    overflow-y: hidden;
    transition: all 0.3s;
    border-bottom: #fff solid 2px;
    padding: 10px;
    position: relative;
    .ico {
      position: absolute;
      top: 0px;
      width: calc(100% - 30px);
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
  }
  .litsSheen {
    max-height: 500px;
    padding: 15px;
    overflow-y: auto;
  }
  //滚动条美化
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 1vw;
    height: 10px;
    background-color: #000;
    border-right: 2px solid #fff;
    margin: 0;
    padding: 0;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    background-color: #000;
    border-left: 2px solid #fff;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
}
</style>