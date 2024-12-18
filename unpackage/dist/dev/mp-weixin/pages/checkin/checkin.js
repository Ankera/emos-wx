"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "checkin",
  setup(__props) {
    common_vendor.ref(null);
    const canCheckin = common_vendor.ref(true);
    const photoPath = common_vendor.ref("");
    const btnText = common_vendor.ref("拍照");
    const showCamera = common_vendor.ref(true);
    const showImage = common_vendor.ref(false);
    const error = () => {
    };
    common_vendor.onMounted(() => {
      utils_request.request(utils_request.API_URL.validCanCheckIn, "GET", null, (resp) => {
        resp.data.msg;
      });
    });
    const checkinFu = () => {
      const address = "浙江省杭州市通顺街五常街道西溪北苑东区";
      const nation = "中国";
      const province = "浙江";
      const city = "杭州";
      const district = "同顺街";
      common_vendor.index.uploadFile({
        url: utils_request.API_URL.checkin,
        filePath: photoPath.value,
        name: "photo",
        header: {
          token: common_vendor.index.getStorageSync("token")
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
          common_vendor.index.hideLoading();
          if (resp.statusCode === 500 && resp.data === "人脸模型不存在") {
            common_vendor.index.showModal({
              title: "提示信息",
              content: "EMOS系统中不存在你的人脸识别模型，是否用当前这张照片作为人脸识别模型？",
              success(res) {
                console.log("确认===", res);
                if (res.confirm) {
                  common_vendor.index.uploadFile({
                    url: utils_request.API_URL.createFaceModel,
                    filePath: photoPath.value,
                    name: "photo",
                    header: {
                      token: common_vendor.index.getStorageSync("token")
                    },
                    success(resp2) {
                      console.log("人脸建模上传结果===", resp2);
                      if (resp2.statusCode == 500) {
                        common_vendor.index.showToast({
                          title: resp2.data,
                          icon: "none"
                        });
                      } else if (resp2.statusCode == 200) {
                        common_vendor.index.showToast({
                          title: "人脸建模成功",
                          icon: "none"
                        });
                      }
                    }
                  });
                }
              },
              fail(err) {
                console.log("====上传人脸模型异常====", err);
              }
            });
          } else if (resp.statusCode === 200) {
            let data = JSON.parse(resp.data);
            let code = data.code;
            data.msg;
            if (code == 200) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "签到成功",
                complete: function() {
                  common_vendor.index.navigateTo({
                    url: "../checkin_result/checkin_result"
                  });
                }
              });
            }
          } else if (resp.statusCode === 500) {
            common_vendor.index.showToast({
              title: resp.data,
              icon: "none"
            });
          }
        },
        fail(err) {
          console.log("====签到异常====", err);
        }
      });
    };
    const clickBtn = () => {
      if (btnText.value === "拍照") {
        const ctx = common_vendor.index.createCameraContext();
        ctx.takePhoto({
          quality: "high",
          success(resp) {
            photoPath.value = resp.tempImagePath;
            showCamera.value = false;
            showImage.value = true;
            btnText.value = "签到";
          }
        });
      } else {
        common_vendor.index.showLoading({
          title: "签到中请稍后"
        });
        setTimeout(function() {
          common_vendor.index.hideLoading();
        }, 3e4);
        common_vendor.index.getLocation({
          type: "wgs84",
          success(res) {
            const latitude = res.latitude;
            const longitude = res.longitude;
            console.log("latitude:", latitude);
            console.log("longitude:", longitude);
            console.log("photoPath:", photoPath.value);
            console.log("API_URL", utils_request.API_URL.checkin);
            checkinFu();
          },
          fail(err) {
            console.log("fail", err);
          }
        });
      }
    };
    const afresh = () => {
      showCamera.value = true;
      showImage.value = false;
      btnText.value = "拍照";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showCamera.value
      }, showCamera.value ? {
        b: common_vendor.o(error)
      } : {}, {
        c: showImage.value
      }, showImage.value ? {
        d: photoPath.value
      } : {}, {
        e: common_vendor.t(btnText.value),
        f: common_vendor.o(clickBtn),
        g: !canCheckin.value,
        h: common_vendor.o(afresh),
        i: !canCheckin.value
      });
    };
  }
};
wx.createPage(_sfc_main);
