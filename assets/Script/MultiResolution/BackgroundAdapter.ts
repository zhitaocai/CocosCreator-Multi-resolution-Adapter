const { ccclass, property } = cc._decorator;

/**
 * @classdesc 背景自适应所有分辨率的脚本
 * @author caizhitao
 * @version 0.1.0
 * @since 2018-11-30
 * @description
 *
 * 用法：
 *
 *      1. 将本组件挂载在节点上即可
 *
 * 注意：
 *
 *      1. 挂载这个脚本的节点不能加入Widget组件，不然这个适配是没有效果的
 *      2. 目前只支持 SHOW_ALL 模式下的背景缩放适配，不支持其他模式的背景缩放
 *
 * @example
    ```
    // e.g.
    // 代码中设置 SHOW_ALL 模式的参考代码
    cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.SHOW_ALL);

    // 或者 Canvas 组件中，同时勾选 Fit Width 和 Fit Height 
    ```
 */

@ccclass
export default class BackgroundAdapter extends cc.Component {
    onLoad() {
        // if (CC_DEBUG) {
        //     cc.log("调整前");
        //     cc.log(`屏幕分辨率: ${cc.view.getCanvasSize().width} x ${cc.view.getCanvasSize().height}`);
        //     cc.log(`视图窗口可见区域分辨率: ${cc.view.getVisibleSize().width} x ${cc.view.getVisibleSize().height}`);
        //     cc.log(`视图中边框尺寸: ${cc.view.getFrameSize().width} x ${cc.view.getFrameSize().height}`);
        //     cc.log(`设备或浏览器像素比例: ${cc.view.getDevicePixelRatio()}`);
        //     cc.log(`画布X:设计X=${cc.view.getScaleX()} ，画布Y:设计Y=${cc.view.getScaleY()}`);
        //     cc.log(`节点宽高: ${this.node.width} x ${this.node.height}`);
        //     cc.log(`节点缩放: ${this.node.scaleX} x ${this.node.scaleY}`);
        // }

        // this.node.scale = Math.max(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        // 1. 先找到 SHOW_ALL 模式适配之后，本节点的实际宽高以及初始缩放值
        let srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        let realWidth = this.node.width * srcScaleForShowAll;
        let realHeight = this.node.height * srcScaleForShowAll;

        // 2. 基于第一步的数据，再做缩放适配
        this.node.scale = Math.max(cc.view.getCanvasSize().width / realWidth, cc.view.getCanvasSize().height / realHeight);

        // if (CC_DEBUG) {
        //     cc.log(`节点在SHOW_ALL模式下展示的宽高: ${realWidth} x ${realHeight}`);
        //     cc.log(`节点在SHOW_ALL模式下展示的缩放: ${srcScaleForShowAll}`);
        //     cc.log(`节点在SHOW_ALL模式下还需要进行的缩放: ${this.node.scale} 才能达到全屏`);
        // }
    }
}
