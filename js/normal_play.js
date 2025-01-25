// 双人对弈逻辑
var normalPlay = normalPlay || {};

// 初始化双人对弈
normalPlay.init = function () {
    com.play_type = 1;
    normalPlay.isPlay = true;
    normalPlay.currentPlayer = 1; // 1 表示红方，-1 表示黑方 对应的是 man.my == 1 or -1
    normalPlay.map = com.arr2Clone(com.initMap); // 初始化棋盘
    normalPlay.nowManKey = false;			//现在要操作的棋子
    normalPlay.pace = [];				//记录每一步
    com.childList.length = 3
    com.createMans(normalPlay.map)
    com.show(); // 显示棋盘
    // 绑定点击事件
    com.canvas.addEventListener("click", normalPlay.clickCanvas);
};

// 通过着法移动棋子

//悔棋
normalPlay.regret = function () {
    var pace = normalPlay.pace;
    if (pace.length == 0) return;
    pace.pop();
    var map = com.arr2Clone(com.initMap);
    //初始化所有棋子
    for (var i = 0; i < map.length; i++) {
        for (var n = 0; n < map[i].length; n++) {
            var key = map[i][n];
            if (key) {
                com.mans[key].x = n;
                com.mans[key].y = i;
                com.mans[key].isShow = true;
            }
        }
    }

    for (var i = 0; i < pace.length; i++) {
        var p = pace[i].split("")
        var x = parseInt(p[0], 10);
        var y = parseInt(p[1], 10);
        var newX = parseInt(p[2], 10);
        var newY = parseInt(p[3], 10);
        var key = map[y][x];
        //try{

        var cMan = map[newY][newX];
        if (cMan) com.mans[map[newY][newX]].isShow = false;
        com.mans[key].x = newX;
        com.mans[key].y = newY;
        map[newY][newX] = key;
        delete map[y][x];
        if (i == pace.length - 1) {
            com.showPane(newX, newY, x, y)
        }
    }
    normalPlay.map = map;
    normalPlay.currentPlayer *= -1;
    normalPlay.isPlay = true;
    com.show();
}

normalPlay.clickCanvas = function (e) {
    if (!normalPlay.isPlay) return false;
    var key = normalPlay.getClickMan(e);
    var point = normalPlay.getClickPoint(e);
    console.log("clickMan", key);
    console.log("clickPoint", point);
    var x = point.x;
    var y = point.y;

    if (key) {
        normalPlay.clickMan(key, x, y);
    } else {
        normalPlay.clickPoint(x, y);
    }
    console.log("cur pace", normalPlay.pace);
}

normalPlay.indexOfPs = function (ps, xy) {
    for (var i = 0; i < ps.length; i++) {
        if (ps[i][0] == xy[0] && ps[i][1] == xy[1]) return true;
    }
    return false;

}

normalPlay.clickPoint = function (x, y) {
    var nowSelectedKey = normalPlay.nowManKey;
    if (!nowSelectedKey) {
        return;
    }
    var man = com.mans[nowSelectedKey];
    console.log("clickPoint man", man)
    if (normalPlay.indexOfPs(man.ps, [x, y])) {
        var pace = man.x + "" + man.y
        delete normalPlay.map[man.y][man.x];
        normalPlay.map[y][x] = nowSelectedKey;
        com.showPane(man.x, man.y, x, y)
        man.x = x;
        man.y = y;
        man.alpha = 1;
        normalPlay.pace.push(pace + x + y);
        normalPlay.nowManKey = false;
        com.dot.dots = [];
        com.show();
        com.get("clickAudio").play();
        normalPlay.currentPlayer *= -1;
    }
}

normalPlay.clickMan = function (key, x, y) {
    var man = com.mans[key];
    var nowSelectedKey = normalPlay.nowManKey;
    var isKillMan = nowSelectedKey && nowSelectedKey != key && man.my != com.mans[nowSelectedKey].my;
    console.log("clickMan nowSelectedKey", nowSelectedKey);
    console.log("clickMan man", man);
    console.log("clickMan isKillMan", isKillMan);
    console.log("clickMan currentPlayer", normalPlay.currentPlayer);
    // 选中棋子
    if (key && !isKillMan) {
        if (man.my != normalPlay.currentPlayer) {
            return;
        }
        man.alpha = 0.8;
        if (nowSelectedKey) {
            com.mans[nowSelectedKey].alpha = 1;
        }
        com.pane.isShow = false;
        normalPlay.nowManKey = key;
        com.mans[key].ps = com.mans[key].bl(normalPlay.map); //获得所有能着点
        com.dot.dots = com.mans[key].ps
        com.show();
        com.get("selectAudio").play();
        return;
    }
    //吃子
    if (nowSelectedKey && isKillMan && play.indexOfPs(com.mans[nowSelectedKey].ps, [x, y])) {
        man.isShow = false;
        var pace = com.mans[nowSelectedKey].x + "" + com.mans[nowSelectedKey].y
        delete normalPlay.map[com.mans[nowSelectedKey].y][com.mans[nowSelectedKey].x];
        normalPlay.map[y][x] = nowSelectedKey;
        com.showPane(com.mans[nowSelectedKey].x, com.mans[nowSelectedKey].y, x, y)
        com.mans[nowSelectedKey].x = x;
        com.mans[nowSelectedKey].y = y;
        com.mans[nowSelectedKey].alpha = 1

        normalPlay.pace.push(pace + x + y);
        normalPlay.nowManKey = false;
        com.pane.isShow = false;
        com.dot.dots = [];
        com.show()
        com.get("clickAudio").play();
        normalPlay.currentPlayer *= -1;
        if (key == "j0") alert("黑方获胜！");;
        if (key == "J0") alert("红方获胜！");
    }
}

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