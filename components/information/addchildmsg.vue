<template>
	<view class="editchild">
		<view class="information">			
			<view class="cl">
				<text>姓名</text>
				<input type="text" value="" placeholder="请输入姓名"/>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<!-- <view class="cl">
				<text>性别</text>
				<view class="">男</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view> -->
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
			<view class="cl">
				<text>年级</text>
				<view class="">一年级，一班</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>出生年月</text>
				<view class="">2016-01-01</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
		</view>		
		<!-- 选择路线 -->
		<view class="selection_route">
			<view class="tit">选择路线</view>
			<Buslist :list="list"/>
		</view>
		<button type="primary" class="preservation">保存</button>
		<!-- 弹出框 -->
		<!-- <picker v-show="true" @change="bindPickerChange" mode="selector" :value="xbcheck" :range="xblist">
			<view class="uni-input">{{xblist[index]}}</view>
		</picker> -->
	</view>
</template>

<script>
	import Buslist from '../../components/common/buslist.vue'
	export default {	
		components:{
			Buslist
		},
		data(){
			return{
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心'],
				xblist:['男','女'],
				xbcheck:0
			}
		},
		methods:{
			xbchange(val){
				console.log(val)
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
			.red{
				color: #fe0000;
			}
			image{
				float: right;
				width: 20rpx;
			}
		}
		>view:last-child{
			border: 0;
		}
	}
	.selection_route,.pick{
		background: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
	}
	
	.preservation{
		width: 100%;
		background: #FF6C00;
		border-radius: 0;
	}
	button:after{
		border: 0;
	}
</style>
