<template>
    <van-card
      v-for="user in props.userList"
      :desc="user.profile"
      :title="`${user.username} (${user.inviteCode})`"
      :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px" >
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">Contact Me</van-button>
      </template>
    </van-card>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps{
  userList: UserType[];
}
// guarantee data not null
const props= withDefaults(defineProps<UserCardListProps>(),{
  //@ts-ignore
  userList: [] as UserType[],
});

</script>
<style scoped>
/* tag color*/
.van-tag--danger.van-tag--plain {
  color: #002fff;
}
</style>