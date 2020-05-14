<template>
	<view class="index_page">
		<!-- 头部 -->
		<view class="cl headers">
			<image src="../../static/img/sy_001bj.png" mode="widthFix"></image>
			<view class="msgbox">
				<view  @click="goRouter()">
					<view v-if="isLogin" class="txboxs cl">
						<view class="imgbox check">
							<image src="../../static/img/sy_002.png" mode="widthFix"></image>
						</view>
						<view class="imgbox">
							<image src="../../static/img/sy_002.png" mode="widthFix"></image>
						</view>
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
			<Trip />
		</view>
		<!-- 车辆位置 -->
		<view class="translate">
			<view class="tit">
				车辆位置
			</view>
			<view class="times">
				<text>发车时间：8:00</text>
				<text>预计到达：8:30</text>
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
				isLogin:false,
				widths:[10,0],
				width1:0,
				flag:false,
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心']
			}
		},
		watch:{
			widths:function (oldval,newval){
				console.log(oldval)
			},
			deep:true
		},
		onLoad() {
			uni.authorize({
				scope:'userInfo'
			})
		},
		onShow(){
			this.getuserinfo()
		},
		methods: {
			getuserinfo(){
				this.$http.post("puchildren/listByParentId",{
					parentId:1
				}).then(res=>{
					
				})
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
			lookDetail(){
				console.log("点击")
				this.flag=false
				// this.widths[0]=10
				//运行当中===>线路详情
				uni.navigateTo({
					url:"../../components/msg/linedetails"
				})
			},
			touchStart(e,index){
				console.log("拖动小车")
				this.flag=true
				// console.log(e)
				let page=e.touches[0].pageX
				// console.log(page)
				// console.log(index)
				switch(index){
					case 0:
					// this.widths[index]=page
					this.width1=page
					// console.log(this.widths[0])
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
							url:"../../components/complaint/index"
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
