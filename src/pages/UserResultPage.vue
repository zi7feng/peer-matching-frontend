<script setup>
import {onMounted, ref} from "vue";
  import {useRoute} from "vue-router";
  import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";

  const route = useRoute();
  const {tags} = route.query;
const userList = ref([]);


onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response?.data?.records;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        showFailToast('request failed');
      })
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

// const mockUser = {
//     id: 2767,
//     username: 'fzq',
//     userAccount: 'fzqqqqq',
//     avatarUrl: 'https://rustacean.net/assets/rustacean-flat-happy.svg',
//     gender: 0,
//     profile: 'Les get Rusty!',
//     phone: '121311313',
//     email: '23432@gmail.com',
//     inviteCode: '2767',
//     userRole: 'Admin',
//     createTime: new Date(),
//     tags: ['Java', 'Rust', 'Spring', 'MySQL', 'NG'],
//   };



</script>

<template>
  <user-card-list :user-list="userList"/>

  <van-empty v-if="!userList || userList.length < 1" description="No Result" />
</template>

<style scoped>

</style>