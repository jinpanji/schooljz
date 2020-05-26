<template>
	<view class="page">		
		<view class="jilu">
			<view class="boxlist">
				<h3><text>请选择投诉范围（单选）</text></h3>
				<view class="list">
					<text :class="type==1?'check_index':''" @click="type=1">{{childInfo.name?childInfo.name+"：":""}}学校、线路</text>
					<text :class="type==2?'check_index':''" @click="type=2">平台</text>
				</view>	
				<view class="linebox" v-if="type==1">
					 <radio-group @change="radioChange">
						<label class="radio" v-for="(item,index) in lineList"><radio color="#FF6C00" :value="item.lineId" />{{item.lineName}}</label>
					</radio-group>
				</view>
			</view>
			
			<view class="msgbox">
				<h3><text>投诉内容</text></h3>
				<textarea value="" v-model="content" placeholder="请您将意见填写在这里" />
				
			</view>
			<button type="primary" @click="submitCompalint()">提交</button>
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
				content:"",
				id:null,
				childInfo:{},
				lineList:[],
				lineId:'',
				parentId:null
			}
		},
		onLoad(e){
			this.id=e.id
			this.getChildMsg()
			this.getLines()
			let userInfo=uni.getStorageSync("userInfo")
			userInfo=JSON.parse(userInfo)
			this.parentId=userInfo.id
		},
		mounted(){
			// this.$refs.calendar.show();
		},
		methods:{
			getResult(val){
				console.log(val)
				// this.result=val;
				// this.$refs.calendar.show();
			},
			getChildMsg(){
				this.$http.post("puchildren/detail",{
					id:this.id
				}).then(res=>{
					if(res.code==100){
						this.childInfo=res.info
					}
				})
			},
			getLines(){
				this.$http.post("puline/getLineByCharendId",{
					childrenId:this.id
				}).then(res=>{
					if(res.code==100){
						this.lineList=res.info
					}
				})
			},
			radioChange(val){
				console.log(val)
				this.lineId=val.detail.value
			},
			submitCompalint(){
				// 投诉
				if(!this.type){
					uni.showToast({
						icon:"none",
						title:"请选择投诉的类型"
					})
				}else if(!this.content){
					uni.showToast({
						icon:"none",
						title:"请填写投诉的内容"
					})
				}else if(this.type==1&&!this.lineId){
					uni.showToast({
						icon:"none",
						title:"请选择线路"
					})
				}else{
					this.$http.post("pucomplaint/add",{
						childrenId:this.id,
						type:this.type,
						content:this.content,
						parentId:this.parentId,
						lineId:this.lineId
					}).then(res=>{
						if(res.code==100){
							uni.showToast({
								icon:"success",
								title:"提交成功！"
							})
							setTimeout(()=>{
								uni.navigateBack({
									
								})
							},2000)
						}
					})
				}
			},
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
		.linebox{
			padding-bottom: 20rpx;
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
				width: 100%;
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
