//import utils from './utils/util';
//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //console.info('curTime:' + utils.formatTime)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }),
    wx.getLocation({
      type: 'gcj02',//gcj02 wgs84
      success: res => {
        var latitude = res.latitude
        var longitude = res.longitude
        var altitude = res.altitude
        var speed = res.speed
        var accuracy = res.accuracy
        this.globalData.locations = res
        console.info('纬度:' + latitude + ",经度:" + longitude + ",高度：" + altitude)

        if (this.locationReadyCallback) {
          this.locationReadyCallback(res)
        }
      }
      }),
      wx.setNavigationBarTitle({
        title: '小臣-小程序'//页面标题为路由参数
      })
  },
  globalData: {
    userInfo: null,
    locations: null
  }
})