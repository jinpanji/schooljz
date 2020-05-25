<template>
	<view class="page">
		<h3><text>2020年4月26日</text></h3>
		<Trip :info="info"></Trip>
		<button type="primary">确认</button>
	</view>
</template>

<script>
	import Trip from '../../components/common/trip.vue'
	export default{
		components:{
			Trip,
		},
		data(){
			return{
				info:{},
				id:null,
			}
		},
		onShow(){
			let id=uni.getStorageSync("childId")
			this.id=id?id:""
			this.getTrip()
		},
		methods:{
			getTrip(){
			//孩子id
				this.$http.post("puridingrecord/yestList",{
					childrenId:1
					// childrenId:this.id
				}).then(res=>{
					if(res.code==100){
						this.info=res.info
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	button{
		background: #FF6C00;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
	}
	.page{
		padding: 30rpx;
		background: #fff;
		h3{
			padding:30rpx 0;
			border-bottom: 1px solid #ccc;
			text{
				padding: 20rpx;
				border-left: 2px solid #FF6C00;
			}
		}
	}
</style>
