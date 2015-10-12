'use strict';
app.config(($stateProvider) => {
    $stateProvider
        .state('play', {
            url: '/play/:mode',
            templateUrl: '/js/ng/states/play/play.state.html',
            resolve: {
                player: (PlayerFactory) => {
                    return PlayerFactory.getGame();
                },
                mode: ($stateParams, StateFactory) => {
                    StateFactory.mode = $stateParams.mode;
                    return $stateParams.state;
                }
            },
            controller: 'PlayController'
        });
});

app.controller("PlayController", function ($scope, player, mode, $state, $timeout, $rootScope, ParticleFactory, WaveFactory, MapFactory, StateFactory, TowerFactory, PlayerFactory, EnemyFactory, SpriteEventFactory, ProjectileFactory, GameFactory) {
    console.log("Player ", player);
    if(player.game.mapNum | player.game.mapNum === 0){
        console.log("game is defined", player.game);
        $scope.player = player;
    }else{
        console.log("game is undefined", player.game);
        $scope.player = "Guest";
    }
    $scope.mode = StateFactory.mode;
    StateFactory.canvas = document.getElementById("stage");
    StateFactory.renderer = PIXI.autoDetectRenderer(StateFactory.width, StateFactory.height, StateFactory.canvas);
    $("#mainContainer").append(StateFactory.renderer.view);
    $(StateFactory.renderer.view).attr("id","pixiCanvas");
    const start = map => {
        StateFactory.map = map;
        StateFactory.stages.play = new PIXI.Stage();
        let bg = new PIXI.Sprite(PIXI.Texture.fromImage("/images/bg.png"));
        bg.interactive = true;
        bg.click = SpriteEventFactory.bgClickHandler;
        bg.width = StateFactory.width;
        bg.height = StateFactory.height;
        StateFactory.stages.play.addChild(bg);//yaaaas
        StateFactory.stages.play.addChild(map.stage);//yaaaaa
        StateFactory.stages.play.addChild(TowerFactory.stage);//yaaaaa
        // StateFactory.stages.play.addChild(EnemyFactory.stage);//yaaaaa
        StateFactory.stages.play.addChild(EnemyFactory.stage);//yaaaaa
        StateFactory.stages.play.addChild(ProjectileFactory.stage);//yaaaas
        if($scope.player !== "Guest"){
            $scope.player.game.towers.forEach(function(tower){
                TowerFactory.createTower(tower.x,tower.y,tower.name);
            });
        }
        // StateFactory.stages.play.addChild(ParticleFactory.stage);//yaaaas
        StateFactory.state = "standby";
    };
    const init = (num, state) => {
        if (num !== undefined) $scope.mapNum = num;
        start(MapFactory.maps[$scope.mapNum], state);
    };
    const loadGame = () => {
        console.log("The player in loadGame ", $scope.player);
        $scope.mapNum = $scope.player.game.mapNum;
        PlayerFactory.health = $scope.player.game.health;
        PlayerFactory.money = $scope.player.game.money;
        start(MapFactory.maps[$scope.player.game.mapNum]);
        WaveFactory.loadWaves($scope.player.game.currentWave);
        console.log("Map num",$scope.player.game.mapNum);
        console.log("Map in start ")
        start(MapFactory.maps[$scope.player.game.mapNum]);
    }
    
    const restart = (mapNum) => {
        ProjectileFactory.stage.removeChildren();
        TowerFactory.stage.removeChildren();
        EnemyFactory.restart();
        StateFactory.stages.play.removeChildren();
        $rootScope.$emit('removeNextLevel');
        TowerFactory.resetTowers();
        PlayerFactory.restart();
        MapFactory.reset();
        WaveFactory.init(mode);
        $rootScope.$emit('resetSideBar');
        init(mapNum);
    }

    $rootScope.$on('mapChosen', (event, mapNum) => {
        console.log("Map chosen", mapNum);
        init(mapNum);
    });

    $rootScope.$on('towerClicked', (event, tower) => {
        $scope.editing = true;
        $scope.selectedTower = tower;
        $scope.selectedTower.imgUrl = "/images/tower-defense-turrets/turret-" + $scope.selectedTower.imgNum + '-' + "1" + ".png";
        console.log("Selected tower",$scope.selectedTower);
        $scope.$digest();
    });
    $rootScope.$on('setEditing', (event, editing) => {
        $scope.editing = editing;
        $scope.$digest();
    });
    $rootScope.$on('choseADifferentMap', (event, mapNum) => {
        restart(mapNum);
    });
    $rootScope.$on("currentTower", (event, tower) => {
        $scope.tower = tower;
    });
    $rootScope.$on("initiateWave", (event, passedWave) => {
        $scope.setUp = false;
        $scope.playing = true;
        passedWave.initiateWave();
    });
    $rootScope.$on("readyForNextWave", (event) => {
        StateFactory.initiateWave();
    });
    $rootScope.$on('restartLevel', (event) => {
        restart();
    });
    $rootScope.$on('loadGame', (event) => {
       loadGame();
    });
    $scope.tower = null;
    $('canvas').on('click', (e) => {
        if ($scope.tower !== null) {
            let towerPositionX = Math.floor(e.offsetX / StateFactory.cellSize);
            let towerPositionY = Math.floor(e.offsetY / StateFactory.cellSize);
            let selectedGrid = StateFactory.map.grid[towerPositionY][towerPositionX];
            if (!selectedGrid.contains.tower && typeof StateFactory.map.grid[towerPositionY][towerPositionX].terrain === "string") {
                if (PlayerFactory.money - $scope.tower.price >= 0) {
                    TowerFactory.createTower(towerPositionX, towerPositionY, $scope.tower.name + "Tower");
                    PlayerFactory.money -= $scope.tower.price;
                    $scope.$digest();
                }
            } else {
                console.log("Can't play");
            }
        }
        $scope.tower = null;
    })
    GameFactory.loop(Date.now());
});

