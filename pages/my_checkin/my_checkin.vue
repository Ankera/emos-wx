<template>
	<view>
		<view class="statistics">
			<image src="../../static/big-icon-1.png" class="big-icon" mode="widthFix"></image>
			<view class="report-title">
				<text class="days">{{sum_1}}</text>
				<text class="unit">天</text>
			</view>
			<view class="sub-title">
				<text>本月签到</text>
			</view>
			<view class="report">
				<view class="column green">
					<text class="column-title">正常签到</text>
					<text class="number">{{sum_1}}</text>
				</view>
				<view class="column orange">
					<text class="column-title">迟到签到</text>
					<text class="number">{{sum_2}}</text>
				</view>
				<view class="column red">
					<text class="column-title">缺勤签到</text>
					<text class="number">{{sum_3}}</text>
				</view>
			</view>
		</view>
		<view class="calendar-container">
			<uni-calendar :insert="true" :lunar="false" :selected="list" 
			@monthSwitch="changeMonth" @confirm="changeMonth"></uni-calendar>
		</view>
	</view>
</template>

<script setup>
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
import { API_URL, request } from "@/utils/request.js";
import { ref, onMounted } from 'vue';
const list = ref([]);
const sum_1 = ref(0);
const sum_2 = ref(0);
const sum_3 = ref(0);
const year = ref(2024)
const month = ref(12);

const handleRequest = () => {
	request(API_URL.searchMonthCheckin, "POST", {
		year: year.value,
		month: month.value
	}, (resp) => {
		if (resp.statusCode === 200) {
			const data = resp.data;
			sum_1.value = data.sum_1;
			sum_2.value = data.sum_2;
			sum_3.value = data.sum_3;
			let newList = [];
			for(let one of data.list){
				if(one.status!=null&&one.status!=""){
					let color=""
					if(one.status=="正常"){
						color="green"
					} else if(one.status=="迟到"){
						color="orange"
					} else if(one.status=="缺勤"){
						color="red"
					}
					newList.push({
						date:one.date,
						info:one.status,
						color:color
					})
				}
			}
			console.log('==newList==', newList)					
			list.value = newList;
		}
	})
}

onMounted(() => {
	handleRequest();
})

const changeMonth = (y, m) => {
	console.log("yy", y, m)
}
</script>

<style lang="less">
	@import url('my_checkin.less');
</style>
