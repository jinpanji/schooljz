<template>
	<!-- scroll-left="200px" -->
	<scroll-view class="box" id='box' scroll-x="true" scroll-y="true" :scroll-left="nowOrder>5?(nowOrder-5)*80:0">
		<view class="grouplist cl" :style="'width:'+(list.length*150+150)+'rpx'">
			<view class="li cl" v-for="(item,index) in list">
				<view class="cl" @click="changeNum(item.id)"> 
				<image v-if="checkList.indexOf(item.id)!=-1||(nowSite&&nowSite==item.id)" src="../../static/img/img/sy_005.png" mode="widthFix"></image>
					<i :class="checkList.indexOf(item.id)!=-1||(nowSite&&nowSite==item.id)?'check':''">
						<!-- <em></em> -->
					</i>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="li endli">
				
			</view>
			<!-- <button @click="yd()">移动</button> -->
		</view>
	</scroll-view>
</template>

<script>
	export default{
		props:[
			'list',
			'checkSite',
			'nowSite',
			'nowOrder'
		],
		data(){
			return{
				boxWidth:100,
				checkList:[]
			}
		},
		mounted(){			
		},
		watch:{
			deep:true,
			nowSite:function(newVal,oldVal){
				console.log(newVal)
				  // let info = uni.createSelectorQuery().select(".box");  
				  // console.log(info)
			}
		},
		methods:{
			yd(){
		// 		let info = uni.createSelectorQuery().select("#box");
		// 		console.log(info)
		// 		 info.boundingClientRect(function(data) { //data - 各种参数  
		// 			 console.log(data)  
		// 　　    }).exec()　
			},
			changeNum(id){
				if(!this.$props.nowSite){
					console.log("选择站点")
					console.log(id)
					this.checkList=[id]
					this.$emit("changeLine",id)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		width: 750rpx;
		// overflow-y: scroll;
		// overflow-x: scroll;
		scroll-left:200px;
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
			height: 230rpx;
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
				text{
					writing-mode: vertical-lr;
					letter-spacing: 2px;
				}
			}
		}
	}
</style>
