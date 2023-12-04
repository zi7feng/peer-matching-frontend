<template>
  <template v-if="user">
    <van-cell title="Current User" :value="user?.username" />
    <van-cell title="Update Information" is-link to="/user/update" />
    <van-cell title="My Creates" is-link to="/user/team/create" />
    <van-cell title="My Joins" is-link to="/user/team/join" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const user = ref();

onMounted(async ()=>{
  user.value=await getCurrentUser();
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

<style scoped>

</style>