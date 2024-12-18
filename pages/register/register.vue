<template>
	<view>
			<image src="../../static/logo-2.png" mode="widthFix" class="logo"></image>
			<view class="register-container">
				<input type="text" placeholder="输入你的邀请码" class="register-code" maxlength="6" v-model="registerCode" />
				<view class="register-desc">管理员创建员工证账号之后，你可以从你的个人邮箱中获得注册邀请码</view>
				<button class="register-btn" open-type="getUserInfo" @tap="register()">执行注册</button>
			</view>
		</view>
</template>

<script setup>
import { ref } from "vue";
import { API_URL, request } from "@/utils/request.js";
const registerCode = ref();

const register = () => {
	uni.login({
		provider:"weixin",
		success(data) {
			if(!registerCode.value){
				uni.showToast({
					icon:"none",
					title:"邀请码不能为空"
				})
				return
			} else if(!/^[0-9]{6}$/.test(registerCode.value)){
				uni.showToast({
					icon:"none",
					title:"邀请码必须是6位数字"
				})
				return
			}
			
			const code = data.code;
			uni.getUserInfo({
				provider:"weixin",
				success: (data) => {
					const params = {
						code,
						nickname: data.userInfo.nickName,
						photo: data.userInfo.avatarUrl,
						registerCode: registerCode.value
					}
					request(API_URL.register, "POST", params, (resp) => {
						const permission=resp.data.permission
						uni.setStorageSync("permission",permission)
						//跳转到index页面
						uni.switchTab({
							url:"../index/index"
						})
					});
				}
			})
		},
		fail(data) {
			console.log("fail data", data)
		},
	})
}
</script>

<style lang="less">
@import url("register.less");
</style>
