const { ccclass, property } = cc._decorator;

@ccclass
export default class MultiResolutionCompat extends cc.Component {
    static DEFAULT_RESOLUTION_WIDTH = 720;
    static DEFAULT_RESOLUTION_HEIGHT = 1280;

    // @property({
    //     tooltip: "设计分辨率的宽度"
    // })
    // designResolutionWidth: number = MultiResolutionCompat.DEFAULT_RESOLUTION_WIDTH;

    // @property({
    //     tooltip: "设计分辨率的高度"
    // })
    // designResolutionHeight: number = MultiResolutionCompat.DEFAULT_RESOLUTION_HEIGHT;

    onLoad() {
        // 第一种：全屏拉伸，iPhoneX或平板类的会拉伸变形
        // cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);

        // 第二种：1比1显示，iPhoneX上下有黑边、平板左右有黑边，但不会变形（推荐）
        // cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.EXACT_FIT);
        // var canvasSize = cc.view.getCanvasSize();
        // var proportion = canvasSize.width / canvasSize.height;
        // if (proportion >= 0.6) {
        //     cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_HEIGHT);
        // } else {
        //     cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
        // }

        // // 第三种：按照官方说明的设计分辨率宽高比和屏幕分辨率宽高比来适配
        // let canvasSize = cc.view.getCanvasSize();
        // let screenResolution = canvasSize.width / canvasSize.height;
        // let designResolutionWidth = 720;
        // let designResolutionHeight = 1280;
        // let designResolution = designResolutionWidth / designResolutionHeight;
        // if (CC_DEBUG) {
        //     cc.log(`设计分辨率（${designResolutionWidth}x${designResolutionHeight}) 宽高比：${designResolution}`);
        //     cc.log(`屏幕分辨率（${canvasSize.width}x${canvasSize.height}) 宽高比：${screenResolution}`);
        //     if (designResolution > screenResolution) {
        //         cc.log(
        //             `设计分辨率缩放至于屏幕分辨率等高后的分辨率 (${designResolutionWidth * (canvasSize.height / designResolutionHeight)}x${
        //                 canvasSize.height
        //             })`
        //         );
        //         cc.log("设计分辨率宽高比大于屏幕分辨率，按照官方说法，此时应该采用(Fit Height)，实际应用后，会裁剪掉游戏左右两边的部分内容");
        //     } else if (designResolution < screenResolution) {
        //         cc.log(
        //             `设计分辨率缩放至于屏幕分辨率等宽后的分辨率 (${canvasSize.width}x${designResolutionHeight *
        //                 (canvasSize.width / designResolutionWidth)})`
        //         );
        //         cc.log("设计分辨率宽高比小于屏幕分辨率，按照官方说法，此时应该采用(Fit Width)，实际应用后，会裁剪掉游戏上下两边的部分内容");
        //     } else {
        //         cc.log("设计分辨率宽高比等于屏幕分辨率");
        //     }
        // }
        // if (designResolution > screenResolution) {
        //     cc.view.setDesignResolutionSize(
        //         designResolutionWidth,
        //         designResolutionHeight,
        //         cc.ResolutionPolicy.FIXED_HEIGHT
        //     );
        // } else {
        //     cc.view.setDesignResolutionSize(
        //         designResolutionWidth,
        //         designResolutionHeight,
        //         cc.ResolutionPolicy.FIXED_WIDTH
        //     );
        // }

        // 第四种：直接等比例缩放至屏幕上宽高最短的那条边，后续控制背景拉伸
        cc.view.setDesignResolutionSize(
            MultiResolutionCompat.DEFAULT_RESOLUTION_WIDTH,
            MultiResolutionCompat.DEFAULT_RESOLUTION_HEIGHT,
            cc.ResolutionPolicy.SHOW_ALL
        );

        // this.node.scale = 1.1
        // this.node.position = cc.v2(0, -100)
        // this.node.position = this.node.position.sub(cc.v2(0, 100))
        // if (CC_DEBUG) {
        //     cc.log(`屏幕分辨率: ${cc.view.getCanvasSize().width} x ${cc.view.getCanvasSize().height}`);
        //     cc.log(`视图窗口可见区域分辨率: ${cc.view.getVisibleSize().width} x ${cc.view.getVisibleSize().height}`);
        //     cc.log(`视图中边框尺寸: ${cc.view.getFrameSize().width} x ${cc.view.getFrameSize().height}`);
        //     cc.log(`设备或浏览器像素比例: ${cc.view.getDevicePixelRatio()}`);
        //     cc.log("调整前");
        //     cc.log(`节点宽高: ${this.node.width} x ${this.node.height}`);
        //     cc.log(`节点缩放: ${this.node.scaleX} x ${this.node.scaleY}`);
        // }
        // if (cc.view.getCanvasSize().width > cc.view.getCanvasSize().height) {
        //     this.backgroundNode.scale = cc.view.getCanvasSize().width / 720;
        // } else {
        //     this.backgroundNode.scale = cc.view.getCanvasSize().height / 1280;
        // }
        // if (CC_DEBUG) {
        //     cc.log("调整后");
        //     cc.log(`节点宽高: ${this.node.width} x ${this.node.height}`);
        //     cc.log(`节点缩放: ${this.node.scaleX} x ${this.node.scaleY}`);
        // }
    }

