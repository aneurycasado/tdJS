app.factory('DesignFactory', function(){
    let mapGrid1 = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,4,0,0,0,"UL","H","H","H","H","H","H","UR",0,0,0,0,0,0],
        [1,1,1,0,0,0,"V",1,1,1,1,1,1,"V",0,0,0,0,0,0],
        [1,0,0,0,0,0,"V",1,7,0,7,0,1,"V",0,0,0,0,0,0],
        [1,0,0,0,0,0,"V",1,6,0,2,0,1,"V",0,0,0,0,0,0],
        [1,0,0,0,0,0,"V",1,6,0,2,0,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,"UL","V",1,6,0,2,0,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,"BL","BR",1,6,0,2,0,1,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,6,0,3,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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

    let mapGrid2a = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,4,0,0,0,"UL","H","H","H","H","H","H","UR",0,0,0,0,0,0],
      [1,1,1,0,0,0,"V",1,1,1,1,1,1,"V",0,0,0,0,0,0],
      [1,0,0,0,0,0,"V",1,7,0,7,0,1,"V",0,0,0,0,0,0],
      [1,0,0,0,0,0,"V",1,6,0,2,0,1,"V",0,0,0,0,0,0],
      [1,0,0,0,0,0,"V",1,6,0,2,0,1,0,0,0,0,0,0,0],
   [1,0,0,0,0,"UL","V",1,6,0,2,0,1,0,0,0,0,0,0,0],
  [1,0,0,0,0,"BL","BR",1,6,0,2,0,1,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,6,0,3,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    ];

    let mapGrid2b = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,"UL","H","H","H","H","H","H","UR",0,0,0,4,0,0],
        [0,0,0,0,0,0,"V",0,0,0,0,0,0,"V",0,0,0,1,1,1],
        [0,0,0,0,0,0,"V",0,7,0,7,0,0,"V",0,0,0,0,0,1],
        [0,0,0,0,0,0,"V",0,6,0,2,0,0,"V",0,0,0,0,0,1],
        [0,0,0,0,0,0,"V",0,6,0,2,0,1,1,1,1,1,1,1,1],
     [0,0,0,0,0,"UL","V",0,6,0,2,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,"BL","BR",0,6,0,2,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,6,0,3,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    ];


    let mapGrid3 = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,4,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,0,0,0,3,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    let mapGrid2Array = [mapGrid2a,mapGrid2b];
    return {
        mapGrid1,
        mapGrid2,
        mapGrid2Array,
    }

});