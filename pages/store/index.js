Page({
  data: {
    inputVal: '',
    list: [],
    initData: [],
    array: ['全部', '日用品', '护肤品', '医药品'],
    index: '0',
    searchWord: ''
  },
  onLoad: function () {
    const data = wx.getStorageSync('store')
    this.setData({
      list: data || newlist,
      initData: data || newlist
    })
  },
  bindtapSearch: function (e) {
    const item = e.detail.value
    this.setData({
      searchWord: item
    }, () => {
      this.updateList()
    })
  },
  updateList: function () {
    const { searchWord, index } = this.data;
    const sort = this.data.array[index]
    const list = this.data.initData.filter((val) => {
      const s = searchWord == '' ? true : val.label.indexOf(searchWord) > -1;
      const r = sort == '全部' ? true : val.sort == sort
      return s && r
    })
    this.setData({
      list: list
    })
  },
  bindtapAdd: function () {
    wx.redirectTo({
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
    wx.setStorageSync('store', newlist)
  },
  bindtapDetail: function (e) {
    const detail = e.currentTarget.dataset.item;
    wx.redirectTo({
      url: `/pages/add/index?detail=${JSON.stringify(detail)}`,
    })
  },
  bindPickerChange: function (e) {
    const index = e.detail.value
    this.setData({
      index: index
    }, () => {
      this.updateList()
    })
  },
})