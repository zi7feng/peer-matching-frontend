<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view />

  </div>

<!--  <router-link to="/">Go to Home</router-link>-->
<!--  <router-link to="/team">Go to Team</router-link>-->

  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">Home</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">Team</van-tabbar-item>
    <van-tabbar-item to="/profile" icon="friends-o" name="profile">Profile</van-tabbar-item>
  </van-tabbar>


</template>

<script setup lang="ts">
import {showSuccessToast, Toast} from "vant";
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.js";

const router = useRouter()
const DEFAULT_TITLE = 'PEER MATCHING';
const title = ref(DEFAULT_TITLE);

/**
 * switch title by router
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => (
    router.back()
);
const onClickRight = () => (
    router.push('/search')
);

// const active = ref("index");
// const onChange = (index) => showSuccessToast(`Tab ${index}`);
</script>

<style scoped>
  #content {
    padding-bottom: 50px;
  }
</style>