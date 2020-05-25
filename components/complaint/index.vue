<template>
	<view class="page">		
		<view class="jilu">
			<view class="boxlist">
				<h3><text>请选择投诉范围（单选）</text></h3>
				<view class="list">
					<text :class="type==1?'check_index':''">学校名+孩子名+线路名</text>
					<text :class="type==2?'check_index':''">平台</text>
				</view>	
			</view>
			<view class="msgbox">
				<h3><text>投诉内容</text></h3>
				<textarea value="" v-model="content" placeholder="请您将意见填写在这里" />
				
			</view>
			<button type="primary">提交</button>
		</view>
		
	</view>
</template>

<script>
	// import Rili from "../common/dark-calendar/dark-calendar.vue"
	export default{
		components:{

		},
		data(){
			return{
				result:{},
				type:0,//1线路  2：平台
				content:""
			}
		},
		mounted(){
			this.$refs.calendar.show();
		},
		methods:{
			getResult(val){
				console.log(val)
				// this.result=val;
				// this.$refs.calendar.show();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		// height: ;
	}
	.jilu{
		position: relative;
		padding-bottom:100rpx ;
		h3{
			line-height: 100rpx;
			border-bottom: 1px solid #ccc;
			text{
				padding: 0 30rpx;
				border-left: 2px solid #FF6C00;
			}
		}
		.boxlist{
			padding:0 20rpx;
			background: #fff;
			margin-bottom: 20rpx;
			.list{
				text{
					display: inline-block;
					// width: 215rpx;
					padding: 0 40rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 50rpx;
					border: 1px solid #FF6C00;
					color: #FF6C00;
					margin: 20rpx;
					font-size: 14px;
				}
			
				.check_index{
					background: #FF6C00;
					color: #fff;
				}
			}
		}
		.msgbox{
			padding:0 20rpx;
			background: #fff;
			padding-bottom: 100rpx;
			h3{
				border: 0;
			}
			textarea{
				background: #eee;
				border-radius: 20rpx;
				border: 1px solid #ccc;
				height: 600rpx;
				padding:30rpx;
				box-sizing: border-box;
				margin-top: 30rpx;
			}
		}
		.box{
			background: #fff;
			padding: 20rpx 0;
			border-radius: 10rpx;
			border: 1px solid #ccc;
			margin-bottom: 30rpx;
			position: relative;
			font-size: 30rpx;
			.tit{
				margin-left: 20rpx;
			}
			.times{
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				background: #eee;
				padding: 5rpx 0rpx;
				border-radius: 30rpx;
				text{
					margin: 0 20rpx;
				}
			}
			>image{
				width: 100%;
			}
		}
		button{
			background: #FF6C00;
			border-radius: 0;
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}

</style>
