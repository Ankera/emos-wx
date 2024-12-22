<template>
	<view class="page" v-if="power01">
		<view class="header">
			<input type="text" class="title" v-model="title" placeholder="输入会议标题" placeholder-class="title-placeholder" />
			<image src="../../static/icon-18.png" mode="widthFix" class="edit-icon"></image>
		</view>
		<view class="attr">
			<view class="list">
				<view class="item">
					<view class="key">日期</view>
					<picker v-if="canEdit" mode="date" :value="date" @change="dateChange">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{ date }}</text>
				</view>
				<view class="item">
					<view class="key">开始时间</view>
					<picker v-if="canEdit" mode="time" :value="start" @change="startChange">
						<view class="uni-input">{{ start }}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{ start }}</text>
				</view>
				<view class="item">
					<view class="key">结束时间</view>
					<picker v-if="canEdit" mode="time" :value="end" @change="endChange">
						<view class="uni-input">{{ end }}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{ end }}</text>
				</view>
				<view class="item">
					<view class="key">会议类型</view>
					<picker v-if="canEdit" :value="typeIndex" :range="typeArray" @change="typeChange">{{ typeArray[typeIndex] }}</picker>
					<text v-if="!canEdit" class="value">{{ typeArray[typeIndex] }}</text>
				</view>
				<view class="item" v-if="typeArray[typeIndex] == '线下会议'" @tap="editPlace">
					<view class="key">地点</view>
					<view class="value">{{ place }}</view>
				</view>
				<view class="item" @tap="editDesc">
					<view class="key">会议内容</view>
					<text class="value">{{ desc }}</text>
				</view>
			</view>
		</view>
		<view class="members">
			<view class="number">参会者（{{ members.length }}人）</view>
			<view class="member">
				<view class="user" v-for="one in members" :key="one.id" @longpress="deleteMember(one.id)">
					<image :src="one.photo" mode="widthFix" class="photo"></image>
					<text class="name">{{one.name}}</text>
				</view>
				<view class="add">
					<image src="../../static/icon-19.png" mode="widthFix" 
					class="add-btn" @tap="toMembersPage()"></image>
				</view>
			</view>
		</view>
		<button class="btn" @tap="save">保存</button>
		<uni-popup ref="popupPlace" type="dialog">
			<uni-popup-dialog mode="input" title="编辑文字内容" placeholder="输入会议地点" :value="place" @confirm="finishPlace"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupDesc" type="dialog">
			<uni-popup-dialog mode="input" title="编辑文字内容" placeholder="输入会议内容" :value="desc" @confirm="finishDesc"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import { onLoad, onShow, onReady } from "@dcloudio/uni-app";
import { API_URL, request } from '@/utils/request';

const members = ref([]);
const finishMembers = ref(false);
const canEdit = ref(true);
const title = ref();
const date = ref();
const start = ref();
const end = ref();
const desc = ref();
const place = ref();
const typeIndex = ref(0);
const typeArray = ref(['线上会议', '线下会议']);
const popupPlace = ref();
const popupDesc = ref();
const id = ref();

const app = getCurrentInstance()
const power01 = ref(false);
const properties = app.appContext.config.globalProperties;
power01.value = properties.$checkPermission(['ROOT', 'MEETING:INSERT', 'MEETING:UPDATE'])

onShow(() => {
	const app = getCurrentInstance();
	const options = app.proxy.$scope.options;
	id.value = options.id;
	const pages = getCurrentPages();
	const currPage = pages[pages.length-1];
	if(!currPage.hasOwnProperty("finishMembers")||!currPage.finishMembers){
		if(options.opt=="insert"){ 
			let now = new Date()
			now.setTime(now.getTime()+30*60*1000)
			date.value=now.format("yyyy-MM-dd")
			start.value=now.format("hh:mm")
			now.setTime(now.getTime()+60*60*1000)
			end.value=now.format("hh:mm")
		} else if (options.opt === 'edit') {
			request(API_URL.searchMeetingById, "POST", { id: id.value }, (resp) => {
					const data = resp.data.result;
					title.value = data.title;
					date.value = data.date;
					start.value = data.start;
					end.value = data.end;
					desc.value = data.desc;
					place.value = data.place;
					typeIndex.value = +data.type === 1 ? 0 : 1;
					const bers = JSON.parse(data.members || "[]")
					request(API_URL.searchUserGroupByDept, "POST", { keyworkd: "" }, (resp) => {
						const list = resp.data.result;
						const newMembers = [];
						for(let dept of list){
							for(let member of dept.members){
								if(bers.indexOf(member.userId)!==-1){
									newMembers.push({
										...member,
										id: member.userId
									});
								}
							}
						}
						members.value = newMembers;
					})
			})
		}
	} else {
		request(API_URL.searchMembers, "POST", { members: currPage.members.join() }, (resp) => {
			members.value = resp.data.result;
		})
	}
});

const toMembersPage = () => {
	let array=[]
	for(let one of members.value){
		array.push(one.id)
	}
	
	uni.navigateTo({
		url:"../members/members?members="+array.join(",")
	})
}

const dateChange = (e) => {
	date.value = e.target.value;
}

const startChange = (e) => {
	start.value = e.target.value;
}

const endChange = (e) => {
	end.value = e.target.value;
}

const typeChange = (e) => {
	typeIndex.value = e.target.value;
}

const editPlace = () => {
	if (!canEdit.value) {
		return;
	}
	popupPlace.value.open();
}

const editDesc = () => {
	if (!canEdit.value) {
		return;
	}
	popupDesc.value.open();
}

const finishPlace = (done, value) => {
	if (value) {
		place.value = value;
		done();
	} else {
		uni.showToast({
			icon:"none",
			title:"地点不能为空"
		})
	}
}

const finishDesc = (done, value) => {
	if (value) {
		desc.value = value;
		done();
	} else {
		uni.showToast({
			icon:"none",
			title:"内容不能为空"
		})
	}
}

const save = () => {
	let array=[]
	for(let one of members.value){
		array.push(one.id)
	}
	let data={
		title: title.value,
		date: date.value,
		start: start.value,
		end: end.value,
		type: Number(typeIndex.value) + 1,
		place: place.value,
		members: JSON.stringify(array),
		desc: desc.value,
		id: id.value,
		// instanceId: instanceId
	}
	const API = id.value === 'null' ? API_URL.insertMeeting : API_URL.updateMeetingInfo;
	request(API, "POST", data, () => {
		uni.showToast({
			icon:"success",
			title:"保存成功",
			complete:function(){
				setTimeout(function(){
					uni.navigateBack({})
				},2000)
			}
		})
	})
}
</script>


<style lang="less">
@import url('meeting.less');
</style>
