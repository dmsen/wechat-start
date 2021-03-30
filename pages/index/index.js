// index.js
// 获取应用实例
const app = getApp()
var myBehavior = require('../../my-behavior.js')
// const query = wx.createSelectorQuery()
// query.select('#tapTest').boundingClientRect(function(res){
//   //res.top // #the-id 节点的上边界坐标（相对于显示区域）
//   res.top
// })
// query.selectViewport().scrollOffset(function(res){
//   //res.scrollTop // 显示区域的竖直滚动位置
// })
// query.exec()
Page({
  behaviors: [myBehavior],
  data: {
    value:"default",
    name: 'Weixin',
    motto: 'Hello World  motto',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  tapName: function(event) {
    console.log(event)
  
  },
  changeName: function(e) {
    // sent data change to view
    this.setData({
      name: 'MINA'+this.data.sharedText
    })
    // 获得全局数据-app.js
    console.log(getApp().globalData)
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLaunch (options) {
    // Do something initial when launch.
    
  },
  onLoad(e) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    
      console.log(getCurrentPages()[0].route)
      //console.log(e)
    }
    // 节点相交状态
    wx.createIntersectionObserver().relativeToViewport().observe('.user-motto', (res) => {
      //console.log(res.id,res.dataset ) //{} {}
      res.id // 目标节点 id
      res.dataset // 目标节点 dataset
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
    })
    wx.createIntersectionObserver(this, {
      thresholds: [0.2, 0.5]
    }).relativeTo('.usermotto').relativeToViewport().observe('.user-motto', (res) => {
      console.log(res.intersectionRatio  )  // 1
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
    })
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(getApp().globalData)
  },
  
})
