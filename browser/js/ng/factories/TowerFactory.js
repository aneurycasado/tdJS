'use strict'
app.factory('TowerFactory', function($rootScope, EnemyFactory, ProjectileFactory, StateFactory, ParticleFactory, SpriteEventFactory, CodeEvalFactory, ModFactory, $timeout, SpriteGenFactory, LightningFactory, WeaponFactory) {

    let allTowers = [];
    let savedTowers = [];

    let stage = StateFactory.stages.towers;

    let burst = function () {
        let self = this;
        let temp = self.activeWeapon.reloadTime;
        self.activeWeapon.reloadTime = self.activeWeapon.reloadTime / 3;
        $timeout(function () {
            self.activeWeapon.reloadTime = temp;
        }, 3000);
    };
    let launchUltimate = function() {
        this.ultimateWeapon.shoot(this.target);
    };


    //name, functionToRun, context, coolDownPeriod, time=Date.now(), purchased=false
    class Tower {
        constructor(x, y, options) {
            this.range = null;
            this.position = {x: x, y: y};
            this.rank = 1;
            this.kills = 0;
            this.reloading = false;
            this.imgNum = options.img;
            this.eventRegister = {};
            $rootScope.$on('deadEnemy', (event, deadEnemy) => {
                //console.log('enemy is dead');
                //console.log('this.target', this.target);
                if (deadEnemy === this.target) {
                    this.target = null;
                }
            });
            this.mods = {
                surroundings: [
                    new ModFactory.Surrounding('getEnemies', this.getEnemies, this, true),
                    new ModFactory.Surrounding('getNearbyTowers', this.getNearbyTowersEncapsulated, this, true)
                ],
                abilities: [
                    new ModFactory.Ability('burst', burst, this, 25, true),
                    new ModFactory.Ability('ultimateWeapon', launchUltimate, this, 30, true),
                    new ModFactory.Ability('swapToSecondary', this.swapToSecondary, this, 0, true),
                    new ModFactory.Ability('swapToPrimary', this.swapToPrimary, this, 0, true)
                ],
                effects: [],
                consumables: []
            };

            this.codeSnippet = null;
            for (let opt in options) {
                this[opt] = options[opt];
            }
            if (this.primaryWeaponConstructor) {
                this.primaryWeapon = new this.primaryWeaponConstructor(this);
                this.activeWeapon = this.primaryWeapon;
            }
            if (this.secondaryWeaponConstructor) {
                this.secondaryWeapon = new this.secondaryWeaponConstructor(this);
            }
            if(this.ultimateWeaponConstructor) {
                this.ultimateWeapon = new this.ultimateWeaponConstructor(this);
            }

            let array = [];
            for (let i = 1; i < 4; i++) {
                array.push(PIXI.Texture.fromImage("/images/tower-defense-turrets/turret-" + options.img + '-' + i + ".png"));
            }

            let imgPositions = [this.position.x * StateFactory.cellSize + (StateFactory.cellSize / 2), this.position.y * StateFactory.cellSize + (StateFactory.cellSize / 2)]
            this.imgContainer = new PIXI.Container();
            SpriteGenFactory.attachSprite(this, new PIXI.extras.MovieClip(array), ...imgPositions);
            this.img.animationSpeed = .1;
            SpriteGenFactory.attachToContainer(this.imgContainer, this.img);
            stage.addChild(this.imgContainer);
            SpriteGenFactory.drawWeaponRangeCircle(this, this.activeWeapon.range);
            this.img.click = SpriteEventFactory.towerClickHandler.bind(this);
            this.towerControlFunction = null;
            this.img.mouseover = SpriteEventFactory.towerMouseOverHandler.bind(this);
            this.img.mouseout = SpriteEventFactory.towerMouseLeaveHandler.bind(this);

        }
        on(name, cb) {
            //if(!this.eventRegister[name]) {
            //    this.eventRegister[name] = []
            //}
            //this.eventRegister[name].push(cb);
            this.eventRegister[name] = cb;
        }
        remove(name, cb) {

        }
        emit(name, ...args) {
            if(!this.eventRegister[name]) return;
            //this.eventRegister[name].forEach(cb => {
            //    cb(...args)
            //});
            this.eventRegister[name](...args);
        }
        getCurrentTarget() {
            if (this.target) {
                return this.target.enemyEncapsulated;
                //console.log(this.target.getSpeed());
                //return {
                //    index: EnemyFactory.enemies.indexOf(this.target),
                //    health: this.target.getHealth(),
                //    speed: this.target.getSpeed(),
                //    position: this.target.getPosition(),
                //    name: this.target.getName()
                //}
            }
            // return this.target;
        }

        setTarget(enemy) {
            this.target = enemy;
        }


        setTargetBasedOnIndex(enemy) {
            if(enemy) this.setTarget(EnemyFactory.enemies[enemy.getIndex()]);
            else this.setTarget(null);
        }

        getEnemies() {
            //let enemiesArr = [];
            let enemies = EnemyFactory.enemies;
            let arr = [];
            for (let i = enemies.length - 1; i >= 0; i--) {
                if (this.isEnemyInRange(enemies[i])) {
                    arr.push(enemies[i].enemyEncapsulated)
                }
            }
            return arr;
        }

        unlockMod(modName, category) {
            var currentArr;
            if (category) {
                currentArr = this.mods[category];
            } else {
                currentArr = [];
                let keys = Object.keys(this.mods);
                for (let i; i < keys; i++) {
                    currentArr = currentArr.concat(this.mods[keys[i]]);
                }
            }
            for (let i = 0; i < currentArr.length; i++) {
                if (currentArr[i].name === modName) currentArr[i].purchased = true;
            }
        }
        swapToSecondary() {
            if(this.activeWeapon !== this.secondaryWeapon){
                this.activeWeapon = this.secondaryWeapon;
            }
        }

        swapToPrimary() {
            if(this.activeWeapon !== this.primaryWeapon){
                this.activeWeapon = this.primaryWeapon;
            }
        }

        towerInRange(tower) {
            let distance = Math.sqrt(
                Math.pow(tower.img.position.x - this.position.img.x, 2) +
                Math.pow(tower.img.position.y - this.position.img.y, 2)
            );
            return distance <= this.activeWeapon.range;
        }

        getNearbyTowers() {
            let self = this;
            let arr = [];
            allTowers.forEach(tower => {
                if (tower !== self && self.towerInRange(tower)) {
                    arr.push(tower);
                }
            });
            return arr;
        }

        getNearbyTowersEncapsulated() {
            let self = this;
            let arr = [];
            allTowers.forEach(tower => {
                if (tower !== self && self.towerInRange(tower)) {
                    arr.push({
                        getCurrentTarget: self.getCurrentTarget.bind(tower),
                        getEnemies: self.getEnemies.bind(tower),
                        getNearbyTowers: self.getNearbyTowersEncap.bind(tower),
                    })
                }
            });
            return arr;
        }

        evalCodeSnippet() {
            CodeEvalFactory.evalSnippet(this);
            this.on('shoot', this.towerControlFunction); //FIXME
        }

        addKill() {
            this.kills++;
            if (this.kills === 20) this.rank = 2;
            else if (this.kills === 60) this.rank = 3;
        }

        terminate() {
            console.log("Terminate is called");
            console.log("The tower being terminated", this);
            stage.removeChild(this.imgContainer);
            console.log("All towers before splice", allTowers);
            allTowers.splice(allTowers.indexOf(this), 1);
            console.log("All towers after splice", allTowers);
            let removalIndex;
            savedTowers.forEach((tower, index) => {
                if (tower.x === this.position.x && tower.y === this.position.y) {
                    removalIndex = index;
                }
            })
            savedTowers.splice(removalIndex, 1);
        }

        detectEnemy() { //FIXME: should have a better name

            for (let i = EnemyFactory.enemies.length - 1; i >= 0; i--) {
                if (this.isEnemyInRange(EnemyFactory.enemies[i])) {
                    this.target = EnemyFactory.enemies[i];
                    return true;
                }
            }
        }

        isEnemyInRange(enemy) {
            return ((Math.pow(enemy.position.x - this.img.position.x, 2) + Math.pow(enemy.position.y - this.img.position.y, 2) <= Math.pow(this.activeWeapon.range, 2)));
        }

        update(delta) {
            this.mods.abilities.forEach(ability => {
                ability.coolDownTimer.decrementCoolDown(delta)
            });
            //if (this.towerControlFunction) this.towerControlFunction();
            if (!this.target) {
                this.detectEnemy();
                this.img.stop();
            }
            if (this.target) {
                this.shootAttempt(this.target);
            }
        }
        shootAttempt(enemy) {
           if (!this.reloading) {
                this.emit('shoot', enemy);
                if (!this.isEnemyInRange(this.target)) this.target = null;
                if(this.target) {
                    //this.shotEnemy = this.target.enemyEncapsulated;
                    this.reloading = true;
                    StateFactory.setTimeout2(() => {
                        this.reloading = false;
                    }, this.activeWeapon.reloadTime);
                    this.activeWeapon.shoot(this.target);
                }
            }
        }
    }

    class IceTower extends Tower {
        constructor(x, y) {
            super(x, y, {
                img: '4',
                price: 50,
                // range: 200,
                primaryWeaponConstructor: WeaponFactory.IceWeapon,
                secondaryWeaponConstructor: WeaponFactory.ColdWeapon,
                ultimateWeaponConstructor: WeaponFactory.BlizzardWeapon,
                name: "Ice",
                effect: 'Fill in'
            });
        }
    }

    class FireTower extends Tower {
        constructor(x, y) {
            super(x, y, {
                img: '7',
                price: 50,
                primaryWeaponConstructor: WeaponFactory.FireWeapon,
                secondaryWeaponConstructor: WeaponFactory.FlameWeapon,
                ultimateWeaponConstructor: WeaponFactory.MeteorWeapon,
                name: "Fire",
                effect: 'Fill in'
            });
            this.particleEmitter = new ParticleFactory.createEmitter('flame', stage);
            this.particleEmitter.updateOwnerPos(this.img.position.x, this.img.position.y);
        }

        update(delta){
            super.update(delta);
            if(this.target && this.activeWeapon.name === 'flame'){
                this.particleEmitter.emit = true;
            }else{
                this.particleEmitter.emit = false;
                // if(this.activeWeapon.circles) this.activeWeapon.circles.forEach(function(circle){
                //     stage.removeChild(circle);
                // });
            }
            this.particleEmitter.update(delta);
        }
    }

    class ThunderTower extends Tower {
        constructor(x, y) {
            super(x, y, {
                img: '5',
                price: 50,
                range: 800,
                primaryWeaponConstructor: WeaponFactory.ThunderWeapon,
                secondaryWeaponConstructor: WeaponFactory.ZapWeapon,
                ultimateWeaponConstructor: WeaponFactory.LightningWeapon,
                name: "Thunder",
                effect: 'Fill in'
            });
        }
    }

    class PoisonTower extends Tower {
        constructor(x, y) {
            super(x, y, {
                img: '6',
                price: 50,
                range: 400,
                primaryWeaponConstructor: WeaponFactory.PoisonWeapon,
                ultimateWeaponConstructor: WeaponFactory.ToxicWeapon,
                secondaryWeaponConstructor: WeaponFactory.GasWeapon,
                name: "Poison",
                effect: 'Fill in'
            });
        }

        update(delta){
            super.update(delta);
            if(this.particleEmitter){
                if(this.target && this.particleEmitter.particleImages) {
                    this.particleEmitter.update(delta);
                }
                if(!this.target){
                    this.particleEmitter.destroy();
                    this.particleEmittter = null;
                }
            }
        }

        // swapToPrimary() {
        //     this.activeWeapon = this.weaponArmory.primary;
        // }

        // swapToSecondary() {
        //     this.activeWeapon = this.weaponArmory.secondary;
        // }

        shootAttempt(enemy) {
            super.shootAttempt(enemy);
        }
    }

    class GasTower extends Tower {
        constructor(x, y) {
            super(x, y, {
                img: '6',
                power: .1,
                price: 50,
                reloadTime: 3000,
                range: 100,
                name: 'Gas',
                effect: 'Fill in'
            });
        }

        shootAttempt(enemy) {
            super.shootAttempt(enemy);
        }

        update(delta){
            super.update(delta);
            if(this.particleEmitter){
                this.particleEmitter.update(delta);
            }
        }
    }


    let towers = {IceTower, ThunderTower, FireTower, PoisonTower};

    function createTower(x, y, name) {
        let towerConstructor = towers[name];
        let newTower = new towerConstructor(x, y);
        let currentGridNode = StateFactory.map.grid[y][x];
        allTowers.push(newTower);
        savedTowers.push({name: name, x: x, y: y});
        currentGridNode.contains.tower = newTower;
        console.log("allTower length", allTowers.length)
        return newTower;
    }

    function removeTower(tower) {
        console.log("Tower being removed in removeTower", tower);
        console.log("Length", allTowers.length);
        for (let i = 0; i < allTowers.length; i++) {
            let currentTower = allTowers[i];
            if (currentTower.position.x === tower.position.x && currentTower.position.y === tower.position.y) {
                currentTower.terminate();
                break;
            }
        }
        let currentGridNode = StateFactory.map.grid[tower.position.y][tower.position.x];
        currentGridNode.contains.tower = null;
    }

    let updateAll = (delta) => {
        allTowers.forEach((tower) => {
            if (tower.update) tower.update(delta);
        });

        WeaponFactory.updateLightnings();
    };
    let resetTowers = () => {

        allTowers.length = 0;
        savedTowers.length = 0;

        return allTowers;
    }


    return {
        createTower,
        removeTower,
        towers,
        updateAll,
        savedTowers,
        stage,
        resetTowers,

    };

});
