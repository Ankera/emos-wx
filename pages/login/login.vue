<template>
	<view>
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="logo-title">EMOS企业在线办公系统</view>
		<view class="logo-subtitle">Ver 2050.2</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登陆系统</button>
		<view class="register-container">
			没有账号？
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script setup>
	import { API_URL, request } from "@/utils/request.js";
	const login = () => {
		uni.login({
			provider:"weixin",
			success:function(res){
				const code = res.code;
				request(API_URL.login, "POST", {code}, (resp) => {
					const permission=resp.data.permission
					uni.setStorageSync("permission",permission)
					//跳转到index页面
					uni.switchTab({
						url:"../index/index"
					})
				});
			},
			fail:function(e){
				uni.showToast({
					icon:"none",
					title:"执行异常"
				})
			}
		})
	}
	
	const toRegister = () => {
		uni.navigateTo({
			url:"../register/register"
		})
	}
</script>

<style lang="less">
@import url("login.less");
</style>
