<template>
	<view class="my_page">
		<view class="usermsg">
			<image src="../../static/img/img/wd_048.png" mode="widthFix"></image>
			<view class="msgbox">
				<h5>
					<image src="../../static/img/img/wd_003.png" mode="widthFix"></image>
				</h5>
				<view class="txbox">
					<image src="../../static/img/img/sy_001.png" mode="widthFix"></image>
				</view>
				<view class="username">
					{{userName}}
				</view>
				<view class="js">
					<image src="../../static/img/img/wd_001.png" mode="widthFix"></image>
					<text>家长</text>
				</view>
			</view>
		</view>
		<!-- 孩子信息 -->
		<view class="childmsg msgbox">
			<view class="tit">
				孩子信息
			</view>
			 <view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-active-color="#fe6b01" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item>
								<view class="swiper-item" @click="goEdit(1)">
									<h3 class="cl">
										<text>光谷第二小学</text>
										<view class="nj">
											<text>一年级</text>
											<image src="../../static/img/img/wd_008.png" mode="widthFix"></image>
										</view>
										<view class="xb">
											<!-- 女生 -->
											<text>女生</text>
											<image src="../../static/img/img/wd_006.png" mode="widthFix"></image>
											<!-- 男生 -->
											<!-- <image src="../../static/img/img/wd_007.png" mode=""></image> -->
										</view>										
									</h3>
									<view class="cl">
										<text>姓名：</text>
										<tex>李晓鹏</tex>
										<i>已录入</i>
									</view>
									<view class="cl">
										<text>线路:</text>
										<view class="xl">
											<view class="cl">
												<text>光谷大道金融港</text>
												<image src="../../static/img/img/wd_002.png" mode="widthFix"></image>
												<text>光谷大道现代</text>
											</view>
											<view class="cl">
												<text>光谷大道金融港</text>
												<image src="../../static/img/img/wd_00202.png" mode="widthFix"></image>
												<text>光谷大道现代世贸中心</text>
											</view>
										</view>
									</view>
									<view class="cl">
										<text>到期时间：</text>
										<tex>2020年3月27日</tex>
									</view>
								</view>
							</swiper-item>
							
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<!-- 家长组信息 -->
		<view class="jzmsg msgbox">
			<view class="tit">
				家长组信息
			</view>
			 <view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-active-color="#fe6b01" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item>
								<view class="swiper-item" @click="goEdit(2)">
									<h3 class="cl">
										<text>妈妈</text>
									</h3>
									<view class="msgs">
										<text>姓名：</text>
										<text>张三</text>
										<view class="switchbox cl">
											<text class="status" :style="ischeck?'left: 0rpx;color:#fff;':'right: -30rpx;'">{{ischeck?'开':'关'}}</text>
											<switch :checked="ischeck" @change="switch1Change" />
										</view>
										
									</view>
									<view class="msgs">
										<text>性别：</text>
										<text>女</text>									
									</view>
									<view class="msgs">
										<text>联系方式：</text>
										<text>1854585254</text>									
									</view>
								</view>
							</swiper-item>
							
						</swiper>
					</view>
				</view>
			</view>			
		</view>
		<view class="footerbox">
			<!-- 安全报告 -->
			<image src="../../static/img/img/wd_011.png" mode="widthFix" @click="goInfo(2)"></image>
			<!-- 快速续费 -->
			<image src="../../static/img/img/wd_012.png" mode="widthFix" @click="goInfo(1)"></image>
			<!-- 邀请奖励 -->
			<image src="../../static/img/img/wd_013.png" mode="widthFix"></image>
		</view>
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userName:"用户名",
				 background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				ischeck:false,
				
			}
		},
		methods:{
			switch1Change(val){
				// console.log(val.detail.value)
				this.ischeck=val.detail.value
			},
			goEdit(val){
				if(val==1){
					//编辑孩子信息
					uni.navigateTo({
						url:"../../components/information/editchild"
					})
				}else{
					//编辑家长信息
					uni.navigateTo({
						url:"../../components/information/editparent"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.usermsg{
		height: 420rpx;
		position: relative;
		>image{
			width: 100%;
		}
		.msgbox{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 1000;
			color: #fff;
			h5{
				text-align: left;
				margin-top: 70rpx;
				margin-left: 30rpx;
				image{
					width: 50rpx;
				}
			}
			.txbox{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 2px solid #FFFFFF;
				margin: auto;
				overflow: hidden;
				box-shadow: 0px 0px 5px 0px #999999;
				image{
					width: 150%;
					margin-left: -50%;
				}
			}
			.username{
				line-height: 80rpx;
				text-align: center;
				font-size: 16px;
			}
			.js{
				width: 100rpx;
				height: 44rpx;
				background: #f54009;
				padding: 0 33rpx;
				line-height: 44rpx;
				font-size: 12px;
				margin: auto;
				border-radius: 20rpx;
				image{
					width: 35rpx;
					margin-right: 10rpx;
				}
				
			}
		}
	}
	.msgbox{
		padding: 0 30rpx;
		margin-top: 28rpx;
		.tit{
			padding: 0 20rpx;
		}
	}
	.swiper-item{
		background: #fff;
		border: 1px solid #eee;
		border-radius:20rpx;
		box-shadow: 0px 0px 1px 1px #ccc;
		margin-bottom: 20rpx;
		width: 98%;
		margin: auto;
		margin-top: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
		h3{
			padding-bottom: 20rpx;
			border-bottom: 1px solid #ccc;
		}
	}
	.childmsg{
		.swiper{
			height: 470rpx;
			.swiper-item{
				// height: 370rpx;				
				h3{
					>text{
						float: left;
						font-size: 14px;
					}
					.xb,.nj{
						color: #fff;
						font-size: 12px;
						float: right;
						position: relative;
						image{
							width: 100%;
						}
						text{
							position: absolute;
							width: 100%;
							text-align: center;
							line-height: 30rpx;
						}
					}
					.xb{
						width: 80rpx;
						margin-right: 20rpx;
					}
					.nj{
						width: 100rpx;
					}
				}
				>view{
					font-size: 14px;
					margin: 10rpx 0;
					text{
						float: left;
						margin-right: 20rpx;
					}
					i{
						float: right;
						padding:5rpx 20rpx;
						border-radius: 20rpx;
						background: #ccc;
					}
					.xl{
						width: 520rpx;
						float: left;
						.cl{
							margin: 10rpx 0;
						}
						text{
							margin: 0;	
							width: 232rpx;
						}
						image{
							width:30rpx;
							margin: 0 10rpx;
							float: left;
							margin-top: 10rpx;
						}
						// .cl text:last-child{
						// 	float:right;
						// }
					}
				}
			}
		}
	}
	.jzmsg{
		.msgs{
			margin-top: 10rpx;
			text:first-child{
				margin-right: 10rpx;
			}
			.switchbox{
				float: right;
				width: 100rpx;
				position: relative;
				.status{
					position: absolute;
					// width: 100%;
					z-index: 100;
					top: 10rpx;
					padding: 0 10rpx;
					box-sizing: border-box;
				}
			}
		}
	}
	.footerbox{
		background: #fff;
		padding: 40rpx 0;
		image{
			width: 210rpx;
			margin-left: 30rpx;
		}
	}

</style>
