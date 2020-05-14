<template>
	<view class="renewpage">
		<view class="uni-list">
			<!-- 学校 -->
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd cl" >
					<view>
						<radio value="1" :checked="school===1" color="#FF6C00" />
					</view>
					<view>光谷第二小学</view>
				</label>
			</radio-group>
			<!-- 续费项目 -->
			<view class="xflist">
				<view class="listbox cl" v-for="(item, index) in smList" :key="item.value" >
					<view class="imgbox" @click="changeList(index)">
						<image v-if="checkList.indexOf(index)==-1" src="../../static/img/img/wd_019.png" mode="widthFix"></image>
						<image v-else src="../../static/img/img/wd_020.png" mode="widthFix"></image>
						<!-- <radio :value="item.value" :checked="value === current" color="#FF6C00" /> -->
					</view>
					<view class="box cl">
						<view class="bjbox">
							<image :src="item.bj" mode="widthFix"></image>
							<text>{{item.text}}</text>
						</view>
						<view class="msgbox">
							<view class="namebox cl">
								<text>{{item.childName}}</text>
								<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
							</view>
							<Select :list="item.xlList" :checknum="checknum" :indexNum="index" @changNum="changNum"></Select>
							<view class="time">
								到期时间:{{item.endtime}}
							</view>
							<view class="money">
								{{item.money}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="imgbox" @click="allEle()">
				<image v-if="!current" src="../../static/img/img/wd_019.png" mode="widthFix"></image>
				<image v-else src="../../static/img/img/wd_020.png" mode="widthFix"></image>
				<text>全选</text>	
			</view>
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
	import Select from "../common/select.vue"
	export default{
		components:{Select},
		data(){
			return{
				school:0,
				current:false,//全选
				checknum:0,
				checkList:[],//续费项目选择
				smList:[{
					bj:require('../../static/img/img/wd_016.png'),
					value:1,
					text:"早接",
					childName:"李晓鹏",
					xlList:['默认之前选择的线路','线路1','线路2','线路3'],
					endtime:'2020-12-30',
					money:'￥998.00'
				},{
					bj:require('../../static/img/img/wd_015.png'),
					value:2,
					text:"晚送",
					childName:"李晓鹏",
					xlList:['默认之前选择的线路','线路1','线路2','线路3'],
					endtime:'2020-12-30',
					money:'￥998.00'
				},{
					bj:require('../../static/img/img/wd_014.png'),
					value:3,
					text:"全包",
					childName:"李晓鹏",
					xlList:['默认之前选择的线路','线路1','线路2','线路3'],
					endtime:'2020-12-30',
					money:'￥998.00'
				}]
			}
		},
		methods:{
			allEle(){
				//全选
				this.current=!this.current
				this.checkList=[]
				if(this.current){
					let count=this.smList.length
					for(var i=0;i<count;i++){
						this.checkList.push(i)
					}
				}
			},
			changeList(val){
				console.log(val)
				if(this.checkList.indexOf(val)==-1){
					//选中
					this.checkList.push(val)
					if(this.checkList.length==this.smList.length){
						this.current=true//全选
					}
				}else{
					//取消
					let i=this.checkList.indexOf(val)
					this.checkList.splice(i,1)
					this.current=false//取消全选
				}
			},
			changNum(val){
				console.log('changenum')
				console.log(val)
				// this.checknum=val
				
			},
			Settlement(){
				// 结算
				uni.navigateTo({
					url:"../information/editchild?type=2"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.renewpage{
		background: #fff;
		padding: 0 30rpx;
	}
	.listbox,.uni-list-cell{
		border-bottom: 1px solid #ccc;
		padding: 30rpx 0;
		display:  block;
		>view{
			float: left;
		}
		.imgbox{
			width: 40rpx;
			margin-top: 85rpx;
			margin-right: 40rpx;
			image{
				width: 100%;
			}
		}
		radio{
			margin-right: 20rpx;
		}
	}
	.xflist{
		radio{
			margin-top: 60rpx;
		}
	}
	.box{
		width: 600rpx;
		.bjbox{
			float: left;
			width: 200rpx;
			position: relative;
			image{
				width: 100%;
			}
			text{
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				margin: auto;
				height: 30rpx;
				line-height: 30rpx;
				width: 100rpx;
				text-align: center;
				color: #fff;
				font-size: 16px
			}
		}
		.msgbox{
			float: left;
			width:380rpx ;
			margin-left: 20rpx;
			font-size: 14px;
			.namebox{
				width: 100%;
				margin-bottom: 15rpx;
				image{
					float: right;
					width: 20rpx;
				}
			}
			.time{
				line-height: 60rpx;
			}
			.money{
				color: red;
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		// height: 80rpx;
		line-height: 110rpx;
		.imgbox{
			float: left;
			width: 170rpx;
			image{
				width: 40rpx;
				margin-right: 40rpx;
			}
		}
		.right{
			float: right;
			width: 550rpx;
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
