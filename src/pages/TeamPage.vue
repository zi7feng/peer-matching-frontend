<script setup>

import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, Toast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";
const teamList = ref([]);
onMounted(async () => {
  const res = await myAxios.get("/team/list");
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail("team load failed");
  }
})

onMounted(async () => {
  listTeam();
})

const onSearch =(val) => {
  listTeam(val);
}


const listTeam = async (val = '') => {
  const res = await  myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("Load team failed");
  }
}

</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="team keyword" @search="onSearch" />
<!--    <van-tabs v-model:active="active" @change="onTabChange">-->
<!--      <van-tab title="Public" name="public" />-->
<!--      <van-tab title="Encrypted" name="encrypted" />-->
<!--    </van-tabs>-->
    <van-button class="add-button" type="primary" icon="plus" @click="doJoinTeam">Join Team</van-button>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="No result" />
  </div>
</template>

<style scoped>
#teamPage {

}

</style>