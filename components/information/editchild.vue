<template>
	<view class="editchild">
		<view class="information">
			<view class="cl">
				<text>学校名</text>
				<view class="">{{form.schoolName}}</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>姓名</text>
				<input type="text" value="" class="username" v-model="form.name" placeholder="请输入姓名" />
				<!-- <view class="">张三啊</view> -->				
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>	
				<view class="uni-list-cell-db parentbox" v-if="parentData.length>0">
					<picker mode="selector" :value="parentCheck" :range="parentList" @change="ParentChange">
						<view class="uni-input">{{parentList[parentCheck]}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						性别
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :value="xbcheck" :range="xblist" @change="xbchange">
							<view class="uni-input">{{xblist[xbcheck]}}</view>
						</picker>
					</view>
					<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-list cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						关系
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :value="gxcheck" :range="gxlist" @change="gxchange">
							<view class="uni-input">{{gxlist[gxcheck]}}</view>
						</picker>
					</view>
					<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-list classcheck cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						班级
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :range="classlist" :value="classCheck" @change="classchange">
							<view class="uni-input">{{classlist[classCheck]}}</view>
						</picker>
					</view>
					<input type="number" v-model="form.clazz" placeholder="请输入班级" value="" />
					<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-list cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						出生年月
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="cl">
				<text>有效期</text>
				<view class="red">{{form.closeDate?form.closeDate:""}}</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
		</view>		
		<!-- 选择路线 -->
		<view class="selection_route">
			<view class="tit">选择路线</view>
			<view class="lines_list">
				<xfl-select 
					:list="lineStrlist"
					:clearable="false"
					:showItemNum="5" 
					:listShow="false"
					:isCanInput="true"  
					:style_Container="'height: 50px; font-size: 16px;'"
					:placeholder = "'请选择'"
					:initValue="selectValue"
					:selectHideType="'hideAll'"
					@change="selectChange"
				>
				</xfl-select>
			</view>
			<Buslist :list="list" :nowSite="nowSite" @changeLine="changeLine"/>
		</view>
		<view class="pick cl">
			<view class="tit">接送</view>
			<view class="box zao" v-if="productList.productType==1">
				<!-- 早接 -->
				<view class="tits">
					<image src="../../static/img/img/wd_021.png" mode="widthFix"></image>
					<text>早接</text>
				</view>
				<view class="money">
					{{productList.price}}元
				</view>
			</view>
			<view class="box wan" v-if="productList.productType==2">
				<!-- 晚送 -->
				<view class="tits">
					<image src="../../static/img/img/wd_022.png" mode="widthFix"></image>
					<text>晚送</text>
				</view>
				<view class="money">
					{{productList.price}}元
				</view>
			</view>
			<view class="box quan" v-if="productList.productType==3">
				<!-- 全包 -->
				<view class="tits">
					<image src="../../static/img/img/wd_023.png" mode="widthFix"></image>
					<text>全包</text>
				</view>
				<view class="money">
					{{productList.price}}元
				</view>
			</view>
		</view>
		<button type="primary" v-if="!isInfo&&form.closeDate" class="preservation" @click="preservation()">保存</button>
		<view class="btns" v-else>
			<button type="primary" class="preservation" @click="preservation()">保存</button>
			<button type="primary" class="xfbtn" @click="payLines()">结算</button>
		</view>
		<view class="footer" v-else>			
			<view class="right">
				<button type="primary" @click="Settlement()">结算</button>
				<view class="msg">
					合计:
					<text>￥998.00</text>
				</view>
			</view>
		</view>
		<!-- 分配孩子给家长确认按钮 -->
		<view class="shadow" v-if="tsShow">
			<view class="box">
				<h3>提示</h3>
				<image src="../../static/img/img/xxzx_010.png" mode="widthFix"></image>
				<p>您是否要将孩子{{form.name}}分配给家长{{parentData[parentCheck-1].name}}？</p>
				<view class="uni-list-cell-db">
					<picker mode="selector" :value="gxcheck2" :range="gxlist" @change="gxchange2">
						<view class="uni-input">关系：{{gxlist[gxcheck2]}}<text>切换</text></view>
					</picker>
				</view>
				<view class="btns">
					<button type="warn" @click="fpParent()">确定</button>
					<button type="warn" @click="cancelChange()">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Buslist from '../../components/common/buslist.vue'
	import xflSelect from '../common/xfl-select/xfl-select.vue';
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {	
		components:{
			Buslist,xflSelect
		},		
		data(){
			return{
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心'],
				xblist:['女','男'],
				xbcheck:1,
				classlist:["一年级","二年级","三年级","四年级","五年级","六年级"],
				classCheck:0,
				gxlist:["父亲","母亲","爷爷","奶奶","叔叔","阿姨"],
				gxcheck:0,
				gxcheck2:0,
				date:'2020-4-28',
				startDate:getDate('start'),
				endDate:getDate('end'),
				isInfo:false,//false:编辑孩子信息  true详情
				childId:null,
				form:{},
				linesList:[],//线路组
				lineStrlist:[],//线路名称集合
				lineInfo:{
					linesId:0,
					sitesId:0,
				},
				productList:{},
				productLine:[],
				checkProductId:null,
				PaylineInfo:{},
				checkSite:null,
				selectValue:'',
				userInfo:{},
				nowSite:null,
				parentList:['分配给子账号家长'],
				parentData:[],
				parentCheck:0,
				tsShow:false
			}
		},
		onLoad(e){
			console.log("type")
			let userInfo=uni.getStorageSync("userInfo")
			this.userInfo=JSON.parse(userInfo)
			console.log(e.type)
			if(e.id){
				this.childId=e.id
			}
			this.getChildInfo()
			if(e.type==2){
				this.isInfo=true
				uni.setNavigationBarTitle({
				title:'详情'
				})
			}else{
				// 编辑信息时获取学生已购买的线路和线路详情
				this.getPlist()
				this.getchildLines()
				this.getProduct()
			}
			
		},
		methods:{
			ParentChange(e){
				console.log(e)
				if(e.detail.value!=0){
					this.parentCheck=e.detail.value
					this.tsShow=true
				}				
			},
			cancelChange(){
				this.tsShow=false
				this.parentCheck=0
			},
			fpParent(){
				// 分配孩子给家长
				let parentId=this.parentData[this.parentCheck-1].id
				let relation=this.gxlist[this.gxcheck2]
				console.log(parentId)
				console.log(this.childId)
				this.$http.post("puchildren/divide",{
					parentId:parentId,
					childrenId:this.childId,
					relation:relation
				}).then(res=>{
					if(res.code==100){
						uni.showToast({
							icon:"success",
							title:"设置成功！"
						})
						setTimeout(()=>{
							uni.switchTab({
								url:"../../pages/my/index"
							})
						},2000)
					}else if(res.code==250){
						uni.showToast({
							icon:"icon",
							title:res.msg
						})
					}
				})
			},
			getPlist(){
				//获取下级用户
				this.$http.post('puparent/getSubList',{
					parentId:this.userInfo.id
				}).then(res=>{
					if(res.code==100){
						this.parentData=res.info
						let list=[]
						list=res.info
						this.parentList=['分配给子账号家长']
						list.forEach((item,index)=>{
							this.parentList.push(item.name)
						})
					}
				})
			},
			getChildInfo(){
				//获取学生信息
				this.$http.post("puchildren/detail",{
					childrenId:this.childId,
					parentId:this.userInfo.id
				}).then(res=>{
					if(res.code==100){
						this.form=res.info
						this.date=this.form.birthDate
						this.xbcheck=this.form.sex
						if(this.form.relation){
							// this.gxcheck=this.form.relation
							let relationIndex=this.gxlist.indexOf(this.form.relation)
							this.gxcheck=relationIndex
						}
						this.classCheck=(this.form.grade)*1-1
						if(!this.form.closeDate){
							this.getLines()
						}
						if(this.isInfo){
							//快速续费，学校
							let schoolInfo=uni.getStorageSync('addchildinfo')
							schoolInfo=JSON.parse(schoolInfo)
							this.form.schoolName=schoolInfo.schoolName
							this.form.schoolId=schoolInfo.schoolId
							this.getLines()
						}
					}
				})
			},
			getchildLines(){
				this.$http.post("puline/getLineByCharendId",{
					childrenId:this.childId
				}).then(res=>{
					let list=res.info
					// this.linesList=res.info
					if(list.length>0){
						this.lineStrlist=[]
						this.linesList=[]
						this.selectValue=list[0].lineName						
						list.forEach((item,index)=>{
							this.lineStrlist.push(item.lineName)
							this.linesList.push(item)
						})
						let val={
							index:0
						}
						setTimeout(()=>{
							this.selectChange(val)
						},1000)
					}
				})
			},
			getProduct(){
				// 查找孩子购买的产品
				this.$http.post("puProduct/getProductByChildrenId",{
					childrenId:this.childId
				}).then(res=>{
					if(res.code==100){
						this.productList=res.info
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
				this.form.birthDate=e.detail.value
				console.log(this.form.birthDate)
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			xbchange(val){
				console.log(val)
				// 性别改变
				this.xbcheck=val.detail.value
				this.form.sex=val.detail.value
			},
			gxchange(val){
				// 关系改变
				console.log(val)
				this.form.relation=this.gxlist[val.detail.value]
				this.gxcheck=val.detail.value
				console.log(this.form.relation)
			},
			gxchange2(val){
				// 关系改变
				console.log(val)
				this.gxcheck2=val.detail.value
			},
			classchange(val){
				// 年级改变
				this.form.grade=(val.detail.value*1)+1
				this.classCheck=val.detail.value
			},
			selectChange(val){
				// 选择线路，线路改变
				console.log("选择线路")
				console.log(val)
				// console.log(this.lineInfo.linesId)
				if(this.form.closeDate){
					console.log("购买的线路站点")
					console.log(this.linesList)
					if(!this.isInfo){
						this.lineInfo.linesId=this.linesList[val.index].lineId
						this.$http.post("puline/lineDetail",{
							childrenId:this.childId,
							lineId:this.lineInfo.linesId
						}).then(res=>{
							if(res.code==100){
								this.list=res.info.sites
								this.nowSite=res.info.buySite.siteId
							}
						})
					}else{
						// this.lineInfo.linesId=this.linesList[val.index].id
						// 续费
						this.list=this.productLine[val.index].sites
						this.checkProductId=this.productLine[val.index].id
						this.PaylineInfo=this.productLine[val.index]
					}
					
				}else{
					// 购买产品选择线路
					console.log(this.productLine)
					this.list=this.productLine[val.index].sites
					this.checkProductId=this.productLine[val.index].id
					this.PaylineInfo=this.productLine[val.index]
				}
				
			},
			preservation(){
				//保存
				console.log(this.form)
				this.$http.post("puchildren/update",this.form).then(res=>{
					if(res.code==100){
						uni.showToast({
							icon:"success",
							title:"修改成功"
						})
						// 判断是否有线路，没有线路去反馈
					}
				})
			},
			getLines(){
				this.$http.post("puProduct/getProductBySchoolId",{
					schoolId:this.form.schoolId
				}).then(res=>{
					if(res.code==100){
						this.lineStrlist=[]
						let list=[]
						list=res.info
						this.productLine=list
						list.forEach((item,index)=>{
							this.lineStrlist.push(item.name)
							// this.linesList.push(item)
						})
					}
				})
			},
			changeLine(val){
				// 购买时选择站点
				let list=this.list
				list.forEach((item,index)=>{
					if(item.id==val){
						this.PaylineInfo.siteId=item.id
						this.PaylineInfo.siteName=item.name
					}
				})
			},
			payLines(){
				// 结算				
				if(this.PaylineInfo.siteName){
					console.log("是是是是是是 ")
					if(this.isInfo){
						this.preservation()
					}
					this.PaylineInfo.childrenId=this.childId
					let data=JSON.stringify(this.PaylineInfo)
					uni.setStorageSync("userlinesInfo",data)
					console.log(data)
					uni.navigateTo({
						url:"payment"
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"请选择线路及站点"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>	
	.tit{
		padding: 0 20rpx;
	}
	.information{
		padding: 0 30rpx;		
		background: #fff;
		>view{
			padding: 38rpx 0;
			border-bottom: 1px solid #e7e6ec;
			text,.uni-list-cell-left{
				float: left;
				width: 162rpx;		
				color: #969696;
			}
			input,.uni-list-cell-db{
				float: left;
				width: 510rpx;
			}
			.username{
				width: 200rpx;
			}
			.red{
				color: #fe0000;
			}
			image{
				float: right;
				width: 20rpx;
			}
			.parentbox{
				float: right;
				width: 200rpx;
				font-size: 12px;
				color: #55aaff;
			}
		}
		>view:last-child{
			border: 0;
		}
		.classcheck{
			.uni-list-cell-db{
				float: left;
				width: 100rpx;
			}
			input{
				float: left;
				width: 190rpx;
				margin-left: 20rpx;
			}
		}
	}
	.selection_route,.pick{
		background: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
	}
	.pick{
		margin-bottom: 20rpx;
		padding-bottom:120rpx ;
		.box{
			width: 210rpx;
			height: 148rpx;
			float: left;
			margin-left: 20rpx;
			color: #fff;
			border-radius: 20rpx;
			image{
				width: 40rpx;
				margin-left: 20rpx;
				margin-right: 10rpx;
				margin-top: 10rpx;
			}
			.tits{
				padding: 10rpx 0;
				font-size: 12px;
				text-align: left;
			}
			.money{
				text-align: center;
			}
		}
		.zao{
			background: linear-gradient(left top,#4eaa53,#73ca7c);
		}
		.wan{
			background: linear-gradient(left top,#3eabd4,#6fc8ea);
		}
		.quan{
			background: linear-gradient(left top,#f46d2b,#ff8c4f);	
		}
	}
	.preservation{
		width: 100%;
		background: #FF6C00;
		border-radius: 0;
	}
	button:after{
		border: 0;
	}
	.btns{
		button{
			width: 50%;
			display: inline-block;
			border-radius: 0;
		}
		.xfbtn{
			background-color: #F0AD4E;
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		border-top: 1px solid #ccc;
		z-index: 1000000;
		.right{
			float: right;
			width: 550rpx;
			line-height: 100rpx;
			.msg{
				float: right;
			}
			button{
				width: 180rpx;
				background: #FF6C00;
				float: right;
				border-radius: 0;
			}
			text{
				color: red;
				margin: 0 20rpx;
			}
		}
	}
	.shadow{
		position: fixed;
		z-index: 10000000000;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		background-color: rgba(0,0,0,.5);
		.box{
			width: 500rpx;
			padding: 20rpx 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			margin: auto;
			margin-top: 40rpx;
			text-align: center;
			h3{
				line-height: 60rpx;
				color: #999;
			}
			button{
				width: 45%;
				border-radius: 60rpx;
				margin: 0 2%;
				margin-top: 40rpx;
				background-color: #F0AD4E;
				font-size: 14px;
			}
			button:first-child{
				background-color: #FF6C00;
			}
			image{
				width: 150rpx;
				margin: 30rpx;
			}
			p{
				line-height: 50rpx;
				font-size: 16px;
				color: #666;
			}
			.uni-list-cell-db{
				text-align: left;
				color:#666;
				text{
					color: #3eabd4;
					font-size: 12px;
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
