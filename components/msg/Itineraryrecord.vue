<template>
	<view class="page">
		<!-- <Rili /> -->
		<view class="cl">
			<wCalendar
				ref="calendar"
				:lunar="true" 
				:disabledBefore="true" 
				:disabledAfter="false" 
				@confirm="getResult">
			</wCalendar>
			<view class="timebox">
				开始时间：{{startTime}}
			</view>
			<view class="timebox">
			结束时间：{{endTime}}
			</view>
		</view>
		 
		<view class="jilu">
			<view class="boxlist">
				<h3><text>请选择请假车次</text></h3>
				<view class="list">
					<text :class="type==1?'check_index':''" @click="changeType(1)">早接</text>
					<text :class="type==2?'check_index':''" @click="changeType(2)">晚送</text>
					<text :class="type==3?'check_index':''" @click="changeType(3)">整天请假</text>
				</view>	
			</view>
			<view class="msgbox">
				<h3><text>请填写请假备注</text></h3>
				<textarea value="" v-model="remarks" placeholder="例:生病了" />
				<view class="tis">
					提示：当前请假共{{msgStr.day}}天，请假{{msgStr.count}}车次。
				</view>
			</view>
			<button type="primary" @click="submitInfo()">提交</button>
		</view>
		
	</view>
</template>

<script>
	// import Rili from "../common/dark-calendar/dark-calendar.vue"
	import wCalendar from "../common/w-calendar/w-calendar.vue";
	export default{
		components:{
			// Rili,
			wCalendar
		},
		data(){
			return{
				result:{},
				startTime:"",
				endTime:'',
				type:1,//1早，2晚，3全天
				msgStr:{
					day:1,
					count:1
				},
				id:null,
				remarks:"",//备注
			}
		},
		watch:{
			
		},
		mounted(){
			this.$refs.calendar.show();
			let id=uni.getStorageSync("childId")
			this.id=id
			// 当前时间
			let time=new Date()
			let timeStr=""
			timeStr=time.getFullYear()+"-"
			let month=time.getMonth()+1
			if(month<10){
				timeStr+="0"+month+"-"
			}else{
				timeStr+=month+"-"
			}
			let day=time.getDate()
			if(day<10){
				timeStr+="0"+day
			}else{
				timeStr+=day
			}
			this.startTime=timeStr
		},
		methods:{
			getResult(val){
				console.log(val)
				let that=this				
				uni.showModal({
				    title: '提示',
				    content: '请选择时间类型',
					confirmText:"开始时间",
					cancelText:"结束时间",
				    success: function (res) {
				        if (res.confirm) {
				            // console.log('用户点击确定');
							that.startTime=val.fullDate
				        } else if (res.cancel) {							
							if(val.fullDate<that.startTime){
								uni.showToast({
									icon:"none",
									title:"结束日期不能小于开始日期"
								})
							}else{
								that.endTime=val.fullDate
								that.msgStr.day=(that.startTime-that.endTime)*1+1
							}
							that.getDays()
				        }
				    }
				})
			},
			submitInfo(){
				if(this.remarks){
					this.$http.post("puLeaveApply/add",{
						childrenId:this.id,
						startTime:this.startTime,
						endTime:this.endTime,
						type:this.type,
						remarks:this.remarks
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
				}else{
					uni.showToast({
						icon:"none",
						title:"请填写备注！"
					})
				}
			},
			getDays(){
				// 得到天数
				let starTime=new Date(this.startTime)
				let endTime=new Date(this.endTime)
				let days=endTime-starTime
				days=days/1000/60/60/24
				console.log(days)
				if(!this.endTime){
					days=0
				}
				this.msgStr.day=days+1
				if(this.type==3){
					this.msgStr.count=(days+1)*2
				}else{
					this.msgStr.count=days+1
				}
			},
			changeType(type){
				this.type=type
				this.getDays()
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
			margin: 20rpx 0;
			.list{
				text{
					display: inline-block;
					width: 215rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 50rpx;
					border: 1px solid #FF6C00;
					color: #FF6C00;
					margin: 15rpx;
					font-size: 14px;
				}
				text:first-child{
					margin-left: 0;
				}
				text:last-child{
					margin-right: 0;
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
			h3{
				border: 0;
			}
			textarea{
				background: #eee;
				width: 100%;
				border-radius: 20rpx;
				border: 1px solid #ccc;
				height: 350rpx;
				padding:30rpx;
				box-sizing: border-box;
				margin-top: 30rpx;
			}
			.tis{
				color: red;
				line-height: 100rpx;
				font-size: 14px;
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
	.timebox{
		padding: 10rpx;
		background: #fff;
	}

</style>
