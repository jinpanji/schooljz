<template>
	<view class="editchild">
		<view class="information">			
			<view class="cl">
				<text>姓名</text>
				<input type="text" value="" v-model="form.name" placeholder="请输入姓名"/>
				<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
			</view>
			<view class="uni-list cl">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						关系
					</view>
					<view class="uni-list-cell-db">
						<picker mode="selector" :value="gxcheck" :range="gxlist" @change="gxchange">
							<view class="uni-input">{{gxlist[gxcheck]}}</view>
						</picker>
					</view>
					<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
				</view>
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
					<input type="number" v-model="form.clazz" value="" placeholder="请输入班级" />
					<image src="../../static/img/img/wd_018.png" mode="widthFix"></image>
				</view>
			</view>
			
		</view>		
		<!-- 选择路线 -->
		<view class="selection_route">
			<view class="tit">选择路线</view>
			<!-- 下拉选择线路 -->
			<view class="lines_list">
				<xfl-select 
							:list="lineStrlist"
							:clearable="false"
							:showItemNum="5" 
							:listShow="false"
							:isCanInput="true"  
							:style_Container="'height: 50px; font-size: 16px;'"
							:placeholder = "'请选择'"
							:initValue="selectValue"
							:selectHideType="'hideAll'"
							@change="selectChange"
						>
				</xfl-select>
			</view>
			<!-- 有线路 -->
			<view class="" v-if="!isNull">
				<!--  v-for="(item,index) in list" -->
				<Buslist  @changeLine="changeLine" :list="list"/>
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
	import xflSelect from '../common/xfl-select/xfl-select.vue';
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
			Buslist,xflSelect
		},
		data(){
			return{
				list:[],//站点列表
				xblist:['女','男'],
				xbcheck:0,
				gxlist:["父亲","母亲","爷爷","奶奶","叔叔","阿姨"],
				gxcheck:0,
				classlist:["一年级","二年级","三年级","四年级","五年级","六年级"],
				classCheck:0,
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
					relation:"父亲"
				},
				selectValue:"",//下拉框值
				lineInfo:{
					linesId:0,
					sitesId:0,
				},
				lineStrlist:[],//线路名称列表
				linesList:[],//线路列表
			}
		},
		onLoad(){
			let data=uni.getStorageSync("addchildinfo")
			data=JSON.parse(data)
			this.form=data
			this.form.name=""
			this.form.sex=0
			this.form.grade=1
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
			gxchange(val){
				// 关系改变
				console.log(val)
				this.form.relation=this.gxlist[val.detail.value]
				this.gxcheck=val.detail.value
				console.log(this.form.relation)
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
				// 下一步，反馈或添加后跳转到付钱
				console.log(this.form)
				if(this.isNull){
					//反馈
						if(this.form.schoolId){
							// 学校已录入但是没有线路  ：添加学生获取学生id，再反馈
							this.add(1)
						}else{
							// 直接反馈
							this.feedBack()
						}
					
				}else{
					// 添加学生，记录线路信息：跳转至付款
					if(this.lineInfo.id&&this.lineInfo.siteId){						
						this.add(2)
					}else{
						if(this.lineInfo.linesId){
							uni.showToast({
								icon:"none",
								title:"请选择站点"
							})
						}else{
							uni.showToast({
								icon:"none",
								title:"请选择线路及站点"
							})
						}
					}
				}
			},
			selectChange(val){
				// 选择线路，线路改变
				console.log("选择线路")
				console.log(val)
				this.lineInfo=this.linesList[val.index]
				console.log(this.lineInfo)
				this.list=this.linesList[val.index].sites
				console.log(this.list)
			},
			changeLine(val){
				// 选择站点
				console.log('父组件获取')
				console.log(val)
				this.lineInfo.siteId=val
				let list=this.list
				list.forEach((item,index)=>{
					if(item.id==val){
						this.lineInfo.siteName=item.name
					}
				})
			},
			feedBack(){
				// 反馈
				if(!this.form.childrenId){
					this.form.childrenId=""
				}
				this.$http.post("puFeedback/add",this.form).then(res=>{
					if(res.code==100){
						uni.navigateTo({
							url:"declaration"
						})
					}
				})
			},
			add(type){
				// 添加
				if(!this.form.name&&!this.form.crazz&&!this.form.birthDate){
					uni.showToast({
						icon:"none",
						title:"请填写完整的信息！"
					})
				}else {
					// if(!this.lineForm&&!this.isNull){
					// 	uni.showToast({
					// 		icon:"none",
					// 		title:"请选择线路、站点"
					// 	})					
					// }else
					this.$http.post("puchildren/add",this.form).then(res=>{
						if(res.code==100){
							// 存学生id
							this.form.childrenId=res.info
							uni.showToast({
								icon:"success",
								title:"添加成功！"
							})
							if(type==1){
								// 反馈
								this.feedBack()
								uni.navigateTo({
									url:"declaration"
								})
							}else{
								this.lineInfo.childrenId=res.info
								let data=JSON.stringify(this.lineInfo)
								uni.setStorageSync("userlinesInfo",data)
								uni.navigateTo({
									url:"payment"
								})
							}
						}
					})
				}
				
			},
			getlinesList(){
				// 获取线路
				this.$http.post("puProduct/getProductBySchoolId",{
					schoolId:this.form.schoolId
					// schoolId:1
				}).then(res=>{
					if(res.code==100){
						if(res.info.length==0){
							this.isNull=true
						}else{
							console.log("列表列表")
							this.isNull=false
							this.list=[]
							let list=res.info
							this.linesList=res.info
							console.log(list)
							if(list.length>0){
								console.log('坎坎坷坷扩')
								this.lineStrlist=[]
								list.forEach((item,index)=>{
									this.lineStrlist.push(item.name)
								})
								console.log(this.lineStrlist)
							}
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
