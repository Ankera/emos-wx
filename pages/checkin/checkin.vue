<template>
	<view>
			<camera device-position="front" flash="off" class="camera" @error="error" v-if="showCamera"></camera>
			<image mode="widthFix" class="image" :src="photoPath" v-if="showImage"></image>
			<view class="operate-container">
				<button type="primary" class="btn" @tap="clickBtn" :disabled="!canCheckin">{{btnText}}</button>
				<button type="warn" class="btn" @tap="afresh" :disabled="!canCheckin">重拍</button>
			</view>
			<view class="notice-container">
				<text class="notice">注意事项</text>
				<text class="desc">拍照签到的时候，必须要拍摄自己的正面照片，侧面照片会导致无法识别。另外，拍照的时候不要戴墨镜或者帽子，避免影响拍照签到的准确度。</text>
			</view>
		</view>
</template>

<script setup>
	import { API_URL, request } from "@/utils/request.js";
	import { ref, onMounted } from "vue";
	const qqMapSDK = ref(null);
	const canCheckin = ref(true)
	const photoPath = ref("")
	const btnText = ref("拍照")
	const showCamera = ref(true);
	const showImage = ref(false)
	
	const error = () => {
		
	}
	
	onMounted(() => {
		request(API_URL.validCanCheckIn, "GET", null, (resp) => {
			const msg=resp.data.msg
			// setTimeout(function(){
			// 	uni.showToast({
			// 		title: msg,
			// 		icon:"none"
			// 	})
			// },1000)
		})
	})
	
	const checkinFu = () => {
		const address = "浙江省杭州市通顺街五常街道西溪北苑东区";
		const nation = "中国";
		const province = "浙江";
		const city = "杭州";
		const district = "同顺街";
		uni.uploadFile({
			url: API_URL.checkin,
			filePath: photoPath.value,
			name: "photo",
			header: {
				token: uni.getStorageSync("token")
			},
			formData: {
				address,
				country: nation,
				province,
				city,
				district
			},
			success(resp) {
				console.log("==2resp2==", resp);
				uni.hideLoading();
				if(resp.statusCode===500&&resp.data==="人脸模型不存在"){
					uni.showModal({
						title:"提示信息",
						content:"EMOS系统中不存在你的人脸识别模型，是否用当前这张照片作为人脸识别模型？",
						success(res) {
							console.log("确认===", res)
							if (res.confirm) {
								uni.uploadFile({
									url: API_URL.createFaceModel,
									filePath: photoPath.value,
									name: "photo",
									header: {
										token: uni.getStorageSync("token")
									},
									success(resp) {
										console.log("人脸建模上传结果===", resp)
										if(resp.statusCode==500){
											uni.showToast({
												title:resp.data,
												icon:"none"
											})
										} else if(resp.statusCode==200){
											uni.showToast({
												title:"人脸建模成功",
												icon:"none"
											})
										}
									}
								})
							}
						},
						fail(err) {
							console.log("====上传人脸模型异常====", err);
						}
					})
				} else if (resp.statusCode === 200) {
					let data=JSON.parse(resp.data)
					let code=data.code
					let msg=data.msg
					if(code==200){
						uni.hideLoading()
						uni.showToast({
							title:"签到成功",
							complete:function(){
								uni.navigateTo({
									url:"../checkin_result/checkin_result"
								})
							}
						})
					}
				} else if (resp.statusCode === 500) {
					uni.showToast({
						title:resp.data,
						icon: "none"
					})
				}
			},
			fail(err) {
				console.log("====签到异常====", err);
			}
		})
	}
	
	const clickBtn = () => {
		if (btnText.value === "拍照") {
			const ctx = uni.createCameraContext();
			ctx.takePhoto({
				quality:"high",
				success(resp) {
					photoPath.value = resp.tempImagePath;
					showCamera.value = false;
					showImage.value = true;
					btnText.value = "签到";
				}
			})
		} else {
			uni.showLoading({
				title:"签到中请稍后"
			})
			
			setTimeout(function(){
				uni.hideLoading()
			},30000)
			
			uni.getLocation({
				type:"wgs84",
				success(res) {
					const latitude=res.latitude;
					const longitude=res.longitude;
					console.log("latitude:", latitude);
					console.log("longitude:", longitude);
					console.log("photoPath:", photoPath.value);
					console.log("API_URL", API_URL.checkin);
					checkinFu();
				},
				fail(err) {
					console.log("fail", err)
				}
			})
		}
	}
	
	const afresh = () => {
		showCamera.value = true;
		showImage.value = false;
		btnText.value = "拍照";
	}
</script>

<style lang="less">
@import url("checkin.less");
</style>
