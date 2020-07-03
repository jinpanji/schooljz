<template>
	<view class="renewpage">
		<view class="uni-list">
			<!-- 学生下拉 -->
			<xfl-select
				:list="childStrlist"
				:clearable="false"
				:showItemNum="5" 
				:listShow="false"
				:isCanInput="true"  
				:style_Container="'height: 50px; font-size: 16px;'"
				:placeholder = "'请选择学生'"
				:initValue="selectValue"
				:selectHideType="'hideAll'"
				@change="selectChange"
			>
			</xfl-select>
			<!-- 续费项目 -->
			<view class="xflist">
				<view class="listbox cl" v-for="(item,index) in smList" :key="item.value"  @click="changeList(index)">
					<view class="imgbox">
						<image v-if="checkList!=index" src="../../static/img/img/wd_019.png" mode="widthFix"></image>
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
								<text>{{selectValue}}</text>
								<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
							</view>
							<Select :list="item.xlList" :checknum="checknum" :indexNum="index" @changNum="changNum"></Select>
							<view class="time">
								到期时间:{{item.closeDate}}
							</view>
							<view class="money">
								￥{{item.price}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="moretxt">
				<text @click="goMore()">更多>></text>
			</view>
		</view>
		<view class="footer">
			<view class="right">
				<button type="primary" @click="goPay()">结算</button>
				<view class="msg">
					合计:
					<text>￥{{money}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Select from "../common/select.vue"
	import xflSelect from '../common/xfl-select/xfl-select.vue';
	export default{
		components:{Select,xflSelect},
		data(){
			return{
				school:0,
				current:false,//全选
				checknum:0,
				checkList:null,//续费项目选择
				childList:[],
				childStrlist:[],
				selectValue:'',
				childrenId:null,
				form:{},
				money:"",
				smList:[{
					bj:require('../../static/img/img/wd_016.png'),
					type:1,
					text:"早接",
					xlList:['默认之前选择的线路'],
					closeDate:'',
					price:''
				},{
					bj:require('../../static/img/img/wd_015.png'),
					type:2,
					text:"晚送",
					xlList:['默认之前选择的线路'],
					closeDate:'',
					price:''
				},{
					bj:require('../../static/img/img/wd_014.png'),
					type:3,
					text:"全包",
					xlList:['默认之前选择的线路'],
					closeDate:'',
					price:''
				}],
				linesInfo:{},
				orderInfo:{
					type:'',
					siteId:'',
					siteName:'',
					childrenId:'',
					productId:'',
					name:''
				}
			}
		},
		onLoad(){
			let info=uni.getStorageSync('userInfo')
			this.userInfo=JSON.parse(info)
			this.getList()
		},
		methods:{
			changeList(val){
				this.checkList=val
				this.orderInfo.type=this.smList[val].type
				this.money=this.smList[val].price
			},
			selectChange(e){
				console.log(e)
				this.childrenId=this.childList[e.index].id
				this.orderInfo.childrenId=this.childrenId
				this.selectValue=e.newVal
				this.getLines()
			},
			changNum(val){
				console.log('changenum')
				console.log(val)
			},
			Settlement(){
				// 结算
				// uni.navigateTo({
				// 	url:"../information/editchild?type=2"
				// })
				console.log(this.orderInfo)
			},
			getList(){//获取学生
				this.$http.post('puchildren/listByParentId',{
					parentId:this.userInfo.id
				}).then(res=>{
					if(res.code==100){
						let list=res.info
						this.childList=[]
						this.childStrlist=[]
						if(list.length>0){
							this.selectValue=list[0].name
							this.childrenId=list[0].id
							this.orderInfo.childrenId=list[0].id
							this.getLines()
							list.forEach((item,index)=>{
								this.childList.push(item)
								this.childStrlist.push(item.name)
							})
						}						
					}
				})
			},
			getLines(){
				// 获取购买的线路和站点信息
				// 获取孩子的线轮
				this.$http.post("puProduct/listProductByChildrenId",{
					childrenId:this.childrenId
				}).then(res=>{
					if(res.code==100){
						let list=res.info.productVos
						this.linesInfo=res.info
						this.orderInfo.productId=res.info.productId
						this.orderInfo.siteId=res.info.siteIId
						this.orderInfo.siteName=res.info.siteName
						this.orderInfo.name=list[0].productName
						list.forEach((item,index)=>{
							if(item.type==1){
								this.smList[0].closeDate=item.closeDate
								this.smList[0].price=item.price
							}
							if(item.type==2){
								this.smList[1].closeDate=item.closeDate
								this.smList[1].price=item.price
							}
							if(item.type==3){
								this.smList[2].closeDate=item.closeDate
								this.smList[2].price=item.price
							}
						})
					}
				})
			},
			goPay(){
				//支付功能
				//取消支付跳转到待支付界面
				// this.isShow=true
				let data=this.orderInfo
				data.parentId=this.userInfo.id  //家长id
				data.openId=this.userInfo.wechatOpenid //openid
				this.payInfo=data
				console.log(this.payInfo)
				uni.showLoading({
					icon:"loading",
					title:"正在提交订单"
				})
				this.$http.post("puProduct/createBuyOrder",data,"application/json").then(res=>{
					if(res.code==100){
						// this.payInfo=res.info
						this.payres=res.info
						this.wxPay(res.info)
						uni.hideLoading()
					}
				})
			},
			wxPay(data){
				let that=this
				uni.requestPayment({
				    provider: 'wxpay',
				    timeStamp: data.timeStamp,//时间戳
				    nonceStr: data.nonceStr,//随机字符串
				    package: data.packageValue,//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx
				    signType: 'MD5',//签名算法
				    paySign: data.paySign,//签名
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
						// 支付成功
						uni.showToast({
							icon:"success",
							title:"支付成功"
						})
						setTimeout(()=>{
							uni.switchTab({
								url:"../../pages/my/index"
							})
						},2000)
				    },
				    fail: function (err) {
						console.log('支付失败')
				        console.log('fail:' + JSON.stringify(err));
						uni.showToast({
							icon:"none",
							title:"支付失败"
						})
						that.isShow=true
				    }
				});
			},
			goMore(){
				// 点击更多，转学时使用
				console.log("更多")
				uni.navigateTo({
					url:"../information/addchildschool?type=2"
				})
			}
		},
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
	.moretxt{
		color: #C0C0C0;
		text-align: right;
		font-size: 14px;
		line-height: 60rpx;
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
		line-height:90rpx;
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
