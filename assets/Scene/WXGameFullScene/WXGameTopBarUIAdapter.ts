/***
 *      ┌─┐       ┌─┐
 *   ┌──┘ ┴───────┘ ┴──┐
 *   │                 │
 *   │       ───       │
 *   │  ─┬┘       └┬─  │
 *   │                 │
 *   │       ─┴─       │
 *   │                 │
 *   └───┐         ┌───┘
 *       │         │
 *       │         │
 *       │         │
 *       │         └──────────────┐
 *       │                        │
 *       │                        ├─┐
 *       │                        ┌─┘
 *       │                        │
 *       └─┐  ┐  ┌───────┬──┐  ┌──┘
 *         │ ─┤ ─┤       │ ─┤ ─┤
 *         └──┴──┘       └──┴──┘
 *                神兽保佑
 *               代码无BUG!
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class WXGameTopBarUIAdapter extends cc.Component {
    start() {
        if (CC_WECHATGAME) {
            let menuInfo = wx.getMenuButtonBoundingClientRect();
            let systemInfo = wx.getSystemInfoSync();

            // @see https://developers.weixin.qq.com/minigame/dev/api/wx.getSystemInfoSync.html
            // @see https://developers.weixin.qq.com/minigame/dev/api/wx.getMenuButtonBoundingClientRect.html

            // 因为微信小游戏是全屏的，所以我们用 systemInfo.screenHeight ，而不是 systemInfo.windoeHeight，不过理论上这两个值在微信小游戏上是一样的
            // 获取菜单按钮（右上角胶囊按钮）距离屏幕顶部的距离。这个值是微信像素值，是经过设备像素比后的值，需要转换一下才能得到原始像素值
            // 但是转换过程我们不探讨
            // 我们只需要用这个原始值除以在该设备像素比下的屏幕高度，得到相应比例，然后我们在用本节点的父节点高度乘一下，那么最后就是得到我们需要的屏幕顶部距离了
            // this.node.parent 是我做了全屏适配后的节点，所以 .height 就是我这边适配后的屏幕高度
            let paddingTop = this.node.parent.height * (menuInfo.top / systemInfo.screenHeight);

            // 原理同上，我只是将本节点改为和微信菜单栏一样的高度
            this.node.height = this.node.parent.height * (menuInfo.height / systemInfo.screenHeight);

            // 这里采用 Widget 去调整本节点的位置
            // 因为 Widget 会自动帮我们处理好不同锚点位置，省事，同时也考虑周全
            // 如果单纯减 this.node.height / 2，那么问题来了，为什么是 / 2 而不是除以其他值，答案就是我们的锚点为 0.5，那么如果锚点为 0.3 等等其他值，那么就不能除以2了
            // 如果你能理解这段注释，那么不用Widget也可以，这里不再讨论
            let widget = this.node.getComponent(cc.Widget);
            widget.top = paddingTop;
            widget.isAbsoluteTop = true;
            widget.isAlignTop = true;
            widget.updateAlignment();
        }
    }
}
