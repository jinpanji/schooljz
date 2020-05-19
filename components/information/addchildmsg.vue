<template>
	<view class="editchild">
		<view class="information">			
			<view class="cl">
				<text>姓名</text>
				<input type="text" value="" v-model="form.name" placeholder="请输入姓名"/>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<!-- <view class="cl">
				<text>性别</text>
				<view class="">男</view>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view> -->
			<view class="uni-list cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						性别
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :value="xbcheck" :range="xblist" @change="xbchange">
							<view class="uni-input">{{xblist[xbcheck]}}</view>
						</picker>
					</view>
					<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-list cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						出生年月
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list classcheck cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						班级
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :range="classlist" :value="classCheck" @change="classchange">
							<view class="uni-input">{{classlist[classCheck]}}</view>
						</picker>
					</view>
					<input type="number" value="" placeholder="请输入班级" />
					<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
				</view>
			</view>
			
		</view>		
		<!-- 选择路线 -->
		<view class="selection_route">
			<view class="tit">选择路线</view>
			<!-- 有线路 -->
			<view class="" v-if="!isNull">
				<Buslist  v-for="(item,index) in list" :list="item.sites"/>
			</view>
			<!-- 无线路 -->
			<view class="xlnull" v-else>
				<image src="../../static/img/right.png" mode="widthFix"></image>
				<text>无可用线路</text>
			</view>
		</view>
		<button type="primary" class="preservation" @click="goRouter()">下一步</button>
		
	</view>
</template>

<script>
	import Buslist from '../../components/common/buslist.vue'
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {	
		components:{
			Buslist
		},
		data(){
			return{
				list:['光谷大道五里湾','光谷大道金融港','光谷大三李陈','光谷大道关南村','光谷大道当代国际花园','光谷大道现代世贸中心'],
				xblist:['女','男'],
				xbcheck:0,
				classlist:["一年级","二年级","三年级","四年级","五年级","六年级"],
				classCheck:5,
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				time: '12:01',
				isNull:false,//是否有线路  true:无，false：有
				form:{
					name:'',
					sex:0,
					grade:1,
				}
			}
		},
		onLoad(){
			let data=uni.getStorageSync("addchildinfo")
			data=JSON.parse(data)
			this.form=data
			if(data.schoolId){
				this.getlinesList()
			}else{
				this.isNull=true
			}
			let userInfo=uni.getStorageSync("userInfo")
			if(userInfo){
				userInfo=JSON.parse(userInfo)
				this.form.parentId=userInfo.id
			}else{
				uni.showToast({
					icon:"none",
					title:"请登录后操作"
				})
			}
			
		},
		methods:{
			xbchange(val){
				console.log(val)
				// 性别改变
				this.form.sex=val.detail.value
			},
			classchange(val){
				// 年级改变
				this.form.grade=(val.detail.value*1)+1
				this.classCheck=val.detail.value
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
				this.form.birthDate=e.detail.value
				console.log(this.form.birthDate)
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			goRouter(){
				if(this.isNull){
					//无线路  申报成功
					uni.navigateTo({
						url:"declaration"
					})
				}else{
					// 有线路  支付
					uni.navigateTo({
						url:"payment"
					})
				}
			},
			getlinesList(){
				// 获取线路
				this.$http.post("puProduct/getProductBySchoolId",{
					schoolId:this.form.schoolId
				}).then(res=>{
					if(res.code==100){
						if(res.code.length==0){
							this.isNull=true
						}else{
							this.isNull=false
							this.list=res.info
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tit{
		padding: 0 20rpx;
	}
	.information{
		padding: 0 30rpx;		
		background: #fff;
		>view{
			padding: 38rpx 0;
			border-bottom: 1px solid #e7e6ec;
			text,.uni-list-cell-left{
				float: left;
				width: 162rpx;		
				color: #969696;
			}
			input,.uni-list-cell-db{
				float: left;
				width: 510rpx;
			}
			.red{
				color: #fe0000;
			}
			image{
				float: right;
				width: 20rpx;
			}
		}
		>view:last-child{
			border: 0;
		}
		.classcheck{
			.uni-list-cell-db{
				float: left;
				width: 100rpx;
			}
			input{
				float: left;
				width: 190rpx;
				margin-left: 20rpx;
			}
		}
	}
	.selection_route,.pick{
		background: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
	}
	.selection_route{
		padding-bottom: 130rpx;
	}
	.preservation{
		width: 100%;
		background: #FF6C00;
		border-radius: 0;
		position: fixed;
		bottom: 0;
		left:0;
		z-index: 1000;
	}
	button:after{
		border: 0;
	}
	.xlnull{
		text-align: center;
		image{
			width: 100%;
		}
		text{
			line-height: 300rpx;
		}
	}
</style>
