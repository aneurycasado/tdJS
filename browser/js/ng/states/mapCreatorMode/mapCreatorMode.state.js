app.config(($stateProvider) => {
    $stateProvider
        .state('mapCreatorMode', {
            url: '/mapCreatorMode',
            templateUrl: '/js/ng/states/mapCreatorMode/mapCreatorMode.state.html',
            controller: 'MapCreatorModeController'
        })
});

app.controller("MapCreatorModeController", ($scope,$state, StateFactory, SpriteEventFactory, MapElementFactory, MapFactory, DesignFactory) => {
    document.getElementsByTagName('body')[0].style.backgroundImage="url(./images/bg2.png)"
    let blankMap = new MapFactory.Map(DesignFactory.blankMap2,0)
    StateFactory.map = blankMap;
    StateFactory.canvas = document.getElementById("stage");
    StateFactory.renderer = PIXI.autoDetectRenderer(StateFactory.width, StateFactory.height, StateFactory.canvas);
    $("#mainContainer").append(StateFactory.renderer.view);
    $(StateFactory.renderer.view).attr("id","pixiCanvas");
    StateFactory.stages.newMap = new PIXI.Stage();
    let bg = new PIXI.Sprite(PIXI.Texture.fromImage("/images/bg.png"));
    bg.interactive = true;
    bg.click = SpriteEventFactory.bgClickHandler;
    bg.width = StateFactory.width;
    bg.height = StateFactory.height;
    StateFactory.stages.newMap.addChild(bg);//yaaaas
    StateFactory.stages.newMap.addChild(blankMap.stage);
    StateFactory.stages.newMap.addChild(MapElementFactory.stage);
    $("#pixiCanvas").on('click', (e) => {
        console.log("We register a click event");
        if ($scope.currentElement !== null) {
            console.log("currentElement != null")
            let elementPositionX = Math.floor(e.offsetX / StateFactory.cellSize);
            let elementPositionY = Math.floor(e.offsetY / StateFactory.cellSize);
            let selectedGridNode = StateFactory.map.grid[elementPositionY][elementPositionX];
            if (!selectedGridNode.contains.element) {
                MapElementFactory.createMapElement(elementPositionX, elementPositionY, $scope.currentElement);
            }
            else {
                console.log("Can't play");
            }
        }
        $scope.currentElement = null;
        $scope.$digest();
    })
    const draw = () => {
        requestAnimationFrame(draw);
        StateFactory.renderer.render(StateFactory.stages.newMap);
    }
    draw();
})
