<template>
	<view class="page">
		<view class="summary-container">
			<view class="user-info">
				<image :src="photo" mode="widthFix" class="photo"></image>
				<view class="info">
					<text class="username">{{name}}</text>
					<text class="dept">隶属部门：{{deptName==null?"":deptName}}</text>
				</view>
			</view>
			<view class="date">{{date}}</view>
		</view>
		<view class="result-container">
			<view class="left">
				<image src="../../static/icon-6.png" mode="widthFix" class="icon-timer"></image>
				<image src="../../static/icon-6.png" mode="widthFix" class="icon-timer"></image>
				<view class="line"></view>
			</view>
			<view class="right">
				<view class="row">
					<text class="start">上班（时间 {{ attendanceTime }}）</text>
				</view>
				<view class="row">
					<text class="checkin-time">签到时间（{{ checkinTime }}）</text>
					<text class="checkin-result green other" v-if="status=='正常'">{{status}}</text>
					<text class="checkin-result yellow other" v-if="status=='迟到'">{{status}}</text>
				</view>
				<view class="row">
					<image src="../../static/icon-7.png" mode="widthFix" class="icon-small"></image>
					<text class="desc">{{address}}</text>
					<text class="checkin-result green" v-if="risk=='低风险'">{{risk}}</text>
					<text class="checkin-result yellow" v-if="risk=='中风险'">{{risk}}</text>
					<text class="checkin-result red" v-if="risk=='高风险'">{{risk}}</text>
				</view>
				<view class="row">
					<image src="../../static/icon-8.png" mode="widthFix" class="icon-small"></image>
					<text class="desc">身份验证</text>
					<text class="checkin-result green">已通过</text>
				</view>
				<view class="row">
					<text class="end">下班（时间 {{ closingTime }}）</text>
				</view>
			</view>
		</view>
		<view class="checkin-report">
			<image src="../../static/big-icon-1.png" mode="widthFix" class="big-icon"></image>
			<view class="report-title">
				<text class="days">{{checkinDays}}</text>
				<text class="unit">天</text>
			</view>
			<view class="sub-title">
				<text>累计签到</text>
				<view class="line"></view>
			</view>
			<view class="calendar-container">
				<view class="calendar" v-for="one in weekCheckin" :key="one">
					<image src="../../static/icon-9.png" mode="widthFix" class="calendar-icon" v-if="one.type=='工作日'"></image>
					<image src="../../static/icon-10.png" mode="widthFix" class="calendar-icon" v-if="one.type=='节假日'"></image>
					<text class="day">{{one.day}}</text>
					<text class="result green" v-if="one.status=='正常'">{{one.status}}</text>
					<text class="result yellow" v-if="one.status=='迟到'">{{one.status}}</text>
					<text class="result red" v-if="one.status=='缺勤'">{{one.status}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { API_URL, request } from "@/utils/request.js";
const photo = ref("https://img1.baidu.com/it/u=2453992804,444441020&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1734368400&t=7dac2b7d6096cb6a349224237e652daa");
const name = ref("");
const deptName = ref("");
const date = ref(null);
const attendanceTime = ref("");
const checkinTime = ref("");
const status = ref("");
const address = ref("");
const risk = ref("");
const closingTime = ref("");
const checkinDays = ref("");
const weekCheckin = ref([])

onMounted(() => {
	request(API_URL.searchTodayCheckin, "GET", null, (resp) => {
		console.log("==resp==", resp)
		let result = resp.data.result;
		name.value = result.name;
		date.value = result.date;
		deptName.value = result.deptName;
		attendanceTime.value = result.attendanceTime;
		checkinTime.value = result.checkinTime || "08:20";
		status.value = result.status;
		address.value = result.address;
		risk.value = result.risk;
		closingTime.value = result.closingTime;
		checkinDays.value = result.checkinDays;
		weekCheckin.value = result.weekCheckin;
	})
})

</script>

<style lang="less">
	@import url("checkin_result.less");
</style>
