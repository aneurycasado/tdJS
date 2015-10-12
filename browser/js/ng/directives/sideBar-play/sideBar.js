app.directive("sideBarPlay", () => {
    return {
        restrict: "E",
        templateUrl: "js/ng/directives/sideBar-play/sideBar.html",
        controller: 'SideBarPlayController'
    }
});

app.controller('SideBarPlayController', ($scope, $rootScope, PlayerFactory, GameFactory, StateFactory, WaveFactory, EnemyFactory, TowerFactory) => {
    $(document).ready(() => {
        $('.toolTipSideBar').tooltip();
    });
    $scope.playerStats = PlayerFactory;
    if(StateFactory.mode === "survival"){
        $scope.survival = true;
    }
    $scope.waves = WaveFactory.waves;
    $scope.currentWave = 0;
    $scope.totalEnemiesKilled = 0;
    $scope.totalEnemies = 0;
    $scope.enemiesKilled = EnemyFactory.terminatedEnemies.length;
    $scope.firstWave = true;
    $scope.nextWave = false;
    $scope.nextLevel = false;
    $scope.count = 0;
    $scope.state = StateFactory.state;
    $scope.constructors = TowerFactory.towers;
    $scope.towers = [];
    for(let key in TowerFactory.towers){
        let currentTower = new TowerFactory.towers[key](0,0);
        let img = currentTower.imgNum;
        currentTower.imgUrl = "./images/tower-defense-turrets/turret-" + img + "-1.png";
        $scope.towers.push(currentTower);
        currentTower.terminate();
    }
    $rootScope.$on('wavesDone', () => {
        $scope.totalEnemiesKilled+= EnemyFactory.terminatedEnemies.length;
        $scope.state = 'complete';
        $scope.$digest();
    });
    $rootScope.$on('updateNumberOfEnemies', () => {
        $scope.enemiesKilled = EnemyFactory.terminatedEnemies.length;
        $scope.$digest();
    });
    $rootScope.$on("nextWave", () => {
        $scope.state = 'standby';
        $scope.$digest();
    });
    $rootScope.$on('removeNextLevel', () => {
        $scope.state = 'standby';
    });
    $rootScope.$on('mapChosen', () => {
        $scope.state = 'standby';
    });
    $rootScope.$on('restartLevel', () => {
        $scope.currentWave = 0;
        $scope.totalEnemiesKilled = 0; 
        $scope.totalEnemies = 0;
        $scope.enemiesKilled = 0;
    });
    $rootScope.$on('loadGame', () => {
        console.log("We are updating load game");
        $scope.currentWave = $scope.player.game.currentWave;
        $scope.totalEnemiesKilled = $scope.player.game.totalEnemiesKilled;
        $scope.waves = WaveFactory.waves;
        $scope.state = StateFactory.state;
        console.log($scope.waves.length);
    });
    $scope.saveGame = () => {
        let player = {
            health: PlayerFactory.health,
            money: PlayerFactory.money,
            currentWave: $scope.currentWave,
            totalEnemiesKilled: $scope.totalEnemiesKilled,
            mapNum: $scope.mapNum,
            towers: TowerFactory.savedTowers
        };
        PlayerFactory.saveGame(player).then((savedInfo) => {
            console.log("Saved Info ", savedInfo);
        });
    }
    $scope.towerClicked = (tower) => {
        $rootScope.$emit("currentTower", tower);
    }
    $scope.initiateWave = () => {
        $scope.currentWave++;
        GameFactory.changeStateTo("wave");
        $scope.state = StateFactory.state;
        $scope.totalEnemies = WaveFactory.currentWaveLength();
        $scope.enemiesKilled = EnemyFactory.terminatedEnemies.length;
    }
});

