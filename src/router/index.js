import Vue from "vue";
import VueRouter from "vue-router";
import wx from "weixin-js-sdk";
import routes from "./routes";
import { getSignature } from "@/apis/wx";

Vue.use(VueRouter);

const mode = process.env.VUE_APP_ROUTER_MODE;

const router = new VueRouter({
  mode,
  routes
});

router.beforeEach(async (to, from, next) => {
  const jsApiList = to.meta.jsApiList;
  const res = await getSignature();
  wx.config({
    debug: process.env.VUE_APP_WX_DEBUG,
    ...res,
    jsApiList
  });
  wx.ready(() => {
    next();
  });
  wx.onerror(error => {
    // 提示错误
    console.log(error);
  });
});
