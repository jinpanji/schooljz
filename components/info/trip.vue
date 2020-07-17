<template>
	<view class="page">
		<h3><text>{{date}}</text></h3>
		<Trip :schoolInfo="schoolInfo" :homeInfo="homeInfo" @goReport="goReport"></Trip>
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
				schoolInfo:{},
				homeInfo:{},
				date:"",
				childrenId:null
			}
		},
		onLoad(e){
			if(e.childrenId){
				console.log("安全报告")
				console.log(e)
				this.date=e.date
				this.childrenId=e.childrenId
				this.gettripList()
			}else{
				let id=uni.getStorageSync("childId")
				this.id=id?id:""
				this.getTrip()
				let date=new Date()
				let dateStr=""
				dateStr=date.getFullYear()+"年"
				dateStr+=(date.getMonth()+1)+"月"
				dateStr+=date.getDate()-1+"日"
				this.date=dateStr
			}			
		},
		methods:{
			getTrip(){
			//孩子id
				this.$http.post("puridingrecord/yestList",{
					// childrenId:1
					childrenId:this.id
				}).then(res=>{
					if(res.code==100){
						// this.info=res.info
						let list=res.info
						list.forEach((item,index)=>{
							if(item.type==1){
								if(!this.schoolInfo.takeTime){
									this.schoolInfo=item
								}
							}else{
								this.homeInfo=item
							}
						})
					}
				})
			},
			goReport(id){
				console.log('查看行车报告')
				console.log(id)
				uni.navigateTo({
					url:"../msg/security?id="+id
				})
			},
			gettripList(){
				// 按日期和孩子查询行程记录
				this.$http.post("puridingrecord/list",{
					childrenId:this.childrenId,
					date:this.date
				}).then(res=>{
					if(res.code==100){
						// this.info=res.info
						let list=res.info
						list.forEach((item,index)=>{
							if(item.type==1){
								if(!this.schoolInfo.takeTime){
									this.schoolInfo=item								
								}
							}else{
								this.homeInfo=item
							}
						})
					}
				})
			}
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
				padding-left: 20rpx;
				border-left: 2px solid #FF6C00;
			}
		}
	}
</style>
