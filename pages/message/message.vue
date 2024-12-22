<template>
	<view>
		<view class="message">
			<view class="header">
				<view class="desc">{{sendTime}}</view>
				<view class="opt" @tap="deleteMsg()">删除</view>
			</view>
			<view class="content">{{msg}}</view>
		</view>
	</view>
</template>

<script setup>
import { API_URL, request } from "@/utils/request.js";
import { ref, onMounted, getCurrentInstance } from "vue";
const sendTime = ref("");
const msg = ref("")
const instance = getCurrentInstance();


onMounted(() => {
	const params = instance.proxy.$scope.options;
	const userId = params.id;
	request(API_URL.searchMessageById, "POST", { id: userId }, (resp) => {
		sendTime.value = resp.data.result.sendTime;
		msg.value = resp.data.result.msg;
	})
	
	request(API_URL.updateUnreadMessage, "POST", { id: userId }, () => {})
})

const deleteMsg = () => {
	uni.showModal({
		title:"提示信息",
		content:"是否要删除这条消息？",
		success(resp) {
			const params = instance.proxy.$scope.options;
			const userId = params.id;
			if(resp.confirm){
				request(API_URL.deleteMessageRefById, "POST", { id: userId }, (resp) => {
					uni.showToast({
						icon:"success",
						title:"删除成功",
						complete() {
							setTimeout(() => {
								uni.navigateBack({
									delta:1
								})
							}, 1500)
						}
					})
				})
			}
		}
	})
}
</script>

<style lang="less">
	@import url("message.less");
</style>
