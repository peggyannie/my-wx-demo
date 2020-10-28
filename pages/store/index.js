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
    console.log('11')
    const data = wx.getStorageSync('store')
    const newlist = this.mock()
    this.setData({
      list: data || newlist,
      initData: data || newlist
    })
  },
  mock: function () {
    return [{
      label: '抽纸',
      count: '10包',
      sort: '日用品',
      bz: ''
    }, {
      label: '卷纸',
      count: '12卷',
      sort: '日用品',
      bz: '120抽/卷'
    }, {
      label: '棉签',
      count: '2包',
      sort: '医药品',
      bz: '100支/包'
    }, {
      label: '保湿霜',
      count: '1瓶',
      sort: '护肤品',
      bz: '50ml/瓶'
    }]
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