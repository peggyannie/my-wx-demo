Page({
  data: {
    inputVal:'',
    list: []
  },
  onLoad: function () {
    this.setData({
      list:['待办']
    })
  },
  bindtapAdd:function(){
    const item = this.data.inputVal
    if(item){
      this.setData({
        inputVal:null,
        list:[...this.data.list,item],
      })
    }
  },
  bindtapDel:function(e){
    console.log('e.currentTarget.dataset.item',e.currentTarget.dataset.item)
  }
})
