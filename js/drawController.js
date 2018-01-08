angular.module("GraphSearchAlgo",[])
.controller("shapeCtrl", function($scope, $interval) 
{
  let oRoutePlan = this ;

  $scope.$watch('$viewContentLoaded', function(){
    canv = document.getElementById('board');
    ctx = canv.getContext('2d');
    canvDemo = document.getElementById('boardDemo');
    ctxDemo = canvDemo.getContext('2d'); 

    /**Set Default values */
    
    /**Route Plan data for HTML with default values - Route Plan, with default start and end points*/
    let oLocationStart = new Circle(17, 17, 8) ;
    let oLocationEnd = new Circle(483, 483, 10) ;
    $scope.oRoutePlan = new RoutePlan(oLocationStart, null, oLocationEnd) ; 

    /**Route Plan data for HTML with default values - Demo Route Plan*/
    $scope.oRoutePlanDemo = new RoutePlan() ; 
    /**Demo instruction, set start and end points, set 3 shapes and run findShortPath algo */
    let oRes = $scope.oRoutePlanDemo.demo() ; 
    $scope.data.distanceDemo = oRes.distance ;
    $scope.data.startLocationDemo = $scope.oRoutePlanDemo.LocationStart.jsonString ;
    $scope.data.endLocationDemo = $scope.oRoutePlanDemo.LocationEnd.jsonString ;
    $scope.data.pathPointsDemo = oRes.path ;
    $scope.data.distanceRouteDemo = oRes.distanceRoute ;
    $scope.oRoutePlanDemo.drawLine(ctxDemo, oRes.path) ;

    /**Used to fill shape with added points, when create button is called shape object is reset */
    $scope.data.shape = new Shape(null, TypeEnum.POLYGON) ;
});
 
/**Enable Create Shape Button after 3 points */
$scope.$watchCollection ("[data.points.length]", function( newValue, oldValue ) {
  if($scope.data.points.length > 2) 
  {
    $scope.data.createShapeBtnState = 'Enabled' ;
    $scope.data.createShapeBtnDisabled = false ;
  }
});

  $scope.data = {
  availableOptions: [
    {id: '0', name: 'Demo Route Plan', val:'demo'},
    {id: '1', name: 'Route Plan', val:'route' }
  ],
  selectedOption:{id: '0', name: 'Demo Route Plan', val:'demo'},
  points:[],
  x:'',
  y:'',
  /** Default values for start and end points*/
  startX:10,
  startY:10,
  endX:483,
  endY:483,
  /**Route Plan data for HTML with default values - Demo Route Plan*/
  distanceDemo:'',
  startLocationDemo:'',
  endLocationDemo:'',
  pathPointsDemo:'',
  distanceRouteDemo:'',
  /**Route Plan data for HTML with default values - Route Plan*/
  distance:'',
  startLocation:'',
  endLocation:'',
  pathPoints:'',
  distanceRoute:'',
  /**Used to fill shape with added points, when create button is called shape object is reset */
  shape:null,
  /**Enable Create Shape Button after 3 points */
  createShapeBtnDisabled:true, 
  createShapeBtnState:'Disabled',
  shortPathBtn:'Disabled'
};
  $scope.addData = function() {
    var p = {x: $scope.data.x, y: $scope.data.y};
    $scope.data.points.push(p);
    $scope.data.shape.addPoint($scope.data.x, $scope.data.y) ;
  };

  $scope.findShortPath = function() 
  {
    if( $scope.data.shortPathBtn == "Disabled" )
    {
      alert("You must set start, end points and atleast 1 polygon") ;
      return ;
    }

    let oRes = $scope.oRoutePlan.shortestPath() ;
    $scope.data.distance = oRes.distance ;
    $scope.data.startLocation = $scope.oRoutePlan.LocationStart.jsonString ;
    $scope.data.endLocation = $scope.oRoutePlan.LocationEnd.jsonString ;
    $scope.data.pathPoints = oRes.path ;
    $scope.data.distanceRoute = oRes.distanceRoute ;
    $scope.oRoutePlan.drawLine(ctx, oRes.path) ;
  }

  $scope.setStartLocation = function() 
  {
    /**Create Circle shape from x,y and set RoutePlan with Start Point */
    let oLocationStart = new Circle($scope.data.startX, $scope.data.startY, 8) ;
    $scope.oRoutePlan.LocationStart = oLocationStart ;
    /**Draw Route Plan Shapes */
    $scope.oRoutePlan.clearCanvas(canv) ;
    $scope.oRoutePlan.draw(ctx) ;

    if( $scope.oRoutePlan.Shapes.length > 0 && $scope.oRoutePlan.LocationStart.Points[0].X > 0 && $scope.oRoutePlan.LocationEnd.Points[0].X > 0 )
    {
     $scope.data.shortPathBtn = "Enabled" ;
    }
  }

  
  $scope.setEndLocation = function() 
  {
    /**Create Circle shape from x,y and set RoutePlan with End Point */
    let oLocationEnd = new Circle($scope.data.endX, $scope.data.endY, 11) ;
    $scope.oRoutePlan.LocationEnd = oLocationEnd ;

    /**Clear Canvas and Draw Route Plan Shapes */
    $scope.oRoutePlan.clearCanvas(canv) ;
    $scope.oRoutePlan.draw(ctx) ;

    if( $scope.oRoutePlan.Shapes.length > 0 && $scope.oRoutePlan.LocationStart.Points[0].X > 0 && $scope.oRoutePlan.LocationEnd.Points[0].X > 0 )
    {
      $scope.data.shortPathBtn = "Enabled" ;
    }
  }

  $scope.createShape = function() 
  {
    if( $scope.data.createShapeBtnDisabled == true )
    {
      alert("You must add atleast 3 points") ;
      return ;
    }

     /**Used to fill shape with added points, when create button is called shape object is reset */
     $scope.oRoutePlan.addShape($scope.data.shape) ;

     if( $scope.oRoutePlan.Shapes.length > 0 && $scope.oRoutePlan.LocationStart.Points[0].X > 0 && $scope.oRoutePlan.LocationEnd.Points[0].X > 0 )
     {
      $scope.data.shortPathBtn = "Enabled" ;
     }

     $scope.data.shape = null ;
     $scope.data.shape = new Shape(null, TypeEnum.POLYGON) ;

     /**Clear Canvas and Draw Route Plan Shapes */
     $scope.oRoutePlan.clearCanvas(canv) ;
     $scope.oRoutePlan.draw(ctx) ;

     $scope.data.points = [] ;
     $scope.data.createShapeBtnDisabled = true ;
     $scope.data.createShapeBtnState = 'Disabled' ;
  }
}); 