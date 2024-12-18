<template>
	<view>
		<text>{{username}}</text>
		<view v-for="item,index in list" :key="index">
			<view>{{item}}</view>
		</view>
		<view @click="handleList">增加随机字符串</view>
		
		<view>
			<input type="text" v-model="modelValue" />
		</view>
		<view>{{modelValue}}</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	const username = ref("Tom")
	const list = ref(["121", "232", "323"])
	const modelValue = ref();
	
	const handleList = () => {
		list.value.push(getRandomString())
	}
	
	function getRandomString(length = 10) {
	    let result = '';
	    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    const charactersLength = characters.length;
	    for (let i = 0; i < length; i++) {
	        result += characters.charAt(Math.floor(Math.random() * charactersLength));
	    }
	    return result;
	}
</script>

<style>
	input {
		border: 1px solid #ccc;
	}
</style>
