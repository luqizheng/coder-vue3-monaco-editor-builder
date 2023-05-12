<template>
  <a-menu
    theme="dark"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handelClick"
  >
    <a-menu-item key="/example1">
      <pie-chart-outlined />
      <span>js</span>
    </a-menu-item>

    <a-menu-item key="/example2">
      <pie-chart-outlined />
      <span>json</span>
    </a-menu-item>
    <!-- <a-menu-item key="/systemSet">
      <desktop-outlined />
      <span>Option 2</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #title>
        <span>
          <user-outlined />
          <span>Option 3</span>
        </span>
      </template>
      <a-menu-item key="3">用户管理</a-menu-item>
      <a-menu-item key="4">角色管理</a-menu-item>
      <a-menu-item key="5">权限管理</a-menu-item>
    </a-sub-menu> -->
  </a-menu>
</template>

<script setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const selectedKeys = ref([]);
const router = useRouter();
const handelClick = (item) => {
  if (item.key !== router.path) {
    router.push(item.key);
  }
};
</script>
