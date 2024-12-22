<template>
	<view class="page">
		<checkbox-group @change="selected">
			<block v-for="dept in list" :key="dept.id">
				<view class="list-title">{{dept.deptName}}（{{ dept.count }}人）</view>
				<view class="item" v-for="member in dept.members" :key="member.userId">
					<view class="key">{{member.name}}</view>
					<checkbox class="value" :value="member.userId" :checked="member.checked"></checkbox>
				</view>
			</block>
		</checkbox-group>
	</view>
</template>

<script setup>
import { API_URL, request } from "@/utils/request.js";
import { ref, onMounted, getCurrentInstance } from "vue";
import { onShow } from "@dcloudio/uni-app";
const list = ref([])

onMounted(() => {
	const app = getCurrentInstance();
	const members = app.proxy.$scope.options.members;
	request(API_URL.searchUserGroupByDept, "POST", { keyworkd: "" }, (resp) => {
		list.value = resp.data.result;
		for(let dept of list.value){
			for(let member of dept.members){
				if(members.indexOf(member.userId+"")!=-1){
					member.checked=true
				}
				else{
					member.checked=false
				}
			}
		}
	})
})

const selected = (e) => {
	const pages = getCurrentPages();
	const prevPage = pages[pages.length-2];
	prevPage.members = e.detail.value;
	prevPage.finishMembers = true;
}

</script>

<style lang="less">
@import url('members.less');
</style>
