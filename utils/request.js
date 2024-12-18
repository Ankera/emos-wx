const baseUrl = "http://192.168.31.120:8080/emos-wx-api";
const workflow="http://192.168.31.86:9090/emos-workflow";
// const baseUrl = "http://localhost:8080/emos-wx-api";
// const workflow="http://localhost:9090/emos-workflow";
const API_URL = {
	register: baseUrl + "/user/register",
	login: baseUrl + "/user/login",
	checkin: baseUrl + "/checkin/checkin",
	createFaceModel: baseUrl + "/checkin/createFaceModel",
	validCanCheckIn: baseUrl + "/checkin/validCanCheckIn",
	searchTodayCheckin: baseUrl + "/checkin/searchTodayCheckin",
	searchUserSummary: baseUrl + "/user/searchUserSummary",
	searchMonthCheckin: baseUrl + "/checkin/searchMonthCheckin",
	refreshMessage: baseUrl + "/message/refreshMessage",
	searchMessageByPage: baseUrl + "/message/searchMessageByPage",
	searchMessageById: baseUrl + "/message/searchMessageById",
	updateUnreadMessage: baseUrl + "/message/updateUnreadMessage",
	deleteMessageRefById: baseUrl + "/message/deleteMessageRefById",
	searchMyMeetingListByPage: baseUrl + "/meeting/searchMyMeetingListByPage",
	searchUserGroupByDept: baseUrl + "/user/searchUserGroupByDept",
	searchMembers: baseUrl + "/user/searchMembers",
	insertMeeting: baseUrl + "/meeting/insertMeeting",
	searchMeetingById:baseUrl+"/meeting/searchMeetingById",
	updateMeetingInfo: baseUrl + "/meeting/updateMeetingInfo",
	deleteMeetingById:baseUrl+"/meeting/deleteMeetingById",
	searchUserTaskListByPage:workflow+"/workflow/searchUserTaskListByPage",
	approvalMeeting:workflow+"/workflow/approvalMeeting",
	selectUserPhotoAndName:baseUrl+"/user/selectUserPhotoAndName",
	genUserSig: baseUrl + "/user/genUserSig",
	searchRoomIdByUUID: baseUrl + "/meeting/searchRoomIdByUUID",
	searchUserMeetingInMonth:baseUrl+"/meeting/searchUserMeetingInMonth"
}

function request(url, method, data, fun) {
	uni.request({
		"url": url,
		"method": method,
		"header": {
			token: uni.getStorageSync("token")
		},
		"data": data,
		success: function(resp) {
			if (resp.statusCode == 401) {
				uni.redirectTo({
					url: "/pages/login/login.vue"
				})
			} else if (resp.statusCode == 200 && resp.data.code == 200) {
				let data = resp.data
				if (data.hasOwnProperty("token")) {
					let token = data.token
					// console.log(token)
					uni.setStorageSync("token", token)
				}
				fun(resp)
			} else {
				uni.showToast({
					icon: "none",
					title: resp.data
				})
			}
		},
	})
}

export {
	API_URL,
	request
}