// 双人对弈逻辑
var normalPlay = normalPlay || {};

// 初始化双人对弈
normalPlay.init = function () {
    normalPlay.isPlay = true;
    normalPlay.currentPlayer = 1; // 1 表示红方，2 表示黑方
    normalPlay.map = com.arr2Clone(com.initMap); // 初始化棋盘
    play.nowManKey = false;			//现在要操作的棋子
	play.pace = [];				//记录每一步
    com.show(); // 显示棋盘
    // 绑定点击事件
    com.canvas.addEventListener("click", function (e) {
        if (!normalPlay.isPlay) return;
        var man = normalPlay.getClickMan(e);
        if (man) {
            var newX = normalPlay.getClickPoint(e).x;
            var newY = normalPlay.getClickPoint(e).y;
            normalPlay.moveMan(man, newX, newY);
        }
    });
};

// 切换玩家
normalPlay.switchPlayer = function () {
    normalPlay.currentPlayer = (normalPlay.currentPlayer === 1) ? 2 : 1;
};

// 获取点击的着点
normalPlay.getClickPoint = function (e) {
    var domXY = com.getDomXY(com.canvas);
    var x = Math.round((e.pageX - domXY.x - com.pointStartX - 20) / com.spaceX);
    var y = Math.round((e.pageY - domXY.y - com.pointStartY - 20) / com.spaceY);
    return { "x": x, "y": y };
};

// 获取棋子
normalPlay.getClickMan = function (e) {
    var clickXY = normalPlay.getClickPoint(e);
    var x = clickXY.x;
    var y = clickXY.y;
    if (x < 0 || x > 8 || y < 0 || y > 9) return false;
    var man = normalPlay.map[y][x];
    return (man && man != "0") ? man : false;
};

// 移动棋子
normalPlay.moveMan = function (man, newX, newY) {
    var oldX = man.x;
    var oldY = man.y;
    if (normalPlay.isValidMove(man, newX, newY)) {
        normalPlay.map[oldY][oldX] = "0";
        man.x = newX;
        man.y = newY;
        normalPlay.map[newY][newX] = man.id;
        com.show(); // 更新棋盘显示
        normalPlay.checkWin(); // 检查是否胜利
        normalPlay.switchPlayer(); // 切换玩家
    }
};

// 检查是否胜利
normalPlay.checkWin = function () {
    // 这里需要实现具体的胜利条件判断逻辑
    // 例如：检查对方的将是否被将军
    // 如果胜利，调用 normalPlay.showWin 方法
};

// 显示胜利信息
normalPlay.showWin = function (player) {
    normalPlay.isPlay = false;
    if (player === 1) {
        alert("红方胜利！");
    } else {
        alert("黑方胜利！");
    }
};

// 判断移动是否合法
normalPlay.isValidMove = function (man, newX, newY) {
    // 这里需要实现具体的移动合法性判断逻辑
    // 例如：根据棋子类型判断是否可以移动到目标位置
    return true; // 示例中直接返回 true
};