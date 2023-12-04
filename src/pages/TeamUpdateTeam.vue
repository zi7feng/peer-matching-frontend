<!--<template>-->
<!--  <div id="teamAddPage">-->
<!--    <van-form @submit="onSubmit">-->
<!--      <van-cell-group inset>-->
<!--        <van-field-->
<!--            v-model="addTeamData.name"-->
<!--            name="name"-->
<!--            label="Team name"-->
<!--            placeholder="Team name"-->
<!--            :rules="[{ required: true, message: 'enter team name' }]"-->
<!--        />-->
<!--        <van-field-->
<!--            v-model="addTeamData.description"-->
<!--            rows="4"-->
<!--            autosize-->
<!--            label="description"-->
<!--            type="textarea"-->
<!--            placeholder="enter description"-->
<!--        />-->
<!--        <van-field-->
<!--            is-link-->
<!--            readonly-->
<!--            name="datetimePicker"-->
<!--            label="expire time"-->
<!--            :placeholder="addTeamData.expireTime ?? 'select expire time'"-->
<!--            @click="showPicker = true"-->
<!--        />-->
<!--        <van-popup v-model:show="showPicker" position="bottom">-->
<!--          <van-datetime-picker-->
<!--              v-model="addTeamData.expireTime"-->
<!--              @confirm="showPicker = false"-->
<!--              type="datetime"-->
<!--              title="select expire time"-->
<!--              :min-date="minDate"-->
<!--          />-->
<!--        </van-popup>-->
<!--        <van-field name="radio" label="team status">-->
<!--          <template #input>-->
<!--            <van-radio-group v-model="addTeamData.status" direction="horizontal">-->
<!--              <van-radio name="0">Public</van-radio>-->
<!--              <van-radio name="1">Private</van-radio>-->
<!--              <van-radio name="2">Encrypted</van-radio>-->
<!--            </van-radio-group>-->
<!--          </template>-->
<!--        </van-field>-->
<!--        <van-field-->
<!--            v-if="Number(addTeamData.status) === 2"-->
<!--            v-model="addTeamData.password"-->
<!--            type="password"-->
<!--            name="password"-->
<!--            label="password"-->
<!--            placeholder="password"-->
<!--            :rules="[{ required: true, message: 'enter password' }]"-->
<!--        />-->
<!--      </van-cell-group>-->
<!--      <div style="margin: 16px;">-->
<!--        <van-button round block type="primary" native-type="submit">-->
<!--          Update-->
<!--        </van-button>-->
<!--      </div>-->
<!--    </van-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->

<!--import {useRoute, useRouter} from "vue-router";-->
<!--import myAxios from "../plugins/myAxios";-->
<!--import {Toast} from "vant";-->
<!--import {onMounted, ref} from "vue";-->

<!--const router = useRouter();-->
<!--const route = useRoute();-->

<!--const showPicker = ref(false);-->

<!--const minDate = new Date();-->

<!--const addTeamData = ref({})-->

<!--const id = route.query.id;-->

<!--// get old team info-->
<!--onMounted(async () => {-->
<!--  if (id <= 0) {-->
<!--    Toast.fail("load team failed");-->
<!--    return;-->
<!--  }-->
<!--  const res = await myAxios.get("/team/get", {-->
<!--    params: {-->
<!--      id: id,-->
<!--    }-->
<!--  });-->
<!--  if (res?.code === 0) {-->
<!--    addTeamData.value = res.data;-->
<!--  } else {-->
<!--    Toast.fail("load team failed");-->
<!--  }-->
<!--})-->

<!--// submit-->
<!--const onSubmit = async () => {-->
<!--  const postData = {-->
<!--    ...addTeamData.value,-->
<!--    status: Number(addTeamData.value.status)-->
<!--  }-->
<!--  const res = await myAxios.post("/team/update", postData);-->
<!--  if (res?.code === 0 && res.data) {-->
<!--    Toast.success('Update succeed');-->
<!--    router.push({-->
<!--      path: '/team',-->
<!--      replace: true,-->
<!--    });-->
<!--  } else {-->
<!--    Toast.success('Update Failed');-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--#teamPage {-->

<!--}-->
<!--</style>-->

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
            label="expire time"
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
          Update
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import moment from 'moment';
import {showFailToast, showSuccessToast} from "vant/lib/vant.es";

const router = useRouter();
const route = useRoute();


// date shower
const showPicker = ref(false);
// current time
const minDate = new Date();

const addTeamData = ref({})
const id = route.query.id;



onMounted(async () => {
  if (id <= 0) {
    showFailToast("Load team failed");
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id: id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
  } else {
    showFailToast("Load Team failed");
  }
})


const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    expireTime: moment(addTeamData.value.expireTime).format("YYYY-MM-DD HH:mm:ss")
  }
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast('update succeed');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showFailToast('Update failed');
  }
}
</script>

<style scoped>
#teamPage {

}
</style>