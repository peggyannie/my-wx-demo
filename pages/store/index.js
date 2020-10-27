Page({
  data: {
    inputVal: '',
    list: [],
    initData: [],
    array: ['全部', '日用品', '护肤品', '医药品'],
    index: ''
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
  bindtapAdd: function () {
    wx.navigateTo({
      url: '/pages/add/index',
    })
  },
  bindtapDel: function (e) {
    const del = e.currentTarget.dataset.item;
    const newlist = this.data.initData.filter((item) => item.label !== del.label)
    this.setData({
      inputVal: null,
      list: newlist,
      initData: newlist
    })
    wx.setStorageSync('todo', newlist)
  },
  bindtapDetail: function (e) {
    const detail = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/add/index?detail=${JSON.stringify(detail)}`,
    })
  },
  bindPickerChange: function (e) {
    const index = e.detail.value
    this.setData({
      index: index
    })
    if (index == 0) {
      this.setData({
        list: this.data.initData
      })
    } else if (index > 0) {
      const newlist = this.data.initData.filter((item) => item.sort == this.data.array[index])
      this.setData({
        list: newlist
      })
    }
  },
})