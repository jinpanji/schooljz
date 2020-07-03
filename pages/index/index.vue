<template>
	<view class="index_page">
		<!-- 头部 -->
		<view class="cl headers">
			<image src="../../static/img/sy_001bj.png" mode="widthFix"></image>
			<view class="msgbox">
				<view >
					<!--  @click="goRouter()" -->
					<view v-if="isLogin" class="txboxs cl">
						<view v-for="(item,index) in childrenList" :class="childCheck==item.id?'imgbox check':'imgbox'" @click="changeChild(item)">
							<image :src="item.photo?imgUrl+item.phone:'../../static/img/mrtx.jpg'" mode="widthFix"></image>
						</view>
						<!-- <view class="imgbox">
							<image src="../../static/img/sy_002.png" mode="widthFix"></image>
						</view> -->
					</view>
					<view class="teacher" v-else>
						<image class="teachericon" src="../../static/img/sy_007.png" mode="widthFix"></image>
						<text >请登录</text>
					</view>
					
				</view>
				<view class="weather">
					<view class="tit">
						<text class="num">10℃</text>
						<text class="msg">多云转晴</text>
					</view>
					<view class="times">
						<view>
							2020年1月13日
						</view>
						<view>
							冬月三十 周二
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 行程 -->
		<view class="bus_list">
			<image src="../../static/img/img/sy_002.png" mode="widthFix"></image>
			<Trip  />
		</view>
		<!-- 车辆位置 -->
		<view class="translate">
			<view class="tit">
				车辆位置
			</view>
			<view class="times">
				<text>发车时间：{{childLines.startTime?childLines.startTime:''}}</text>
				<text>预计到达：{{childLines.arriveTime?childLines.arriveTime:''}}</text>
			</view>
			<Buslist :list="list"/>
		</view>
		
		<view class="footerbox">
			<!-- 投诉上传 -->
			<image src="../../static/img/img/sy_009.png" mode="widthFix" @click="goInfo(2)"></image>
			<!-- 请假申请 -->
			<image src="../../static/img/img/sy_010.png" mode="widthFix" @click="goInfo(1)"></image>
			<!-- 昨日行程 -->
			<image src="../../static/img/img/sy_011.png" mode="widthFix"  @click="goInfo(3)"></image>
		</view>
	</view>
</template>

<script>
	import Trip from '../../components/common/trip.vue'
	import Buslist from '../../components/common/buslist.vue'
	export default {	
		components:{
			Trip,
			Buslist
		},
		data() {
			return {
				title: 'Hello',
				form:{
				},
				isLogin:true,
				widths:[10,0],
				width1:0,
				flag:false,
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心'],
				childrenList:[],
				imgUrl:"",
				childCheck:null,//当前选中的是哪个学生
				parentInfo:{},
				childLines:{},//当前线路信息
				siteInfo:{},//车辆实时位置信息
				sxFlag:true
			}
		},
		watch:{
			widths:function (oldval,newval){
				console.log(oldval)
			},
			deep:true
		},
		onLoad() {
			this.imgUrl=this.$imgurl
			uni.authorize({
				scope:'userInfo'
			})
		},
		onShow(){
			let parentInfo=uni.getStorageSync("userInfo")
			if(parentInfo){
				parentInfo=JSON.parse(parentInfo)
				this.parentInfo=parentInfo
			}else{
				//未登录
				uni.showToast({
					icon:"none",
					title:"您还未登录，请先登录!"
				})
				setTimeout(()=>{
					uni.switchTab({
						url:"../my/index"
					})
				},1000)
			}
			let id=uni.getStorageSync("childId")
			if(id){
				this.childCheck=id
			}
			// this.childCheck=1
			this.getuserinfo()
		},
		methods: {
			getuserinfo(){
				this.$http.post("puchildren/listByParentId",{
					parentId:this.parentInfo.id
				}).then(res=>{
					if(res.code==100){
						this.childrenList=res.info
						if(!this.childCheck){
							this.childCheck=res.info[0].id
							uni.setStorageSync("childId",res.info[0].id)
						}
						
						this.getLineInfo()
						this.getmainList()
					}
				})
			},
			getLineInfo(){
				console.log('获取当前线路')
				this.$http.post("puline/currentLine",{
					childrenId:this.childCheck
					// childrenId:1
				}).then(res=>{
					if(res.code==100){
						this.childLines=res.info
						this.list=res.info.sites
					}
				})				
			},
			getmainList(){
				// 车辆实时位置
				this.$http.post("puridingrecord/mainList",{
					childrenId:this.childCheck
				}).then(res=>{
					if(res.code==100){
						this.siteInfo=res.info
					}
				})
			},
			changeChild(item){
				// 切换孩子
				// console.log(item)
				this.childCheck=item.id
				uni.setStorageSync("childId",item.id)
				this.getLineInfo()
				this.getmainList()
			},
			goRouter(){
				if(this.isLogin){
					//查看个人资料
					// this.goInfo(2)
					uni.navigateTo({
						url:"../../components/msg/userinfo"
					})
				}else{
					//登陆
					uni.navigateTo({
						url:"../my/login"
					})
				}
				
			},
			touchEnd(){
				if(this.flag){
					console.log("查看线路安全报告")
					uni.navigateTo({
						url:"../../components/msg/security"
					})
				}
				
			},
			goInfo(index){
				switch(index){
					case 1:
						// 行程记录
						uni.navigateTo({
							url:"../../components/msg/Itineraryrecord"
						})
						break
					case 2:
						// this.goRouter()
						//投诉上传
						uni.navigateTo({
							url:"../../components/complaint/index?id="+this.childCheck
						})
						break
					case 3:
						uni.navigateTo({
							url:"../../components/info/trip"
						})
						break
				}
				
			}
		}
		
	}
</script>
 
<style lang="scss" scoped>
	.index_page{
		width: 100%;
		height: 516rpx;
		background: #fff;
		// background:url(../../static/img/sy_001bj.png);
		>image{
			width: 100%;
		}
		.headers{
			position: relative;
			image{
				width: 100%;
			}
		}
		.msgbox{
			position: absolute;
			top: 40rpx;
			padding: 0 30rpx;
			.teachericon{
				width: 30rpx;
				margin-right: 10rpx;
				margin-top: 5rpx;
			}
			.teacher{
				padding: 0 30rpx;
				margin: 34rpx 0;
				border-radius: 20rpx;
				background: #fa5617;
				color: #fff;
				line-height:50rpx ;
			}
			.txboxs{
				view{
					float: left;
					width: 80rpx;
					height: 80rpx;
					overflow: hidden;
					border-radius: 50%;
					margin-right: 40rpx;
					margin-top: 30rpx;
					image{
						width: 100%;						
					}
				}
				.check{
					border:2px solid #fff
				}
			}
		}		
	}
	.bus_list{
		background: #fff;
		margin-bottom: 20rpx;
		>image{
			width: 100%;
		}
	}
	.translate{
		background: #fff;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
		>view{
			padding-left: 20rpx;
			margin-left: 20rpx;
		}
		.times{
			background: #eee;
			border-radius: 40rpx;
			width: 710rpx;
			font-size: 14px;
			line-height: 60rpx;
			margin-bottom: 20rpx;
			text{
				display: inline-block;
				width: 50%;
				text-align: center;
			}
		}
	}
	.footerbox{
		background: #fff;
		padding: 40rpx 0;
		padding-bottom: 140rpx;
		image{
			width: 210rpx;
			margin-left: 30rpx;
		}
	}
</style>
