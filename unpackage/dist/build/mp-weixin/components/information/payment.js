(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/information/payment"],{"009e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{checkNum:1,money:0,isShow:!1,form:{},userInfo:{},payInfo:{},payres:{}}},onShow:function(){var n=t.getStorageSync("userlinesInfo");this.form=JSON.parse(n);var e=t.getStorageSync("userInfo");this.userInfo=JSON.parse(e),this.money=this.form.morningPrice},methods:{changeNum:function(t){this.checkNum=t,this.money=1==t?this.form.morningPrice:2==t?this.form.nightPrice:this.form.wholePrice},goPay:function(){var n=this,e={};e.parentId=this.userInfo.id,e.openId=this.userInfo.wechatOpenid,e.productId=this.form.id,e.type=this.checkNum,e.childrenId=this.form.childrenId,e.siteId=this.form.siteId,e.siteName=this.form.siteName,e.name=this.form.name,this.payInfo=e,t.showLoading({icon:"loading",title:"正在提交订单"}),this.$http.post("puProduct/createBuyOrder",e,"application/json").then((function(e){100==e.code&&(n.payres=e.info,n.wxPay(e.info),t.hideLoading())}))},wxPay:function(n){var e=this;t.requestPayment({provider:"wxpay",timeStamp:n.timeStamp,nonceStr:n.nonceStr,package:n.packageValue,signType:"MD5",paySign:n.paySign,success:function(n){console.log("success:"+JSON.stringify(n)),t.showToast({icon:"success",title:"支付成功"}),setTimeout((function(){t.switchTab({url:"../../pages/my/index"})}),2e3)},fail:function(n){console.log("支付失败"),console.log("fail:"+JSON.stringify(n)),t.showToast({icon:"none",title:"支付失败"}),e.isShow=!0}})},paySuccess:function(){this.$http.post("puProduct//notify/order",{}).then((function(n){100==n.code&&(t.showToast({icon:"success",title:"支付成功"}),setTimeout((function(){t.switchTab({url:"../../pages/my/index"})}),2e3))}))},isKonw:function(){this.isShow=!1;var n={};this.payInfo.money=this.money,n.payInfo=this.payInfo,n.payres=this.payres,n=JSON.stringify(n),t.setStorageSync("payInfo",n),t.switchTab({url:"../../pages/my/index"})}}};n.default=e}).call(this,e("543d")["default"])},4188:function(t,n,e){"use strict";e.r(n);var o=e("009e"),i=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,(function(){return o[t]}))}(s);n["default"]=i.a},"73ab":function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.money.toFixed(2));t.$mp.data=Object.assign({},{$root:{g0:e}})},s=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return o}))},"78cb":function(t,n,e){},"8c71":function(t,n,e){"use strict";var o=e("78cb"),i=e.n(o);i.a},b4b7:function(t,n,e){"use strict";e.r(n);var o=e("73ab"),i=e("4188");for(var s in i)"default"!==s&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("8c71");var c,a=e("f0c5"),r=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"16c66737",null,!1,o["a"],c);n["default"]=r.exports},c84f:function(t,n,e){"use strict";(function(t){e("83be");o(e("66fd"));var n=o(e("b4b7"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["c84f","common/runtime","common/vendor"]]]);