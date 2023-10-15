// logs.ts
// const util = require('../../utils/util.js')
// import * as qiniuUploader from '../../utils/qiniuUploader';

// function initQiniu() {
//   const options: qiniuUploader.QiniuOptions = {
//     region: 'ECN',   // 华东
//     uptokenURL: 'YOUR_SERVER_API',  // 你的服务器 API，用于获取临时的 uptoken
//     domain: 'image1.juramaia.com',  // 文件上传后，访问该文件的域名
//     shouldUseQiniuFileName: false  // 是否使用七牛云上的文件名。为 false 时，使用微信自动生成的文件名
//   };
//   qiniuUploader.init(options);
// }
const baseurl = 'https://b237-2409-891e-3520-25cc-51be-1e2a-fed7-4efa.ngrok-free.app'
const token = "Bearer 23bdc938023098ef06cc489fb79888927a382533433368757012784fbc42368b2f8ec81a1f1bf53ed293426d1e95dafee4242a567d8fa6b32f7bf9b7bc52e4aabca273cab2b7ee468839fa750eb276aa041ed602d8f1b2f25ae982298a4095245a65928bb4e3aee461bd7b787fe5686b4a3df963c803368e4c79555bbdbd14bc"

Page({
  data: {
    data: [{
      avatarPath: 'https://img.midjourneyapi.xyz/mj/3d3a0831-76df-4f48-aa9c-2a344cb0a643.png', // 需要你自己填充数据
      avatarName: '奥比',
      imageUrl: 'https://img.midjourneyapi.xyz/mj/3d3a0831-76df-4f48-aa9c-2a344cb0a643.png',
      comments: 0,
      likes: 0,
    }],
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
    let that = this;
    const { file } = event.detail;
    console.log(file);
    wx.uploadFile({
      url: 'https://b237-2409-891e-3520-25cc-51be-1e2a-fed7-4efa.ngrok-free.app/api/upload',  // 你的上传 API 地址
      filePath: file.tempFilePath,  // 需要上传的文件的路径
      name: 'files',  // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
      header: {
        'Authorization': token
      },
      success(res) {
        console.log('上传成功！', res.data)
        let jsonObject = JSON.parse(res.data);
        console.log(jsonObject[0].url)
        const imageUrl = `${baseurl}${jsonObject[0].url}`
        getAnalyze(imageUrl);
      },
      fail(err) {
        console.log('上传失败：', err)
      }
    })

    console.log(file.tempFilePath)



    const getAnalyze = (imageUrl: string) => {
      wx.request({
        url: 'https://tamemev-100-tobiashoffman.replit.app/api/v1/analyze', // 更改为你的实际接口地址
        method: 'POST',
        data: {
          text: imageUrl, // 这里填写你需要发送的字符串
        },
        timeout: 300000,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          const data = res.data;
          // @ts-ignore
          console.log(res.data.output);
          setTimeout(() => {
            // @ts-ignore
            postTell(data.output || "")
            // @ts-ignore
            getGenerate(data.output || "");
          }, 2000)

        },
        fail(error) {
          console.error("创建失败:", error);
        },
      });
    }

    const postTell = (tell: string)=>{
      wx.request({
        url: 'https://aisoul.juramaia.com/tell', // 更改为你的实际接口地址
        method: 'POST',
        data: {
          message: tell, // 这里填写你需要发送的字符串
        },
        timeout: 300000,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          const data = res.data;
          // @ts-ignore
          console.log(res.data);
        },
        fail(error) {
          console.error("创建失败:", error);
        },
      });
    
    }

    const getGenerate = (analyze: string) => {
      wx.request({
        url: 'https://tamemev-100-tobiashoffman.replit.app/api/v1/generate', // 更改为你的实际接口地址
        method: 'POST',
        data: {
          text: analyze, // 这里填写你需要发送的字符串
        },
        timeout: 300000,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          let newArray = that.data.data;
          // @ts-ignore
          const imageUrl = res.data.image_url || "";
          if (imageUrl) {
            let newItem = {
              avatarPath: 'https://th.bing.com/th?id=OIP.RoNHAE_HE9e8rOdgDDPoPgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
              avatarName: 'test',
              imageUrl: imageUrl,
              brief: '',
              comments: 0,
              likes: 0
            };
            newArray.unshift(newItem);
            that.setData({ data: newArray });
          }


        },
        fail(error) {
          console.error("创建失败:", error);
        },
      });
    }



  },
});
