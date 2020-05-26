<template>
	<view class="info_page">
		<view class="title">
			{{msgDetail.type==1?'家长投诉':(msgDetail.type==2?'请假':(msgDetail.type==3?'回复':'安全员推送'))}}
		</view>
		<text>{{msgDetail.createTime}}</text>
		<view class="msg">
			<!-- 您管理的线路xxx(起点)--yy(终点)，有xxx(孩子名)请假，共提交请假z天，请假y车次！该车次未来上车人数为gg（实际减1）,此信息不作为最终确定人数。 -->
			{{msgDetail.content}}
		</view>
		<!-- <button>确认</button> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				msgDetail:{}
			}
		},
		onLoad(e){
			let msgDetail=uni.getStorageSync("msgdetails")
			this.msgDetail=JSON.parse(msgDetail)
			this.init()
		},
		methods:{
			init(){
				this.$http.post("puNews/updateState",{
					id:this.msgDetail.id,
					state:1,
				}).then(res=>{
					if(res.code!=100){
						uni.showToast({
							icon:"none",
							title:res.msg
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info_page{
		padding:0 30rpx;
		font-size: 28rpx;
		.title{
			text-align: center;
			line-height:85rpx ;
			font-size: 36rpx;
			font-weight: bold;
		}
		>text{
			color: #ccc;
			line-height: 54rpx;
		}
		.msg{
			line-height: 58rpx;
		}
	}
	button:after{
		border: 0;
	}
	button{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius:0;
		background: #ff6d00;
		color: #fff;
	}
</style>
