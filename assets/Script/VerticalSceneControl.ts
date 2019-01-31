const { ccclass, property } = cc._decorator;

@ccclass
export default class VerticalSceneControl extends cc.Component {
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    progressLabel: cc.Label = null;

    start() {
        this.progressBar.node.width = this.progressBar.node.getParent().width;
        this.progressBar.node.height = this.progressBar.node.getParent().height;
        this.progressBar.totalLength = this.progressBar.node.width;
        this.progressBar.progress = 0;
        this.schedule(() => {
            // 无限重置
            if (this.progressBar.progress > 1) {
                this.progressBar.progress = 0;
            }
            this.progressBar.progress = this.progressBar.progress + 0.01;
            this.progressLabel.string = `正在加载 ${Math.floor(this.progressBar.progress * 100)}%`;
        }, 0.1);
    }
}
