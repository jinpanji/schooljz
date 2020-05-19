<template>
	<view class="addpage">
		<view class="li cl">
			<text>学校名称</text>
			<input type="text" value="" v-model="form.schoolName" placeholder="请输入学校名称" />
			<image src="../../static/img/wd_018.png" mode="widthFix"></image>
		</view>
		<view class="li cl" @click="gomap()">
			<text>学校定位</text>
			<text>{{address}}</text>
			<image src="../../static/img/wd_018.png" mode="widthFix"></image>
			<image src="../../static/img/sy_015.png" class="dticon" mode="widthFix"></image>
		</view>
		<button type="primary" @click="goRouter()">下一步</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					longitude:null,
					latitude:null,
					schoolName:"",
					schoolId:""
				},
				address:''
				
			}
		},
		methods:{
			gomap(){
				//地图定位
				uni.chooseLocation({
					success:(res)=>{
						console.log(res)
						this.form.longitude=res.longitude
						this.form.latitude=res.latitude
						this.address=res.address
					}
				})
			},
			goRouter(){
				if(this.form.schoolName&&this.form.longitude){
					let data=this.form
					data=JSON.stringify(data)
					uni.setStorageSync("addchildinfo",data)
					uni.navigateTo({
						url:"addchildmsg"
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"请填写学校名称及学校定位信息！"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addpage{
		background: #fff;
		padding: 0 30rpx;
		.li{
			padding: 30rpx 0;
			text{
				float:left;
				width: 190rpx;
				color: #ccc;
			}
			text:nth-child(2){
				width: 380rpx;
			}
			input{
				float: left;
				width: 475rpx;
				border: 0;
				
			}
			image{
				width: 30rpx;
				float: right;
			}
			.dticon{
				width: 50rpx;
				margin-right: 30rpx;
			}
		}
		button{
			width: 100%;
			background: #FF6C00;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>
