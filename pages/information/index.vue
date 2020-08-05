<template>
	<view class="information">
		<!-- 通知列表 -->
		<view class="list_box footerbox"v-if="!isNone">
			<view class="box cl" v-for="(item,index) in msgList" @click="goLeave(item)" @touchstart="touchStart($event)" @touchend="touchEnd($event,index)">
				<view class="img">
					<image :src="imgList[(item.type*1)-1]" mode="widthFix"></image>
				</view>
				<view class="textbox">
					<h3>
						<text>{{item.type==1?'家长投诉':(item.type==2?'请假':(item.type==3?'回复':(item.type==4?'安全员推送':(item.type==5?'系统消息':'乘车情况'))))}}</text>
						<text>{{item.createTime}}</text>
					</h3>
					<text>{{item.content}}</text>
				</view>
				<!-- <view :class="deleCheck==index?'deletebox show':'deletebox'">
					删除
				</view> -->
			</view>
			
		</view>
		
		<!-- 悬浮框 -->
		<!-- <view class="fixed" @click="goGroup()">
			<image src="../../static/img/xxzx_001.png" mode="widthFix"></image>
		</view> -->
		
		<!-- 无通知提示 -->
		<view class="nonebox" v-show="isNone">
			<image src="../../static/img/xxzx_008.png" mode="widthFix"></image>
			<h3>无通知信息</h3>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isNone:false,//无通知消息：true
				// imgList:[
				// 	require("../../static/img/img/xxzx_001.png"),
				// 	require("../../static/img/img/xxzx_003.png"),
				// 	require("../../static/img/img/xxzx_004.png"),
				// 	require("../../static/img/img/xxzx_010.png"),
				// 	require("../../static/img/img/xxzx_008.png"),
				// 	require("../../static/img/img/xxzx_013.png"),
				// 	require("../../static/img/img/xxzx_005.png"),
				// 	require("../../static/img/img/xxzx_006.png"),
				// 	require("../../static/img/img/xxzx_012.png"),
				// 	require("../../static/img/img/xxzx_014.png"),
				// 	require("../../static/img/img/xxzx_007.png"),
				// 	require("../../static/img/img/xxzx_011.png"),
				// 	require("../../static/img/img/xxzx_002.png"),
				// 	require("../../static/img/img/xxzx_009.png")//投诉回复
				// ],
				imgList:[
					"../../static/img/img/xxzx_004.png",
					"../../static/img/img/xxzx_012.png",
					"../../static/img/img/xxzx_009.png",
					"../../static/img/img/xxzx_007.png",
					"../../static/img/img/xxzx_011.png",
					"../../static/img/img/xxzx_010.png"
				],
				pageNum:1,
				pageSize:10,
				userInfo:{},
				msgList:[],
				total:null,
				deleCheck:null,
				startNum:null,
				sxFlag:true
			}
		},
		onLoad(){
			let userInfo=uni.getStorageSync("userInfo")
			this.userInfo=JSON.parse(userInfo)
			this.getmsgList()
		},
		// 需要 下拉刷新，上拉加载
		methods:{
			goLeave(item){
				//今日请假
				let str=JSON.stringify(item)
				uni.setStorageSync("msgdetails",str)
				uni.navigateTo({
					url:"../../components/info/index?id="+item.id
				})
			},
			goGroup(){
				//群发
				uni.navigateTo({
					url:"../../components/msg/groupsend"
				})
			},
			goTs(){
				//投诉
				uni.navigateTo({
					url:"../../components/complaint/index"
				})
			},
			getmsgList(){
				this.$http.post("puNews/list",{
					// parentId:1,
					parentId:this.userInfo.id,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}).then(res=>{
					if(res.code==100){
						this.sxFlag=true
						if(res.info.total==0){
							this.isNone=true
						}else{
							this.isNone=false
							let list=res.info.rows
							list.forEach((item,index)=>{
								this.msgList.push(item)
							})
							this.total=res.info.total
						}
						
					}
				})
			},
			touchStart(e){
				// 滑动显示
				console.log(e)
				this.startNum=e.changedTouches[0].pageX
				console.log(this.startNum)
			},
			touchEnd(e,index){
				let endNum=e.changedTouches[0].pageX
				console.log(this.startNum-endNum)
				if(this.startNum-endNum>80){
					// console.log()
					this.deleCheck=index
				}else{
					this.deleCheck=null
				}
			}
		},
		onReachBottom: function(){
			//上拉加载
			if(this.sxFlag&&this.msgList.length<this.total){
				this.sxFlag=false
				this.pageNum++
				this.getmsgList()
			}
		},
		onPullDownRefresh: function(){
			//下拉刷新
			let that=this
			console.log('下拉刷新')
			if(this.sxFlag){
				this.sxFlag=false
				uni.startPullDownRefresh({
					success:()=>{
						that.pageNum=1
						that.pageSize=10
						that.msgList=[]
						that.getmsgList()
					}
				})
			}else{
				uni.stopPullDownRefresh()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.information{		
		.titles{
			padding: 30rpx;
			background: #fff;
			>view{
				float: left;
				position: relative;
				width: 330rpx;
				image{
					width: 100%;
				}
				text{
					position: absolute;
					right: 10rpx;
					bottom: 30rpx;
					padding: 5rpx 30rpx;
					border-radius: 20rpx;
					color: #fff;
					font-size: 24rpx;
				}
			}
			.qinj{
				margin-left: 28rpx;
				text{
					background: #26a2c6;
				}
			}
			.tous{
				text{
					background: #43a047;
				}
			}
		}
	}
	.list_box{
		padding: 0 30rpx;
		background: #fff;
		// padding-bottom: 50rpx;
		border-bottom: 1px solid #ccc;
		.box{
			padding: 25rpx 0;
			border-bottom: 1px solid #ccc;
			position: relative;
			.img{
				float: left;
				width: 90rpx;
				margin-right: 20rpx;
				margin-top: 15rpx;
				image{
					width: 100%;
				}
			}
			.textbox{
				float: left;
				width: 580rpx;
				font-size: 28rpx;
				// font-weight: ;
				line-height:60rpx;
				h3{
					width: 100%;
					text:nth-child(2){
						float: right;
						font-weight: normal;
						color: #ccc;
					}
				}
				>text{
					color: #646464;
					display: block;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.deletebox{
				width: 150rpx;
				height: 100%;
				line-height: 158rpx;
				position: absolute;
				top: 0;
				right: -180rpx;
				background: #FF6C00;
				color: #fff;
				text-align: center;
				transition: 0.5;
			}
			.show{
				right: 0;
			}
		}
		.box:last-child{
			border: 0;
		}
	}
	.fixed{
		position: fixed;
		right: 30rpx;
		bottom: 100rpx;
		width: 102rpx;
		height: 202rpx;
		image{
			width: 100%;
		}
	}
	.nonebox{
		text-align: center;
		image{
			width: 300rpx;
			margin: auto;
			margin-top: 160rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
