Page({
  data: {
    array: ['日用品', '护肤品', '医药品'],
    index: '0',
    inputLabel: '卫生纸',
    inputCount: '1卷',
    edit: false,
    tobuy: false
  },
  onLoad: function (opt) {
    if (opt.detail) {
      const data = JSON.parse(opt.detail);
      wx.setNavigationBarTitle({ title: data.label })
      this.setData({
        inputLabel: data.label,
        inputCount: data.count,
        index: this.data.array.findIndex((v) => v == data.sort),
        inputDetail: data.bz,
        tobuy: data.tobuy,
        edit: true
      })
    }
    if (opt.tobuy) {
      wx.setNavigationBarTitle({ title: '计划购买' })
      this.setData({
        tobuy: true
      })
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  confirm: function () {
    const inputLabel = this.data.inputLabel
    const inputCount = this.data.inputCount
    const inputDetail = this.data.inputDetail
    const initdata = wx.getStorageSync('store') || []
    const flag = initdata.some((val) => val.label == inputLabel)
    if (flag) {
      wx.showToast({
        title: '小主重复了~',
        icon: 'none'
      })
      return
    }
    if (inputLabel && inputCount) {
      const newlist = [...initdata, {
        label: inputLabel,
        count: inputCount,
        sort: this.data.array[this.data.index],
        bz: inputDetail,
        tobuy: this.data.tobuy
      }]
      wx.setStorageSync('store', newlist)
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '必填项没填~',
        icon: 'none'
      })
    }
  },
  bindtapEdit: function () {
    const inputLabel = this.data.inputLabel
    const inputCount = this.data.inputCount
    const inputDetail = this.data.inputDetail
    const initdata = wx.getStorageSync('store') || []
    if (inputLabel && inputCount) {
      const newlist = initdata.map((item) => {
        if (item.label == inputLabel) {
          return {
            label: inputLabel,
            count: inputCount,
            sort: this.data.array[this.data.index],
            bz: inputDetail,
            tobuy: this.data.tobuy
          }
        } else {
          return {
            ...item
          }
        }
      })
      wx.setStorageSync('store', newlist)
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '必填项没填~',
        icon: 'none'
      })
    }
  }
})