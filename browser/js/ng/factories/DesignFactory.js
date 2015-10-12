
app.factory('DesignFactory', () => {
    let mapGrid1 = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,'H','H','H','UR',0,0,'UL','H','H','H',0,0,0,0,0],
        [0,0,0,0,0,'V',1,1,1,'X','X',1,1,1,'V',0,0,0,0,0],
        [4,0,0,0,0,'V',1,'X',1,'V','V',1,'X',1,'V',0,0,0,0,4],
        [1,0,0,'UL','H','V',1,'V',1,1,1,1,'V',1,'V','H','UR',0,0,1],
        [1,0,0,'V',1,1,1,5,0,1,1,5,0,1,1,1,'V',0,0,1],
        [1,0,0,'V',1,'H','X',5,0,1,1,5,0,'X','H',1,'V',0,0,1],
        [1,0,0,'BL',1,1,1,5,0,1,1,5,0,1,1,1,'BR',0,0,1],
        [1,0,0,0,'UL','V',1,5,0,1,1,5,0,1,'V','UR',0,0,0,1],
        [1,0,0,0,'BL','BR',1,5,0,1,1,5,0,1,'BL','BR',0,0,0,1],
        [1,1,1,1,1,1,1,6,1,1,1,3,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,2,0,6,0,6,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],


    ]; 

    let mapGrid2 = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,4,0,0,0,"UL","H","H","H","H","H","H","UR",0,0,0,4,0,0],
        [1,1,1,0,0,0,"V",1,1,1,1,1,1,"V",0,0,0,1,1,1],
        [1,0,0,0,0,0,"V",1,7,0,7,0,1,"V",0,0,0,0,0,1],
        [1,0,0,0,0,0,"V",1,6,0,2,0,1,"V",0,0,0,0,0,1],
        [1,0,0,0,0,0,"V",1,6,0,2,0,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,"UL","V",1,6,0,2,0,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,"BL","BR",1,6,0,2,0,1,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,6,0,3,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]; 

    let mapGrid3 = [
        [0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,4,0,0],
        [0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0],
        [4,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,0,0,0,1,"UL","H","H","H","H","H","H","H","H","X",1,0,0,0,0],
        [0,0,0,0,1,"V",1,1,1,1,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,0,1,"V",1,"UL","H","H","H","H","H","H","UR",1,0,0,0,0],
        [4,1,1,1,1,"V",1,"V",0,0,0,0,0,0,"V",1,0,0,0,0],
        [0,0,0,0,1,"V",1,"X",0,0,0,0,0,0,"V",1,0,0,0,4],
        [0,0,0,0,1,"V",1,1,0,0,0,0,0,0,"V",1,1,1,1,1],
        [0,0,0,0,1,"BL","X",1,1,1,1,1,0,0,"V",0,0,0,0,0],
        [0,4,1,1,1,1,1,1,0,7,0,1,0,0,"V",0,0,0,0,0],
        [0,6,0,6,0,6,0,6,0,2,0,1,0,6,0,6,0,6,0,0],
        [0,6,0,6,0,6,0,6,0,3,1,1,0,6,0,6,0,6,0,0],

    ];

    let blankMap = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]

    const blankGrid = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]

    return {
        mapGrid1,
        mapGrid2,
        mapGrid3,
        blankMap,
        blankGrid
    }

});