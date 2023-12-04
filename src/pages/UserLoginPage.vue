<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="Account"
          placeholder="Account"
          :rules="[{ required: true, message: 'Enter account.' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="Password"
          placeholder="password"
          :rules="[{ required: true, message: 'Enter password.' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        Log in
      </van-button>
    </div>
  </van-form>
</template>

<script setup>

import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();

const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  });
  if (res.code == 0 && res.data != null) {
    showSuccessToast("Login successfully");
    // jump to previous page
    const redirectUrl = route.query?.redirect?? '/';
    window.location.href = redirectUrl;
  } else {
    showFailToast("login failed");
  }
};

</script>

<style scoped>

</style>