<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :thumb="mouse"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `Joined Num: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ 'Expire Time: ' + team.expireTime }}
        </div>
        <div>
          {{ 'Create Time: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    plain @click="preJoinTeam(team)">Join</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)">Update
        </van-button>
        <!-- only can be seen if has joined the team -->
        <van-button v-if="team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)">Quit Team
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">Delete Team
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="Enter Password" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="password"/>
    </van-dialog>
  </div>

</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import mouse from '../assets/github.svg';
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

import {useRouter} from "vue-router";
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const router = useRouter();
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const currentUser = ref();


const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * join team
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    Toast.success('Join succeed');
  } else {
    Toast.fail('join failed' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * jump to update page
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

onMounted(async () =>{
  currentUser.value = await getCurrentUser();
})

/**
 * quit team
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('quit succeed');
  } else {
    Toast.fail('quit failed' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * delete team
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    Toast.success('delete succeed');
  } else {
    Toast.fail('delete failed' + (res.description ? `，${res.description}` : ''));
  }
}


</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>