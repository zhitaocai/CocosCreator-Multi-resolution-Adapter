const { ccclass, property } = cc._decorator;

/**
 * 未完成
 */
@ccclass
export default class CloseToBorderComponent extends cc.Component {
    @property({
        tooltip: "是否紧贴下方，不能和紧贴上方同时使用"
    })
    closeToBottom: boolean = false;

    @property({
        tooltip: "距离下方的距离（px），开启紧贴下方时使用"
    })
    marginBottomInPx: number = 0;

    // @property({
    //     tooltip: "是否紧贴上方，不能和紧贴下方同时使用"
    // })
    // closeToTop: boolean = false;

    onLoad() {
        // 计算本节点在父节点下，贴底边时的坐标，需要特别注意处理锚点
        if (this.closeToBottom) {
            this.node.position = cc.v2(
                this.node.position.x,
                -this.node.parent.height / 2 + this.node.anchorY * this.node.height + this.marginBottomInPx
            );
        }
    }
}
