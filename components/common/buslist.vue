<template>
	<view class="box">
		<view class="grouplist cl" :style="'width:'+(list.length*150+150)+'rpx'">
			<view class="li cl" v-for="(item,index) in list">
				<view class="cl" @click="changeNum(item.id)"> 
				<image v-if="checkList.indexOf(item.id)!=-1" src="../../static/img/img/sy_005.png" mode="widthFix"></image>
					<i :class="checkList.indexOf(item.id)!=-1?'check':''">
						<!-- <em></em> -->
					</i>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="li endli">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:[
			'list'
		],
		data(){
			return{
				boxWidth:100,
				checkList:[]
			}
		},
		mounted(){
			// let listLen=this.$props.list.length
			// console.log(lis\)
			// this.boxWidth=listLen*140
		},
		methods:{
			changeNum(id){
				console.log("选择站点")
				console.log(id)
				this.checkList=[id]
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		width: 750rpx;
		overflow-y: hidden;
		overflow-x: scroll;
	}
	.grouplist{
		margin-top: 30rpx;
		padding-top: 40rpx;
		.li:first-child{
			width: 30rpx;
			padding-left: 80rpx;
		}
		.endli{
			width: 80rpx;
		}
		
		.li{
			float: left;
			position: relative;
			border-top: 30rpx solid #7fc1f5;
			width: 150rpx;
			height: 200rpx;
			>view{
				
				position: absolute;
				right: 15rpx;
				top: -38rpx;
				width: 20rpx;
				z-index: 1000;
				i{
					display: inline-block;
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;		
				    background: url(../../static/img/img/sy_008.png) no-repeat;
					background-size: 90% 90%;
				}
				image{
					position: absolute;
					top: -50rpx;
					width: 40rpx;
				}
				.check{
					background: #fff;
					border: 3px solid #FF6C00;
					text-align: center;
					position: relative;
					em{
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						height: 20rpx;
						width: 20rpx;
						background: #FF6C00;
						border-radius: 50%;
					}
				}
				.check+text{
					color: #FF6C00;
				}
			}
		}
	}
</style>
