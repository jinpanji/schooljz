(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/information/addchildmsg"],{"0707":function(t,e,n){},"28cb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){n.e("components/common/buslist").then(function(){return resolve(n("acee"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/common/xfl-select/xfl-select").then(function(){return resolve(n("ac88"))}.bind(null,n)).catch(n.oe)};function s(t){var e=new Date,n=e.getFullYear(),o=e.getMonth()+1,i=e.getDate();return"start"===t?n-=60:"end"===t&&(n+=2),o=o>9?o:"0"+o,i=i>9?i:"0"+i,"".concat(n,"-").concat(o,"-").concat(i)}var l={components:{Buslist:o,xflSelect:i},data:function(){return{list:[],xblist:["女","男"],xbcheck:0,gxlist:["父亲","母亲","爷爷","奶奶","叔叔","阿姨"],gxcheck:0,classlist:["一年级","二年级","三年级","四年级","五年级","六年级"],classCheck:0,date:s({format:!0}),startDate:s("start"),endDate:s("end"),time:"12:01",isNull:!1,form:{name:"",sex:0,grade:1,relation:"父亲",birthDate:""},selectValue:"",lineInfo:{linesId:0,sitesId:0},lineStrlist:[],linesList:[]}},onLoad:function(){var e=t.getStorageSync("addchildinfo");e=JSON.parse(e),this.form=e,this.form.name="",this.form.sex=0,this.form.grade=1,e.schoolId?this.getlinesList():this.isNull=!0;var n=t.getStorageSync("userInfo");n?(n=JSON.parse(n),this.form.parentId=n.id):t.showToast({icon:"none",title:"请登录后操作"})},methods:{xbchange:function(t){console.log(t),this.form.sex=t.detail.value},gxchange:function(t){console.log(t),this.form.relation=this.gxlist[t.detail.value],this.gxcheck=t.detail.value,console.log(this.form.relation)},classchange:function(t){this.form.grade=1*t.detail.value+1,this.classCheck=t.detail.value},bindDateChange:function(t){this.date=t.detail.value,this.form.birthDate=t.detail.value,console.log(this.form.birthDate)},bindTimeChange:function(t){this.time=t.detail.value},goRouter:function(){console.log(this.form),this.isNull?this.form.schoolId?this.add(1):this.feedBack():this.lineInfo.id&&this.lineInfo.siteId?this.add(2):this.lineInfo.linesId?t.showToast({icon:"none",title:"请选择站点"}):t.showToast({icon:"none",title:"请选择线路及站点"})},selectChange:function(t){console.log("选择线路"),console.log(t),this.lineInfo=this.linesList[t.index],console.log(this.lineInfo),this.list=this.linesList[t.index].sites,console.log(this.list)},changeLine:function(t){var e=this;console.log("父组件获取"),console.log(t),this.lineInfo.siteId=t;var n=this.list;n.forEach((function(n,o){n.id==t&&(e.lineInfo.siteName=n.name)}))},feedBack:function(){this.form.childrenId||(this.form.childrenId=""),t.showLoading({icon:"loading",title:"正在提交反馈，请稍后!"}),this.$http.post("puFeedback/add",this.form).then((function(e){100==e.code&&(t.hideLoading(),t.navigateTo({url:"declaration"}))}))},add:function(e){var n=this;console.log(!this.form.birthDate),console.log(this.form.birthDate),this.form.name||this.form.crazz||this.form.birthDate?(console.log("提交"),console.log(this.form),t.showLoading({icon:"loading",title:"正在提交，请稍后!"}),this.$http.post("puchildren/add",this.form).then((function(o){if(100==o.code)if(t.hideLoading(),n.form.childrenId=o.info,t.showToast({icon:"success",title:"添加成功！"}),1==e)n.feedBack(),t.navigateTo({url:"declaration"});else{n.lineInfo.childrenId=o.info;var i=JSON.stringify(n.lineInfo);t.setStorageSync("userlinesInfo",i),t.navigateTo({url:"payment"})}else t.hideLoading(),t.showToast({icon:"none",title:o.msg})}))):t.showToast({icon:"none",title:"请填写完整的信息！"})},getlinesList:function(){var t=this;this.$http.post("puProduct/getProductBySchoolId",{schoolId:this.form.schoolId}).then((function(e){if(100==e.code)if(0==e.info.length)t.isNull=!0;else{t.isNull=!1,t.list=[];var n=e.info;t.linesList=e.info,console.log(n),n.length>0&&(t.lineStrlist=[],n.forEach((function(e,n){t.lineStrlist.push(e.name)})),console.log(t.lineStrlist))}}))}}};e.default=l}).call(this,n("543d")["default"])},2963:function(t,e,n){"use strict";(function(t){n("83be");o(n("66fd"));var e=o(n("900d"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"900d":function(t,e,n){"use strict";n.r(e);var o=n("dad5"),i=n("ad40");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("f64c");var l,a=n("f0c5"),c=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"31284d36",null,!1,o["a"],l);e["default"]=c.exports},ad40:function(t,e,n){"use strict";n.r(e);var o=n("28cb"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},dad5:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}))},f64c:function(t,e,n){"use strict";var o=n("0707"),i=n.n(o);i.a}},[["2963","common/runtime","common/vendor"]]]);