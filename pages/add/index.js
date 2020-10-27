Page({
  data: {
    array: ['分类1', '分类2', '分类3', '分类4'],
    index:'0',
    inputLabel:'',
    inputCount:'',
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  confirm:function(){
    const inputLabel = this.data.inputLabel
    const inputCount = this.data.inputCount
    const initdata = wx.getStorageSync('todo') || []
    const flag = initdata.some((val)=>val.label == inputLabel)
    if (flag) {
      wx.showToast({
        title: '小主重复啦',
        icon: 'none'
      })
      return
    }
    if (inputLabel&&inputCount) {
      const newlist = [...initdata, {
        label:inputLabel,
        count:inputCount,
        sort:this.data.array[this.data.index]
      }]
      wx.setStorageSync('todo', newlist)
      wx.switchTab({
        url: '/pages/store/index',
      })
    }
  }
})