// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

// Page({
//   data: {
//     logs: [],
//   },
//   onLoad() {
//     this.setData({
//       logs: (wx.getStorageSync('logs') || []).map((log: string) => {
//         return {
//           date: formatTime(new Date(log)),
//           timeStamp: log
//         }
//       }),
//     })
//   },
// })

Page({
  data: {
    data: [{
      avatarPath: 'https://th.bing.com/th?id=OIP.RoNHAE_HE9e8rOdgDDPoPgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2', // 需要你自己填充数据
      avatarName: 'test',
      brief: 'dfd',
      imageUrl: 'https://th.bing.com/th?id=OIP.RoNHAE_HE9e8rOdgDDPoPgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
      comments: 0,
      likes: 0,
    }, {
      avatarPath: 'https://th.bing.com/th?id=OIP.RoNHAE_HE9e8rOdgDDPoPgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2', // 需要你自己填充数据
      avatarName: 'test',
      brief: 'dfd',
      imageUrl: 'https://th.bing.com/th?id=OIP.RoNHAE_HE9e8rOdgDDPoPgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
      comments: 0,
      likes: 0,
    },],
    fileList: [
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 如果需要的话，可以在这里请求和设置数据
  },
  handleCardTap: function () {
    // 这里处理点击了卡片后的逻辑
  },
  handleAvatarTap: function () {
    // 这里处理点击了头像后的逻辑
  },
  handleFavoriteTap: function () {
    // 这里处理点击了"Favorite"后的逻辑
  },
  // https://tamemev-100-tobiashoffman.replit.app/main_process
  afterRead(event: { detail: { file: any; }; }) {
    const { file } = event.detail;
    console.log(file)

    // wx.request({
    //   url: 'https://tamemev-100-tobiashoffman.replit.app/analyze_process', // 更改为你的实际接口地址
    //   method: 'POST',
    //   data: {
    //     text: file.url, // 这里填写你需要发送的字符串
    //   },
    //   header: {
    //     'content-type': 'application/json' 
    //   },
    //   success(res) {
    //     console.log(res.data);
    //   },
    //   fail(error) {
    //     console.error("上传失败:", error);
    //   },
    // });

    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload/main_process', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
});
