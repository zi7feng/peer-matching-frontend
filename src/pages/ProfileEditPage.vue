<script setup>

import {useRoute, useRouter} from "vue-router";
  import {ref} from "vue";
import MyAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

  const route = useRoute();
  const router = useRouter();


  const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
  })

  const onSubmit = async () => {
    const currentUser = await getCurrentUser();
    console.log("--------ProfileEditPage", currentUser);
    const res = await MyAxios.post('user/update', {
      'id': currentUser.id,
      [editUser.value.editKey]: editUser.value.currentValue
    })
    console.log('update request', res);
    if (res.code === 0 && res.data > 0) {
      showSuccessToast('Update successfully!')
      router.back()
    } else {
      showFailToast('Update failed.');
    }
  };

</script>

<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="editUser.editName"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        Update
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>