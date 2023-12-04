<template>
  <van-cell center title="cardiac pattern">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" image="search" description="Null data"/>
  <van-button v-if="userList && userList.length >= pageSize" @click="loadMore">Load More</van-button>
</template>

<script setup lang="ts">
import {onMounted, ref, watch, watchEffect} from "vue";
import { useRoute } from "vue-router";
import { showFailToast } from "vant/lib/vant.es";
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const { tags } = route.query;

const userList = ref([]); // User List
const isMatchMode = ref<boolean>(false);
const pageNum = ref(1); // Current page number
const pageSize = 8; // Number of items per page

/**
 * load data
 */
const loadData = async () => {
  let userListData;
  // match user with tags
  if (isMatchMode.value) {
    userListData = await myAxios.get('/user/match', {
      params: { num: 10 }
    }).then(response => {
      console.log('/user/match succeed', response);
      return response?.data;
    }).catch(error => {
      console.error('/user/match error', error);
      showFailToast('request failed');
    });
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: { pageSize, pageNum: pageNum.value }
    }).then(response => {
      console.log('/user/recommend succeed', response);
      return response?.data?.records;
    }).catch(error => {
      console.error('/user/recommend error', error);
      showFailToast('request failed');
    });
  }

  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    if (pageNum.value > 1) {
      userList.value = [...userList.value, ...userListData]; // Append new data
    } else {
      userList.value = userListData; // Set new data
    }
  }
};

// Load more data
const loadMore = () => {
  pageNum.value++;
  loadData();
};

watch(isMatchMode, () => {
  pageNum.value = 1;
  loadData();
});

onMounted(loadData);


</script>
