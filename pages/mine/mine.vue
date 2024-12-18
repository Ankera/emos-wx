<template>
	<view class="page">
		<view class="user-info">
			<view class="border-outer">
				<view class="border-inner">
					<image :src="photo" mode="widthFix" class="photo"></image>
				</view>
			</view>
			<view class="summary">
				<view>
					<text class="title">姓名</text>
					<text class="value">{{name}}</text>
				</view>
				<view>
					<text class="title">部门</text>
					<text class="value">{{deptName}}</text>
				</view>
				<view>
					<text class="title">状态</text>
					<text class="value">在职</text>
				</view>
			</view>
		</view>
		<view class="list-title">用户信息栏目</view>
		<uni-list>
			<uni-list-item title="个人资料" link to=""></uni-list-item>
			<uni-list-item title="我的考勤" link to="/pages/my_checkin/my_checkin"></uni-list-item>
			<uni-list-item title="罚款记录" link to=""></uni-list-item>
		</uni-list>
		<view class="list-title">系统管理栏目</view>
		<uni-list>
			<uni-list-item title="员工管理" v-show="power01" link to=""></uni-list-item>
			<uni-list-item title="部门管理" v-show="power02" link to=""></uni-list-item>
			<uni-list-item title="权限管理" v-show="power03" link to=""></uni-list-item>
		</uni-list>
	</view>
</template>

<script setup>
import { API_URL, request } from '@/utils/request.js';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import { ref, getCurrentInstance, onMounted } from "vue";
const name = ref("");
const photo = ref("");
const deptName = ref("");

onMounted(() => {
	console.log("resquest")
	request(API_URL.searchUserSummary, "GET", null, (resp) => {
		if (resp.statusCode === 200) {
			name.value = resp.data.result.name;
			photo.value = resp.data.result.photo;
			deptName.value = resp.data.result.deptName;
		}
	})
})

const app = getCurrentInstance()
const power01 = ref(false);
const power02 = ref(false);
const power03 = ref(false);
const properties = app.appContext.config.globalProperties;
power01.value = properties.$checkPermission(['ROOT','EMPLOYEE:SELECT'])
power02.value = properties.$checkPermission(['ROOT','DEPT:SELECT'])
power03.value = properties.$checkPermission(['ROOT','ROLE:SELECT'])
</script>

<style lang="less">
@import url("mine.less");
</style>
