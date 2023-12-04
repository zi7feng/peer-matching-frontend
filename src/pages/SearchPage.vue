<script setup>
import { ref } from 'vue';

import {useRouter} from "vue-router";

const router = useRouter()



  const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
      const tempChildren = [...parentTag.children];
      const tempParentTag = {...parentTag};
      tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
      return tempParentTag;
    });
  };
  const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
  };


  const activeIds = ref([]);
  const activeIndex = ref(0);

  const searchText = ref('');
  const originTagList = [
    {
      text: 'Group 1',
      children: [
        { text: 'Java', id: 'Java' },
        { text: 'Florida', id: 'Florida' },
        { text: 'Georgia', id: 3, disabled: true },
      ],
    },
    {
      text: 'Group 2',
      children: [
        { text: 'Alabama', id: 'Alabama' },
        { text: 'Kansas', id: 'Kansas' },
        { text: 'Louisiana', id: 'Louisiana' },
      ],
    },
  ];

  let tagList = ref(originTagList);

  // remove tags
  const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
      return item !== tag;
    })
  }

const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}



</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="Search keywords"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider>Selected Tags</van-divider>
  <div v-if="activeIds.length === 0">Please select tags</div>

  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>






  <van-divider>All Tags</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />

  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">Search</van-button>
  </div>


</template>

<style scoped>

</style>