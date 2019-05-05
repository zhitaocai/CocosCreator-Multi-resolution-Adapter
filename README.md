# Cocos Creator 多分辨率完美适配演示项目

[![](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/zhitaocai/CocosCreator-Multi-resolution-Adapter/blob/master/LICENSE)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%20v2.0.x-orange.svg)](http://www.cocos.com/creator)

## 效果预览

![](static/SHOW_ALL_*.png)

## 使用说明

场景如下：

![](./static/SceneSettingPreview.png)

1. Canvas 开启 SHOW ALL 模式，并设置你的设计分辨率，如：这里例子为 **720 x 1280**
    - ![](./static/USAGE_CANVAS.png)
2. Background 背景节点实现 SHOW ALL 模式下 **缩放适配** ，操作如下：

    1. Background 背景节点保持和设计分辨率一致的宽高（不能用 Widget 组件）
    2. Background 背景节点挂入 [BackgroundAdapter.ts](./assets/Script/MultiResolution/BackgroundAdapter.ts) 组件

    操作后结果如下：

    - ![](./static/USAGE_BACKGROUND.png)

3. Content 内容节点实现 SHOW ALL 模式下 **尺寸适配（实质为宽高重置）**，操作如下：

    1. Content 内容节点保持和设计分辨率一致的宽高（不能用 Widget 组件）
    2. Content 节点挂入 [ContentAdapter.ts](./assets/Script/MultiResolution/ContentAdapter.ts) 组件
    3. 需要实现尺寸适配的节点，直接挂在本节点下就可以，同时子节点可以正常开发使用，比如：直接用 Widget 组件实现撑满父节点范围也是支持的

    操作后结果如下：

    - ![](./static/USAGE_CONTENT.png)

## 更多

本系列教程指引：

1. [Cocos Creator 多分辨率完美适配系列-1（现状与最终效果）](https://www.jianshu.com/p/c34577e37dd5)
2. [Cocos Creator 多分辨率完美适配系列-2（部署验证设置）](https://www.jianshu.com/p/e30442d38c64)
3. [Cocos Creator 多分辨率完美适配系列-3（背景适配实现）](https://www.jianshu.com/p/24cba3de1e33)
4. [Cocos Creator 多分辨率完美适配系列-4（内容适配实现）](https://www.jianshu.com/p/738a8f6a2ec1)
5. [Cocos Creator 多分辨率完美适配系列-5（贴边栏动画实现）](https://www.jianshu.com/p/e5264904d03f)
6. [Cocos Creator 多分辨率完美适配系列-6（刘海屏适配）](https://www.jianshu.com/p/0fe32dbfe0c9)
7. [Cocos Creator 多分辨率完美适配系列-7（封装库使用）](https://www.jianshu.com/p/de3365853b41)


## 微信小游戏全面屏适配

1. 全屏适配参考上面章节
2. 下面为全屏屏顶部适配效果图，具体实现参考 [WXGameTopBarUIAdapter.ts](./assets/Scene/WXGameFullScene/WXGameTopBarUIAdapter.ts)

![](static/WXGAME_FULLSCREEN_TOPBAR_UI_ADAPTER.gif)


## 支持一下作者吧

![](./static/pay.png)

## LICENSE

    MIT License

    Copyright (c) 2019 Zhitao Cai

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
