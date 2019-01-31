import MultiResolutionCompat from "./MultiResoultionCompat";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CloseToBorderComponent extends cc.Component {
    @property()
    isCloseToBottom: boolean = false;

    @property()
    closeToBottonPx: number = 0;

    onLoad() {
        this.node.position = this.getShowAllModeNodePositionCloseToBottom(this.node.position);
    }

    /**
     * 计算当前游戏设计分辨率在ShowAll模式适配后，传入来的原始坐标在ShowAll模式下的「贴近屏幕底部」实际坐标值
     */
    getShowAllModeNodePositionCloseToBottom(nodePosInDesign: cc.Vec2): cc.Vec2 {
        let srcScaleForShowAll = MultiResolutionCompat.getShowAllModeScale();
        let bottomBorderHeightInCanvas = MultiResolutionCompat.getShowAllModeVerticalBorderHeight() / 2;
        let srcNodePosYInCanvas = nodePosInDesign.y * srcScaleForShowAll;
        let finalNodePosYInCanvas = srcNodePosYInCanvas - bottomBorderHeightInCanvas;
        let nodePosYInDesign = finalNodePosYInCanvas / srcScaleForShowAll;
        return cc.v2(nodePosInDesign.x, nodePosYInDesign);
    }
}
