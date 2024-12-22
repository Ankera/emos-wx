<template>
	<view class="page">
		<uni-list>
			<uni-list-chat v-for="one in list" 
				:key="one.id" 
				:title="one.senderName"
				:note="one.msg" 
				:avatar="one.senderPhoto" 
				 badgePositon="left"
				:badgeText="one.readFlag?'':'dot'" 
				link="navigateTo"
				:to="'../message/message?id=' + one.id + '&readFlag=' + one.readFlag + '&refId=' + one.refId">
				<view class="chat-custom-right">
					<text class="chat-custom-text">{{one.sendTime}}</text>
				</view>
			</uni-list-chat>
		</uni-list>
	</view>
</template>

<script setup>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import { API_URL, request } from "@/utils/request.js";
import { ref, onMounted } from "vue";


onMounted(() => {
	request(API_URL.searchMessageByPage, "POST", { page: 1, length: 50 } , (resp) => {
		list.value = resp.data.result;
	})
})
</script>

<style lang="less">
	@import url("message_list.less");
</style>
