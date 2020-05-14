<template>
	<view class="editchild">
		<view class="information">
			<view class="cl">
				<text>学校名</text>
				<view class="">光谷第二小学</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="cl">
				<text>姓名</text>
				<input type="text" value="" placeholder="请输入姓名" />
				<!-- <view class="">张三啊</view> -->
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
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
						班级
					</view>
					<view class="uni-list-cell-db">
						<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :range="classlist" :value="classCheck" @change="xbchange">
							<view class="uni-input">{{classlist[0][classCheck[0]]}}</view>
						</picker>
					</view>
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
				<view class="red">2020-12-30</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
		</view>		
		<!-- 选择路线 -->
		<view class="selection_route">
			<view class="tit">选择路线</view>
			<Buslist :list="list"/>
		</view>
		<view class="pick cl">
			<view class="tit">接送</view>
			<view class="box zao">
				<!-- 早接 -->
				<view class="tits">
					<image src="../../static/img/img/wd_021.png" mode="widthFix"></image>
					<text>早接</text>
				</view>
				<view class="money">
					998.00元
				</view>
			</view>
			<view class="box wan">
				<!-- 晚送 -->
				<view class="tits">
					<image src="../../static/img/img/wd_022.png" mode="widthFix"></image>
					<text>晚送</text>
				</view>
				<view class="money">
					998.00元
				</view>
			</view>
			<view class="box quan">
				<!-- 全包 -->
				<view class="tits">
					<image src="../../static/img/img/wd_023.png" mode="widthFix"></image>
					<text>全包</text>
				</view>
				<view class="money">
					998.00元
				</view>
			</view>
		</view>
		<button type="primary" v-if="!isInfo" class="preservation">保存</button>
		<view class="footer" v-else>			
			<view class="right">
				<button type="primary" @click="Settlement()">结算</button>
				<view class="msg">
					合计:
					<text>￥998.00</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Buslist from '../../components/common/buslist.vue'
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
			Buslist
		},		
		data(){
			return{
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心'],
				xblist:['男','女'],
				xbcheck:1,
				classlist:[
					["一年级","二年级","三年级","四年级","五年级","六年级"],
					["一班","二班","三班",'四班']
				],
				classCheck:[0,1],
				// date: getDate({
				// 	format: true
				// }),
				date:'2020-4-28',
				startDate:getDate('start'),
				endDate:getDate('end'),
				isInfo:false,//false:编辑孩子信息  true详情
			}
		},
		onLoad(e){
			console.log("type")
			console.log(e.type)
			if(e.type==2){
				this.isInfo=true
				uni.setNavigationBarTitle({
				title:'详情'
				})
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
</style>