    /**
     * 计算当前游戏设计分辨率在ShowAll模式适配后，设计分辨率做出的缩放值
     */
    static getShowAllModelScale(): number {
        return Math.min(
            cc.view.getCanvasSize().width / this.DEFAULT_RESOLUTION_WIDTH,
            cc.view.getCanvasSize().height / this.DEFAULT_RESOLUTION_HEIGHT
        );
    }

    /**
     * 计算当前游戏设计分辨率在ShowAll模式适配后，设计分辨率下的界面的实际高度
     */
    static getShowAllModelRealHeight(): number {
        return this.DEFAULT_RESOLUTION_HEIGHT * this.getShowAllModelScale();
    }

    /**
     * 计算当前游戏设计分辨率在ShowAll模式适配后，设计分辨率下的界面的实际宽度
     */
    static getShowAllModelRealWidth(): number {
        return this.DEFAULT_RESOLUTION_WIDTH * this.getShowAllModelScale();
    }

    /**
     * 计算当前游戏设计分辨率在ShowAll模式适配后，上下边界的黑边之和的总高度
     */
    static getShowAllModelVerticalBorderHeight(): number {
        return cc.view.getCanvasSize().height - this.getShowAllModelRealHeight();
    }

    /**
     * 计算当前游戏设计分辨率在ShowAll模式适配后，左右边界的黑边之和的总宽度
     */
    static getShowAllModelHorizontalBorderWidth(): number {
        return cc.view.getCanvasSize().width - this.getShowAllModelRealWidth();
    }

    /**
     * 计算当前游戏设计分辨率在ShowAll模式适配后，传入来的原始坐标在ShowAll模式下的「贴近屏幕底部」实际坐标值
     */
    static getShowAllModelNodePositionCloseToBottom(nodePosInDesign: cc.Vec2): cc.Vec2 {
        let srcScaleForShowAll = MultiResolutionCompat.getShowAllModelScale();
        let bottomBorderHeightInCanvas = MultiResolutionCompat.getShowAllModelVerticalBorderHeight() / 2;
        let srcNodePosYInCanvas = nodePosInDesign.y * srcScaleForShowAll;
        let finalNodePosYInCanvas = srcNodePosYInCanvas - bottomBorderHeightInCanvas;
        let nodePosYInDesign = finalNodePosYInCanvas / srcScaleForShowAll;
        return cc.v2(nodePosInDesign.x, nodePosYInDesign);
    }
}
