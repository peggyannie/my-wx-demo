Page({
  data: {
    inputVal: '',
    list: [],
    initData: []
  },
  onShow: function () {
    this.init()
  },
  init: function () {
    const data = wx.getStorageSync('todo') || []
    this.setData({
      list: data,
      initData: data
    })
  },
  bindtapSearch: function (e) {
    const item = e.detail.value
    if (item) {
      const newlist = this.data.initData.filter((val) => {
        return val.label.indexOf(item) > -1
      })
      this.setData({
        list: newlist
      })
    } else {
      this.init()
    }
  },
  bindtapAdd:function(){
    wx.navigateTo({
      url: '/pages/add/index',
    })
  },
  bindtapDel: function (e) {
    const del = e.currentTarget.dataset.item
    const newlist = this.data.initData.filter((item) => item.label !== del.label)
    console.log('newlist',newlist)
    this.setData({
      inputVal: null,
      list: newlist
    })
    wx.setStorageSync('todo', newlist)
  }
})