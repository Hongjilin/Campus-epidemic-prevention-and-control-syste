<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple1">
          <div class="main-content">
            <div class="left">
              <span class="top">{{this.count.fever}}</span>
              <span class="bottom">发烧人数</span>
            </div>
            <div class="right">
              <i class="el-icon-user-solid"></i>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple2">
          <div class="main-content">
            <div class="left">
              <span class="top">{{this.count.risk}}</span>
              <span class="bottom">经过高危地区人数</span>
            </div>
            <div class="right">
              <i class="el-icon-user-solid"></i>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple3">
          <div class="main-content">
            <div class="left">
              <span class="top">{{this.count.fill}}</span>
              <span class="bottom">今日填报人数</span>
            </div>
            <div class="right">
              <i class="el-icon-user-solid"></i>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple4">
          <div class="main-content">
            <div class="left">
              <span class="top">{{this.count.fever}}</span>
              <span class="bottom">核酸检测人数</span>
            </div>
            <div class="right">
              <i class="el-icon-user-solid"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="yq">
      <!-- 疫情地图 -->
    <div class="" >
    <!-- 初始化echarts需要个 有宽高的 盒子 -->
        <div ref='mapbox' style='height:400px;width:600px'></div>
    </div>

    
      
         <el-table max-height='400' stripe
        :cell-style="setRowStyle"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="city"
        label="市区"
        height='120'
        >
      </el-table-column>
      
      <el-table-column
        prop="addConfirm"
        label="累计确诊">
      </el-table-column>
      <el-table-column
        prop="addheal"
        label="累计治愈">
      </el-table-column>
      <el-table-column
        prop="confirm"
        label="现有确诊">
      </el-table-column>
    </el-table>
      
    
    </div>
    
  </div>
</template>

<script>
import {getUserfever,gorisk,getfill} from '../api/user'
import * as echarts from 'echarts'
//  import '../../../node_modules/echarts/map/js/china.js'
import '../china'
 import jsonp from 'jsonp'

 const option = {
    title:{
      // text:"cookie_fzx",
      // link:"https://blog.csdn.net/image_fzx",
      // subtext:"疫情期间找工作---work hard!!!!",
      // sublink:"https://blog.csdn.net/image_fzx"
    },
// ----------   series：地图数据可视化，添加data数据    ---------------------

    series:[{
      name:"确诊人数",
      type:'map', // 告诉echarts 要去渲染的是一个地图
      map:'china',// 告诉echarts  要去渲染中国地图
      label:{    // 控制对应地区的汉字      
        show:true,
        color:'#333',// 控制地区名的字体颜色---黑色，省名字
        fontSize:10
      },
      itemStyle:{      // 地图板块的颜色和边框---灰色，各个省界线
        areaColor:'#eee',
        // borderColor:'blue'
      },
      roam:true,
      zoom:1.2,// 控制地图的放大和缩小
      emphasis:{    // 控制鼠标滑过之后的背景色和字体颜色--白色       
        label:{
          color:'#fff',
          fontSize:12
        },
        itemStyle:{
          areaColor:'#83b5e7'   //  滑动到哪个地区就显示蓝色
        }
      },
      data:[]    // 用来展示后台给的数据的 {name:xx,value:xxx}
    }],

//-----------    visualMap：视觉映射，每个颜色代表什么含义   -----------------------------
    visualMap:[{
      type:'piecewise',
      show:true,
      // splitNumber:4
      pieces:[           // 分段
        {min:10000},
        {min:1000,max:9999},
        {min:100,max:999},
        {min:10,max:99},
        {min:1,max:9}
      ],
      // align:'right',// 默认left
      // orient:'horizontal' 默认竖直
      // left right 这些属性控制 分段坐在的位置
      // showLabel:false
      // textStyle:{}
      inRange:{
        symbol:'rect',
        color:['#ffc0b1','#9c0505']   //   浅红~~深红色
      },
      itemWidth:20,
      itemHeight:10
    }],

//-------------------------------------------------------------------
    tooltip:{
      trigger:'item'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        // dataView: {readOnly: false},
        // restore: {},
        saveAsImage: {}
      }
    },
  };

export default {
  data () {
    return {
      count:{
        fever:'',
        risk:'',
        fill:''
      },
      tableHeight:100,
       tableData: []
    }
  },
  
     mounted() {
      this.getData();// 为什么不再created
      this.mychart = echarts.init(this.$refs.mapbox);
      this.mychart.setOption(option)
    },
  
  created() {
    this.getCount()
  },
  methods: {
    async getCount(){
      const filldata=this.$formart(new Date())
    
      const res1 =await getUserfever({filldata})
      const res2 =await gorisk({filldata})
      const res3 =await getfill({filldata})
      
      this.count.fever=res1.count
      this.count.risk=res2.count
      this.count.fill=res3.count  
    },
    setRowStyle({row, column}){
      if(column.label=='累计治愈'){
        return 'color:green'
      }
    },

    // 获取疫情地图数据
    getData(){
        jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',{},(err,data)=>{
          if(!err){    
            let arr=[]         // 代表请求数据成功
            const res =data.data.list[11].city //拿到福建省各市区的数据
            res.map(item=>{
              let obj={
                city:item.name,
                addConfirm:item.conNum,
                confirm:item.econNum,
                addheal:item.cureNum
              }
              arr.push(obj)
              
              
            })
           this.tableData=arr
            
            let list = data.data.list.map(item=>({name:item.name,value:item.value}))
            
            option.series[0].data = list;
            this.mychart.setOption(option);
            // 这行代码能执行的前提是 DOM已经渲染完成，只有DOM渲染完成才能够执行 echarts初始化
          }
        })
      }
  },
}
</script>

<style lang="less" scoped>
// 
  .yq{
    display: flex;
    
  }

   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    .main-content {
      padding: 15px ;
      .left{
        display: flex;flex-direction: column;
      .top{font-size: 24px;}
      span{color: white;}
      }
      .right{
        font-size: 40px;
      }
      display: flex;
      justify-content: space-between;
    }
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple1 {
    background: #0a97bb;
  }
  .bg-purple2 {
    background: #1d9442;
  }
  .bg-purple3 {
    background: #e94542;
  }
  .bg-purple4 {
    background: #ffbc00;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 100px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  // 
</style>