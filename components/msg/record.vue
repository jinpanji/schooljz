<template>
	<view class="page">
		<view class="tit">
			<text>学生</text>
		</view>
		<view>
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
		</view>
		<view class="tit">
			<text>时间</text>
		</view>
		<view class="">
			<wCalendar
				ref="calendar"
				:lunar="true" 
				:disabledBefore="false" 
				:disabledAfter="true" 
				@confirm="getResult">
			</wCalendar>
		</view>
		<button type="default" @click="goLook()">确定</button>
	</view>
</template>

<script>
	import wCalendar from "../common/w-calendar/w-calendar.vue";
	import xflSelect from '../common/xfl-select/xfl-select.vue';
	export default{
		components:{
			// Rili,
			wCalendar,
			xflSelect,
		},
		data(){
			return{
				childStrlist:[],
				childList:[],
				selectValue:'',
				userInfo:{},
				childrenId:null,
				date:null
			}
		},
		onLoad(){
			let date=new Date()
			let dateStr=""
			dateStr=date.getFullYear()+"-"
			dateStr+=(date.getMonth()+1)+"-"
			dateStr+=date.getDate()-1
			this.date=dateStr
			let info=uni.getStorageSync('userInfo')
			this.userInfo=JSON.parse(info)
			this.getList()
		},
		methods:{
			getResult(res){
				console.log(res)
				this.date=res.fullDate
			},
			selectChange(e){
				console.log(e)
				this.childrenId=this.childList[e.index].id
			},
			getList(){
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
							list.forEach((item,index)=>{
								this.childList.push(item)
								this.childStrlist.push(item.name)
							})
						}
						
					}
				})
			},
			goLook(){
				if(!this.childrenId){
					uni.showToast({
						icon:"none",
						title:"请选择学生！"
					})
				}else if(!this.date){
					uni.showToast({
						icon:"none",
						title:"请选择时间！"
					})
				}else{
					// console.log(this.childrenId)
					// console.log(this.date)
					uni.navigateTo({
						url:"../info/trip?childrenId="+this.childrenId+"&date="+this.date
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tit{
		padding: 0 10rpx;
		background: #fff;
		margin-top: 10rpx;
	}
	.page{
		padding-bottom: 60rpx;
	}
	button{
		background-color: #FF6C00;
		color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
