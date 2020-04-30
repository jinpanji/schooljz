<template>
	<view class="userinfopage">
		<view class="cl">
			<text class="txt">头像</text>
			<view class="touxiang">
				<image src="../../static/logo.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="cl">
			<text>姓名</text>
			<input type="text" value="" placeholder="请输入姓名" />
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
					出生日期
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="cl">
			<text>文化程度</text>
			<input type="text" value="" placeholder="请输入文化程度" />
		</view>
		<view class="cl">
			<text>居住地点</text>
			<input type="text" value="" placeholder="请输入地址" />
		</view>
		
		<button type="primary">退出登录</button>
	</view>
</template>

<script>
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
	export default{
		data(){
			return{
				xblist:['男','女'],
				xbcheck:0,
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
			}
		},
		methods:{
			xbchange(val){
				console.log(val)
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.userinfopage{
		padding: 0 20rpx;
		background: #fff;
		padding-bottom: 120rpx;
		>view{
			padding: 40rpx 0;
			border-bottom: 1px solid #ccc;
			text,.uni-list-cell-left{
				float: left;
				color: #ccc;
				width: 220rpx;
			}
			input,.uni-list-cell-db{
				float: left;
				width: 510rpx;
			}
			.txt{
				line-height: 125rpx;
			}
			.touxiang{
				float: left;
				width: 125rpx;
				height: 125rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 2px solid #fff;
				box-shadow: 0px 0px 10px 3px #ccc;
				image{
					width: 100%;
				}
			}
		}
	}
	button{
		background: #FF6C00;
		position: fixed;
		bottom: 0;
		width: 100%;
		left:0;
	}
</style>
