(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/information/editchild"],{"1ae8":function(t,e,i){"use strict";i.r(e);var n=i("b8e0"),o=i("4b56");for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("92b6");var c,l=i("f0c5"),a=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"14ba20f0",null,!1,n["a"],c);e["default"]=a.exports},"4b56":function(t,e,i){"use strict";i.r(e);var n=i("5326"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},5326:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/common/buslist").then(function(){return resolve(i("acee"))}.bind(null,i)).catch(i.oe)},o=function(){i.e("components/common/xfl-select/xfl-select").then(function(){return resolve(i("ac88"))}.bind(null,i)).catch(i.oe)};function s(t){var e=new Date,i=e.getFullYear(),n=e.getMonth()+1,o=e.getDate();return"start"===t?i-=60:"end"===t&&(i+=2),n=n>9?n:"0"+n,o=o>9?o:"0"+o,"".concat(i,"-").concat(n,"-").concat(o)}var c={components:{Buslist:n,xflSelect:o},data:function(){return{list:["光谷大道五里湾","光谷大道金融港","光谷大三李陈","光谷大道关南村","光谷大道当代国际花园","光谷大道现代世贸中心"],xblist:["女","男"],xbcheck:1,classlist:["一年级","二年级","三年级","四年级","五年级","六年级"],classCheck:0,gxlist:["父亲","母亲","爷爷","奶奶","叔叔","阿姨"],gxcheck:0,gxcheck2:0,date:"2020-4-28",startDate:s("start"),endDate:s("end"),isInfo:!1,childId:null,form:{},linesList:[],lineStrlist:[],lineInfo:{linesId:0,sitesId:0},productList:{},productLine:[],checkProductId:null,PaylineInfo:{},checkSite:null,selectValue:"",userInfo:{},nowSite:null,parentList:["分配给子账号家长"],parentData:[],parentCheck:0,tsShow:!1}},onLoad:function(e){console.log("type");var i=t.getStorageSync("userInfo");this.userInfo=JSON.parse(i),console.log(e.type),e.id&&(this.childId=e.id),this.getChildInfo(),2==e.type?(this.isInfo=!0,t.setNavigationBarTitle({title:"详情"})):(this.getPlist(),this.getchildLines(),this.getProduct())},methods:{ParentChange:function(t){console.log(t),0!=t.detail.value&&(this.parentCheck=t.detail.value,this.tsShow=!0)},cancelChange:function(){this.tsShow=!1,this.parentCheck=0},fpParent:function(){var e=this.parentData[this.parentCheck-1].id,i=this.gxlist[this.gxcheck2];console.log(e),console.log(this.childId),this.$http.post("puchildren/divide",{parentId:e,childrenId:this.childId,relation:i}).then((function(e){100==e.code?(t.showToast({icon:"success",title:"设置成功！"}),setTimeout((function(){t.switchTab({url:"../../pages/my/index"})}),2e3)):250==e.code&&t.showToast({icon:"icon",title:e.msg})}))},getPlist:function(){var t=this;this.$http.post("puparent/getSubList",{parentId:this.userInfo.id}).then((function(e){if(100==e.code){t.parentData=e.info;var i=[];i=e.info,t.parentList=["分配给子账号家长"],i.forEach((function(e,i){t.parentList.push(e.name)}))}}))},getChildInfo:function(){var e=this;this.$http.post("puchildren/detail",{childrenId:this.childId,parentId:this.userInfo.id}).then((function(i){if(100==i.code){if(e.form=i.info,e.date=e.form.birthDate,e.xbcheck=e.form.sex,e.form.relation){var n=e.gxlist.indexOf(e.form.relation);e.gxcheck=n}if(e.classCheck=1*e.form.grade-1,e.form.closeDate||e.getLines(),e.isInfo){var o=t.getStorageSync("addchildinfo");o=JSON.parse(o),e.form.schoolName=o.schoolName,e.form.schoolId=o.schoolId,e.getLines()}}}))},getchildLines:function(){var t=this;this.$http.post("puline/getLineByCharendId",{childrenId:this.childId}).then((function(e){var i=e.info;if(i.length>0){t.lineStrlist=[],t.linesList=[],t.selectValue=i[0].lineName,i.forEach((function(e,i){t.lineStrlist.push(e.lineName),t.linesList.push(e)}));var n={index:0};setTimeout((function(){t.selectChange(n)}),1e3)}}))},getProduct:function(){var t=this;this.$http.post("puProduct/getProductByChildrenId",{childrenId:this.childId}).then((function(e){100==e.code&&(t.productList=e.info)}))},bindDateChange:function(t){this.date=t.detail.value,this.form.birthDate=t.detail.value,console.log(this.form.birthDate)},bindTimeChange:function(t){this.time=t.detail.value},xbchange:function(t){console.log(t),this.xbcheck=t.detail.value,this.form.sex=t.detail.value},gxchange:function(t){console.log(t),this.form.relation=this.gxlist[t.detail.value],this.gxcheck=t.detail.value,console.log(this.form.relation)},gxchange2:function(t){console.log(t),this.gxcheck2=t.detail.value},classchange:function(t){this.form.grade=1*t.detail.value+1,this.classCheck=t.detail.value},selectChange:function(t){var e=this;console.log("选择线路"),console.log(t),this.form.closeDate?(console.log("购买的线路站点"),console.log(this.linesList),this.isInfo?(this.list=this.productLine[t.index].sites,this.checkProductId=this.productLine[t.index].id,this.PaylineInfo=this.productLine[t.index]):(this.lineInfo.linesId=this.linesList[t.index].lineId,this.$http.post("puline/lineDetail",{childrenId:this.childId,lineId:this.lineInfo.linesId}).then((function(t){100==t.code&&(e.list=t.info.sites,e.nowSite=t.info.buySite.siteId)})))):(console.log(this.productLine),this.list=this.productLine[t.index].sites,this.checkProductId=this.productLine[t.index].id,this.PaylineInfo=this.productLine[t.index])},preservation:function(){console.log(this.form),this.$http.post("puchildren/update",this.form).then((function(e){100==e.code&&t.showToast({icon:"success",title:"修改成功"})}))},getLines:function(){var t=this;this.$http.post("puProduct/getProductBySchoolId",{schoolId:this.form.schoolId}).then((function(e){if(100==e.code){t.lineStrlist=[];var i=[];i=e.info,t.productLine=i,i.forEach((function(e,i){t.lineStrlist.push(e.name)}))}}))},changeLine:function(t){var e=this,i=this.list;i.forEach((function(i,n){i.id==t&&(e.PaylineInfo.siteId=i.id,e.PaylineInfo.siteName=i.name)}))},payLines:function(){if(this.PaylineInfo.siteName){console.log("是是是是是是 "),this.isInfo&&this.preservation(),this.PaylineInfo.childrenId=this.childId;var e=JSON.stringify(this.PaylineInfo);t.setStorageSync("userlinesInfo",e),console.log(e),t.navigateTo({url:"payment"})}else t.showToast({icon:"none",title:"请选择线路及站点"})}}};e.default=c}).call(this,i("543d")["default"])},"92b6":function(t,e,i){"use strict";var n=i("bee2"),o=i.n(n);o.a},b8e0:function(t,e,i){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}))},bee2:function(t,e,i){},ea4a:function(t,e,i){"use strict";(function(t){i("83be");n(i("66fd"));var e=n(i("1ae8"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["ea4a","common/runtime","common/vendor"]]]);