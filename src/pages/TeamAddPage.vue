<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="Team Name"
            placeholder="Team Name"
            :rules="[{ required: true, message: 'enter team name' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="Description"
            type="textarea"
            placeholder="description"
        />
        <!--expire time-->
        <van-field
            is-link
            readonly
            name="datePicker"
            label="select time"
            :placeholder="addTeamData.expireTime ?? 'Time to stop joining'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              @cancel="showPicker = false"
              type="datetime"
              title="Time to stop joining"
              :min-date="minDate"/>
        </van-popup>

        <van-field name="stepper" label="Max member">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="radio" label="status">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">public</van-radio>
              <van-radio name="1">private</van-radio>
              <van-radio name="2">encrypted</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="password"
            placeholder="team password"
            :rules="[{ required: true, message: 'enter the password' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          Create
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import moment from 'moment';
import {showFailToast, showSuccessToast} from "vant/lib/vant.es";

const router = useRouter();


// date shower
const showPicker = ref(false);
// current time
const minDate = new Date();

const onConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 5,
  "password": "",
  "status": 0,
}

const addTeamData = ref({...initFormData})

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    expireTime: moment(addTeamData.value.expireTime).format("YYYY-MM-DD HH:mm:ss")
  }
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast('create succeed');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showFailToast('create failed');
  }
}
</script>

<style scoped>
#teamPage {

}
</style>