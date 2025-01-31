中国象棋 - in html5
===========

作者：一叶孤舟<br>
联系：itlwei@163.com  QQ:28701884<br>
Demo：https://itlwei.github.io/Chess/

中国象棋 - in html5是一款使用html5 canvas开发的开源小游戏，不依赖任何类库，不依赖任何后台程序，全部原生Javascript进行AI计算，欢迎广大业内同行多多交流指正，共同完善。

## 特点

* 全部使用Javascript完成AI人工智能计算，不依赖任何后台程序
* 不依赖任何类库，全部原生Javascript，使用html5 canvas.
* 实现中不涉及任何浏览器特性，所以不存在浏览器兼容性问题.
* 代码结构极其简洁明了，你可以轻易的阅读，修改成自己版本.

## 启动项目

1. 确保你已经安装了Python。
2. 打开终端或命令提示符，导航到项目目录 `chinese_chess_ui`。
3. 运行以下命令启动本地服务器：
   ```bash
   python -m http.server 8000
   ```
4. 打开浏览器，访问 `http://localhost:8000` 查看项目。

## Change Log
### v1.5.1
* 修复BUG

### v1.5.0
* 大幅度修改UI，增加风格选择

### v1.0.3
* 增加历史表，提高AI计算效率

### v1.0.2
* 修复了AI计算过深的资源耗尽问题

### v1.0.1
* 修复了一些情况下悔棋出错的问题
* 修复了长将不死的问题