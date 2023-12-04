<script setup lang="ts">
import { useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUserState} from "../states/user.ts";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//   id: 1,
//   username: 'fzq',
//   userAccount: 'fzqqqqq',
//   avatarUrl: 'https://rustacean.net/assets/rustacean-flat-happy.svg',
//   gender: 'Male',
//   phone: '123112312',
//   email: '12345@gmail.com',
//   inviteCode: '1234',
//   createTime: new Date(),
// }

const user = ref();
onMounted(async () => {
  // const res = await myAxios.get('/user/current');
  // if (res.code === 0) {
  //   user.value = res.data;
  //   showSuccessToast('Get user info successfully');
  // } else {
  //   showFailToast('Fail to get user info.');
  // }
  user.value = await getCurrentUser();
})

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<template>
  <template v-if="user">
    <van-cell title="Name" is-link to='/user/edit' :value="user.username"/>
    <van-cell title="Account" is-link to='/user/edit' :value="user.userAccount" />
    <van-cell title="Avatar" is-link to='/user/edit'>
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="Gender" is-link to='/user/edit' :value="user.gender"
              @click="toEdit('gender', 'gender', user.gender)"/>
    <van-cell title="Phone" is-link to='/user/edit' :value="user.phone"
              @click="toEdit('phone', 'phone', user.phone)"/>

    <van-cell title="E-mail" is-link to='/user/edit' :value="user.email"
              @click="toEdit('email', 'email', user.email)"/>

    <van-cell title="Invite Code" :value="user.inviteCode" />
<!--    <van-cell title="Register Time" :value="user.createTime.toISOString()" />-->
  </template>
</template>

<style scoped>

</style>