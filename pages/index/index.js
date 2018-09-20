import utils from '../../utils/util';
//index.js
//获取应用实例
const app = getApp()
Page({

  data: {
    curTime:'',
    curLocaton:'',
    motto:'hi',
    tips:[
      '只有愿意相信，才看得见美好',
      '未来的美好 · 最美的期待',
      '只因多看你一眼,人生从此是BUG',
      '爱情就像鬼，听说的人多，遇见的人少',
      '穿上高跟鞋，你就变了',

      '你们是否跟我一样，在等待一个人的决定',
      '时尚易逝，风格永存',
      '伤心总是难免的，要快乐',
      '娱乐精神，敢享人生',
      '奢侈是舒适的，否则就不是奢侈',

      '不用香水的女人没有将来',
      '横溢的不只是才华，还有腰间的脂肪',
      '幸福的日子怎么过？一笑而过',
      '这日子怎么过？一笑而过',
      '叫醒我的不是闹钟，是我妈',

      '众里寻你千百度，你却在门后穿秋裤',

      '醉卧沙场君莫笑，爱情战场爱无敌', 
      '欲饮琵琶马上催，快马加鞭把你追',
      '十年修得同船渡，百年修得共枕眠',
      '人间自有真情在，能省一块是一块',
      '万水千山总有情，小费不给行不行',
      
      '千年不洗澡，处处蚊子咬',
      '青青河边草，爱你爱到老',
      '野火烧不尽，明天会更好',
      '用爱来交换爱'
    ],
    tip:'小程序，大世界',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    this.doCurTime(this);//当前时间

    this.doRandTips(this);

    //console.info(app.globalData.locations)
    if (app.globalData.locations) {
      this.setData({
        curLocaton_latitude: '纬度:' + app.globalData.locations.latitude.toFixed(2),
        curLocaton_longitude: "经度:" + app.globalData.locations.longitude.toFixed(2)
      })
    }

    if (app.globalData.userInfo) {
      console.info('onLoad')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.info('canIUse')
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }

      app.locationReadyCallback = res => {
        console.info(app.globalData.locations)
        this.setData({
          curLocaton_latitude: '纬度:' + app.globalData.locations.latitude.toFixed(2),
          curLocaton_longitude: "经度:" + app.globalData.locations.longitude.toFixed(2)
        })
      }
    } else {
      console.info('open-type')
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log('getUserInfo');
    
    app.globalData.userInfo = e.detail.userInfo,
      this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      curTime:''
    })
  },
  //当前时间定时切换显示
  doCurTime: function (_e) {
    setInterval(function () {
      _e.setData({
        curTime: utils.formatTime(new Date)
      });
    }, 1000)
  }, 
  //提示语定时切换显示
  doRandTips: function(_e){
    console.info("length:" + _e.data.tips.length)
    setInterval(function () {
      _e.setData({
        //tip: _e.data.tips[Math.round(Math.random() * (_e.data.tips.length))]
        tip: _e.data.tips[Math.floor(Math.random() * _e.data.tips.length)]
      });
    }, 4000)
  }

})
