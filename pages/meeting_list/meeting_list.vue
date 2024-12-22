<template>
	<view class="page">
		<image src="../../static/logo-3.jpg" mode="widthFix" class="logo"></image>
		<view class="add" v-if="power01" 
		@tap="toMeetingPage(null,'insert')">
			<image src="../../static/icon-17.png" mode="widthFix" class="icon"></image>
			<text>创建会议</text>
		</view>
		<view v-for="one in list" :key="one.date">
			<view class="list-title">{{one.date}}</view>
			<view class="item" v-for="meeting in one.list" :key="meeting.id"
			@longpress="deleteById(meeting.id, meeting.date, meeting.start)">
				<view class="header">
					<view class="left">
						<image v-if="meeting.type=='线上会议'" src="../../static/icon-11.png" mode="widthFix" class="icon"></image>
						<image v-if="meeting.type=='线下会议'" src="../../static/icon-11.png" mode="widthFix" class="icon"></image>
						<text>{{meeting.type}}</text>
						<text :class="meeting.status=='未开始'?'blue':'red'">（{{meeting.status}}）</text>
					</view>
					<view class="right" @tap="toMeetingPage(meeting.id, 'edit')"
					v-if="power02 && meeting.status == '未开始'">
						<text>编辑</text>
					</view>
				</view>
				<view class="content">
					<view class="title">{{meeting.title}}</view>
					<view class="attr">
						<view class="timer">
							<image src="../../static/icon-14.png" mode="widthFix" class="icon"></image>
							<text>{{meeting.start}} ~ {{meeting.end}}</text>
						</view>
						<view class="creator">
							<image src="../../static/icon-15.png" mode="widthFix" class="icon"></image>
							<text>{{meeting.name}}</text>
						</view>
						<view class="place" v-if="meeting.type!='线上会议'">
							<image src="../../static/icon-16.png" mode="widthFix" class="icon"></image>
							<text>{{meeting.place}}</text>
						</view>
					</view>
					<view class="desc">{{meeting.desc}}</view>
					<button class="btn" v-if="meeting.type=='线上会议'"
					@tap="enter(meeting.id,meeting.uuid,meeting.date,meeting.start)">进入</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { API_URL, request } from "@/utils/request.js";
const name = ref();
const page = ref(1);
const length = ref(20);
const list = ref([
	{
		date: '2021年02月08日',
		list: [
			{ id: 1, date: '2021/02/08', start: '08:30', end: '10:30', type: '线上会议', name: '张爽', place: '网络会议室', status: '未开始',title:'年终大会', desc: '年终总结大会' },
			{ id: 2, date: '2021/02/08', start: '08:30', end: '10:30', type: '线上会议', name: '张爽', place: '网络会议室', status: '未开始',title:'年终大会', desc: '年终总结大会' }
		]
	},
	{
		date: '2021年02月09日',
		list: [{ id: 3, date: '2021/02/09', start: '08:30', end: '10:30', type: '线上会议', name: '张爽', place: '网络会议室', status: '未开始', title:'年终大会',desc: '年终总结大会' }]
	}
])
const isLastPage = ref(false);

onMounted(() => {
	const params = {
		page: page.value,
		length: length.value
	}
	request(API_URL.searchMyMeetingListByPage, "POST", params, (resp) => {
		const newResult = [];
		for (var i = 0; i < (resp.data.result || []).length; i++) {
			const elt = resp.data.result[i];
			const newList = []
			if (Array.isArray(elt.list)) {
				for (var y = 0; y < elt.list.length; y++) {
					const item = elt.list[y];
					if(+item.type===1){
						item.type="线上会议"
					} else if(+item.type===2){
						item.type="线下会议"
					}
					if(+item.status===1){
						item.status="未开始"
					} else if(+item.status===2){
						item.status="进行中"
					} else if(+item.status===3){
						item.status="已结束"
					} 
					newList.push(item);
				}
			}
			
			newResult.push(elt);
		}
		
		list.value = newResult;
	})
})

const app = getCurrentInstance()
const power01 = ref(false);
const power02 = ref(false);
const properties = app.appContext.config.globalProperties;
power01.value = properties.$checkPermission(['ROOT', 'MEETING:INSERT'])
power02.value = properties.$checkPermission(['ROOT', 'MEETING:UPDATE'])

const toMeetingPage = (id,opt) => {
	uni.navigateTo({
		url:"../meeting/meeting?id="+id+"&opt="+opt
	})
}

const enter = (id,uuid,date,start) => {
	date=date.replace("年","/").replace("月","/").replace("日","")
	let begin=new Date(date+" "+start+":00")
	let now=new Date()
	if(now.getTime()>=begin.getTime()-10*60*1000){
		request(API_URL.searchRoomIdByUUID,"POST",{uuid},function(resp){
			let roomId=resp.data.result
			uni.navigateTo({
				url:"../video_meeting/video_meeting?id="+id+"&roomId="+roomId
			})
		})
	} else{
		uni.showToast({
			icon:"none",
			title:"会议开始前10分钟才能进入"
		})
	}
}

const deleteById = (id,date,start) => {
	let now=new Date()
	let meetingDate=new Date(date+" "+start+":00")
	if(now.getTime()>=meetingDate.getTime()-20*60*1000){
		uni.showToast({
			icon:"none",
			title:"该会议无法删除"
		})
		return
	}
}
</script>

<style lang="less">
@import url("meeting_list.less");
</style>
