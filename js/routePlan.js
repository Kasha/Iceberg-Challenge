class TypeEnum
{
 static get EMPTY(){return "empty"}  ;
 static get CIRCLE(){return "circle"}  ;
 static get POLYGON(){return "polygon"}  ;
}

class Point
{
    constructor(x, y) 
    {
        let _x = x;
        let _y = y;
        
        /**Private data member work around */
        this.setX = function(x) 
        { 
            if( typeof(x) == "undefined" )/***Set 0 as default value*/
            {
                x = 0 ;
            }
            else
            {
                if( x < 0 )/**Only positive value is allowed */
                {
                    x *= -1 ;
                }
            }
            _x = x; 
        }
        this.getX = function() { return _x; }
        this.setY = function(y) 
        { 
            if( typeof(y) == "undefined" )/***Set 0 as default value*/
            {
                y = 0 ;
            }
            else
            {
                if( y < 0 )/**Only positive value is allowed */
                {
                    y *= -1 ;
                }
            }
            _y = y; 
        }
        this.getY = function() { return _y; }

        this.setX(x); /**Set value with validation */
        this.setY(y); /**Set value with validation */
    }

    get X () { return this.getX(); }
    set X (x) { this.setX(x); }

    get Y () { return this.getY(); }
    set Y (y) { this.setY(y); }
    
    get object()
    {
        let oPoint = new Object() ;
        oPoint.x = this.X ;
        oPoint.y = this.Y ;
        return oPoint ;
    }

    setData(x,y)
    {
      this.X = x ;
      this.Y = y ;    
    }
}

/*class Circle1 extends Point
{
    constructor(x, y, radius) 
    {
        super(x, y) ;
        let _radius = radius ;
        /**Private data member work around */
  /*      this.setRadius = function(radius) 
        { 
            if( typeof(radius) == "undefined" )/***Set 5 as default value*/
    /*        {
                radius = 5 ;
            }
            else
            {
                if( radius < 0 )/**Only positive value is allowed */
      /*          {
                    radius *= -1 ;
                }
            }

            _radius = radius; 
        }

        this.getRadius = function() { return _radius; }

        this.setRadius(radius); /**Set value with validation */
   /* }

    get Radius () { return this.getRadius(); }
    set Radius (radius) { this.setRadius(radius); }

    setData(x, y, radius)
    {
      this.Radius = radius ;
      super.X = x ;
      super.Y = y ;
    }
}*/

class Shape 
{
    constructor(points, type) 
    {
        let _points = points;
        let _type = type;
        /**Private data member work around */
        this.setPoints = function(points) 
        { 
            if( typeof(points) == "undefined" || points == null )/***Set default Empty array*/
            {
                points = [] ;
            }
            _points = points; 
        }
        this.getPoints = function() { return _points; }
        this.setType = function(type) 
        { 
            if( typeof(type) == "undefined" )/***Set default Empty type value*/
            {
                type = TypeEnum.EMPTY ;
            }
            _type = type; 
        }
        this.getType = function() { return _type; }

        this.setType(type); /**Set value with validation */
        this.setPoints(points); /**Set value with validation */
    }

    get Points () { return this.getPoints(); }
    set Points (points) { this.setPoints(points); }

    get Type () { return this.getType(); }
    set Type (type) { this.setType(type); }

    get Count () { return this.Points.length; }

    setData(points, type)
    {
      this.Points = points ;
      this.Type = type ;    
    }

    reset(points, type)
    {
        this.Points = [] ;
        this.Type = TypeEnum.EMPTY ;       
    }

    addPoint(x, y)
    {
       let oPoints = this.Points ;
       oPoints[oPoints.length] = new Point(x, y) ;
    }

    set Point(point)
    {
        this.addPoint(point.X, point.Y) ;
    }

    concat()
    {
        if( arguments.length == 0 )
        {
            return 0 ;
        }

        let oPoints = this.Points ;
        let nArgCounts = arguments.length ;
        for( let i = 0 ; i < nArgCounts ; i++ )
        {
            let oArgPoints = arguments[i].Points ;
            for( let i1 = 0 ; i1 < oArgPoints.length ; i1++ )
            {
                oPoints[this.Count] = oArgPoints[i1] ;
            }
        }
    }

    get array()
    {
        let oPoinsArr = new Array() ;
        let oPoints = this.Points ;
        let nCount = this.Count ;
        for( let i = 0 ; i < nCount ; i++ )
        {
            let oPoint = new Object() ;
            oPoint.x = oPoints[i].X ;
            oPoint.y = oPoints[i].Y ;
            oPoinsArr[oPoinsArr.length] = oPoint ;
        }
    
        return oPoinsArr;
    }

    get json()
    {
        let oShape = new Object() ;
        let oPoinsArr = new Array() ;
        let oPoints = this.Points ;
        let nCount = this.Count ;
        for( let i = 0 ; i < nCount ; i++ )
        {
            let oPoint = new Object() ;
            oPoint.x = oPoints[i].X ;
            oPoint.y = oPoints[i].Y ;
            
            oPoinsArr[oPoinsArr.length] = oPoint ;
        }
        
        oShape.points = oPoinsArr ;
        oShape.type = this.Type ;

        return oShape;
    }

    get jsonString()
    {
        return JSON.stringify(this.json);
    }
    
    draw(ctx, fillColor)
    { 
        if( typeof(fillColor) == "undefined" )/***Set 5 as default value*/
        {
            fillColor = "#ccddff" ;
        }

        let oPoints = this.Points ;

        ctx.beginPath();
        ctx.moveTo(oPoints[0].X, oPoints[0].Y);
        for( let i=1 ; i < oPoints.length ; i++ )
        {
            ctx.lineTo(oPoints[i].X , oPoints[i].Y) ;
        }
        
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#666666" ;
        
        ctx.closePath();
        ctx.stroke(); 
    }
}

class Circle extends Shape
{
    setData(x, y, radius)
    {
      this.Radius = radius ;
      this.reset() ;
      this.Type = TypeEnum.CIRCLE ;
      this.Point = new Point(x, y) ;
    }

    constructor(x, y, radius) 
    {
        super(null, TypeEnum.CIRCLE) ;
        let _radius = radius ;
        /**Private data member work around */
        this.setRadius = function(radius) 
        { 
            if( typeof(radius) == "undefined" )/***Set 5 as default value*/
            {
                radius = 5 ;
            }
            else
            {
                if( radius < 0 )/**Only positive value is allowed */
                {
                    radius *= -1 ;
                }
            }

            _radius = radius; 
        }

        this.getRadius = function() { return _radius; }

        this.setRadius(radius); /**Set value with validation */
        this.setData(x, y, radius) ;
    }

    get Radius () { return this.getRadius(); }
    set Radius (radius) { this.setRadius(radius); }

    get json()
    {
        let oCircle = super.json ;
        oCircle.radius = this.Radius ;
        return oCircle;
    }
   
    draw(ctx, fillColor)
    { 
        if( typeof(fillColor) == "undefined" )/***Set 5 as default value*/
        {
            fillColor = "#ccddff" ;
        }

        ctx.beginPath();
        ctx.arc(this.Points[0].X, this.Points[0].Y, this.Radius, 0, 2*Math.PI, false);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#666666" ;
        ctx.stroke(); 
    }
}
class RoutePlan
{
    constructor(locationStart, shapes, locationEnd) 
    {
        let _locationStart = locationStart;
        let _locationEnd = locationEnd;
        let _shapes = shapes ;
        /**Private data member work around */
        this.setLocationStart = function(locationStart) 
        { 
            if( typeof(locationStart) == "undefined" || locationStart == null )/***Set default Empty array*/
            {
                locationStart = new Circle(-1, -1, 8);
            }
            _locationStart = locationStart; 
        }
        this.getLocationStart = function() { return _locationStart; }

        this.setLocationEnd = function(locationEnd) 
        { 
            if( typeof(locationEnd) == "undefined" || locationEnd == null )/***Set default Empty array*/
            {
                locationEnd = new Circle(-1, -1, 10) ;
            }
            _locationEnd = locationEnd; 
        }
        this.getLocationEnd = function() { return _locationEnd; }

        this.setShapes = function(shapes) 
        { 
            if( typeof(shapes) == "undefined" || shapes == null )/***Set default Empty array*/
            {
                shapes = [] ;
            }
            _shapes = shapes; 
        }
        this.getShapes= function() { return _shapes; }

        this.setLocationStart(locationStart); /**Set value with validation */
        this.setShapes(shapes); /**Set value with validation */
        this.setLocationEnd(locationEnd); /**Set value with validation */
    }

    get LocationStart () { return this.getLocationStart(); }
    set LocationStart (locationStart) { this.setLocationStart(locationStart); }

    get LocationEnd() { return this.getLocationEnd(); }
    set LocationEnd (locationEnd) { this.setLocationEnd(locationEnd); }

    get Shapes () { return this.getShapes(); }
    set LocationShapes (shapes) { this.setShapes(shapes); }

    addShape(shape)
    {
        if( typeof(shape) != "undefined" && shape != null )/***Set default Empty array*/
        {
            let oShape = this.Shapes ;
            oShape[oShape.length] = shape ;
        }
    }
    
    clearCanvas(canv)
    {
        /**Clear Canvas*/
        ctx = canv.getContext('2d');
        ctx.clearRect(0, 0, canv.width, canv.height);
    }

    draw(ctx)
    {
        /**Draw Shapes */
        this.LocationStart.draw(ctx, "green") ;
        let nCount = this.Shapes.length ;
        if( nCount > 0 )
        {
            for( let i = 0 ; i < nCount ; i++ )
            {
                this.Shapes[i].draw(ctx, "white") ;
            }
        }
        this.LocationEnd.draw(ctx, "red") ;
    }

    drawLine(ctx, oPath)
    {
        for( let i = 0 ; i < oPath.length ; i++ )
        {
            drawLine(ctx, oPath[i], oPath[i+1]) ;
        }
    } 

    checkSegmentInIceberg(u, v, icberg)
    {
        let nCount = icberg.Count ;
        for( let i = 0 ; i < icberg.Count ; i++ )
        {
            let oVertex1 = icberg.Points[i] ;
            let nIndex2 = i+1 ;
            if( i == nCount - 1 )
            {
                nIndex2 = 0 ;
            }
            let oVertex2 = icberg.Points[nIndex2] ;

            /*if( oVertex1.x - oVertex2.x < 0 || oVertex1.y - oVertex2.y )
            {
                oVertex1 = oVertex2.object ;
                oVertex2 = oVertex1.object ;
            }*/

            if( (oVertex1.X == u.x &&  oVertex1.Y == u.y &&
                oVertex2.X == v.x &&  oVertex2.Y == v.y) ||
                (oVertex1.X == v.x &&  oVertex1.Y == v.y &&
                oVertex2.X == u.x &&  oVertex2.Y == u.y))
                {
                    return true ;
                }      
        }
        return false ;
    }
    
    /** 
    Since icebergs are convex, any segment between two non-adjacent
    points on the iceberg are blocked by the iceberg itself.*/
    checkVerticesInInIceberg(u, v, icberg)
    {
        let uVertIn = 0 ;
        let vVertIn = 0 ;

        for( let i = 0 ; i < icberg.Count ; i++ )
        {
            let oVertex = icberg.Points[i] ;
            if( oVertex.X == u.x && oVertex.Y == u.y )
            {
                uVertIn = 1 ;
            }      

            if( oVertex.X == v.x && oVertex.Y == v.y )
            {
                vVertIn = 1 ;
            }
            
            if( uVertIn == 1 && vVertIn == 1 )
            {
                return true ;
            }
        }

        if( uVertIn == 1 && vVertIn == 1 )
        {
            return true ;
        }

        return false ;
    }

    /** The intersection is a list of points and segments.*/
    checkVerticesintersectionInInIceberg(u, v, icberg)
    {
        let nCount = icberg.Count ;
        for( let i = 0 ; i < nCount ; i++ )
        {
            let oVertex1 = icberg.Points[i].object ;

            let nIndex2 = i+1 ;
            if( i == nCount - 1 )
            {
                nIndex2 = 0 ;
            }
           
            let oVertex2 = icberg.Points[nIndex2].object ;

            if( intersect(u, v, oVertex1, oVertex2) )
            { 
                /**If not Intersection point is not the vertex */
                if( !((oVertex1.x == u.x && oVertex1.y == u.y) || 
                    (oVertex1.x == v.x && oVertex1.y == v.y) || 
                    (oVertex2.x == u.x && oVertex2.y == u.y) ||
                    (oVertex2.x == v.x && oVertex2.y == v.y)) 
                    && (u.x != v.x && u.y != v.y )) 
                    {
                        return true ;
                    }
                //alert("also Nice") ;
                //return true ;
            }
            
            if( lineIntersect(u.x, u.y, v.x, v.y, oVertex1.x, oVertex1.y, oVertex2.x, oVertex2.y) == true )
            {
                /**If not Intersection point is not the vertex */
                if( !((oVertex1.x == u.x && oVertex1.y == u.y) || 
                (oVertex1.x == v.x && oVertex1.y == v.y) || 
                (oVertex2.x == u.x && oVertex2.y == u.y) ||
                (oVertex2.x == v.x && oVertex2.y == v.y)) 
                && (u.x != v.x && u.y != v.y ))  
                {
                    return true ;
                }
            }
        }
        return false ;
    }

    shortestPath()
    {
        let oGraph = new Graph();
        let oGraphDictionary = new Array() ; /**Dictionary for Graph Label transaltion into x,y point */
        let oGraphEdges = new Array() ;
        let oGraphEndChild = new Object() ;/**Last graph node fix with previous child*/

        let icebergs = this.Shapes ;
        
        let oLocationStart = this.LocationStart ;
        let oLocationEnd = this.LocationEnd ;
        
        let oEndPoint = oLocationEnd.Points[0] ;
        let sGraphEndLabel = "A" + oEndPoint.X + "" + oEndPoint.Y ;/**Create End Label from End Point x,y */

        let x1 = oLocationStart.X ;
        let y1 = oLocationStart.Y ;

        let x2 = oLocationEnd.X ;
        let y2 = oLocationEnd.Y ;

        let oArrPoints = new Array() ;

        /* Create an array containing start, end points and iceberg shapes vertices.*/
        oArrPoints = oArrPoints.concat(oLocationStart.array) ;
        let nXY = new Array() ;/**Keep Intesection X+Y as String Key, for more the 2 shapes/Icebergs*/

        for( let i = 0 ; i < icebergs.length ; i++ )
        { 
            let icberg = icebergs[i] ;

            let oShapeArr = icberg.array ;
            //oShapeArr.sort(pointSort)  ;
            oArrPoints = oArrPoints.concat(oShapeArr) ;
        }

        oArrPoints = oArrPoints.concat(oLocationEnd.array) ;
        
        let oArrEdges = new Array() ;

        /** For every two nodes on the graph (which are points on the map), we check
        if the segment / route between them is blocked. If not, we add a graph
        edge with the distance as weight.*/
        let oSortArr =  new Iter(oArrPoints).combinations(2).toArray(); ;
        for(let i = 0 ; i < oSortArr.length ; i++ )
        {
            let oArrPoint = oSortArr[i] ;
            let u = oArrPoint[0] ;
            let v = oArrPoint[1] ;

            let nAddEdge = false ;
            for( let i1 = 0 ; i1 < icebergs.length ; i1++ )
            {
                let icberg = icebergs[i1] ;
               
                /** If we try to travel between adjacent points on an iceberg,
                there can't be a collision.  Check Iceberg vertices*/
                if( this.checkSegmentInIceberg(u, v, icberg) == true )
                {
                    nAddEdge = true ;
                    break ;
                }
               
                /** Since icebergs are convex, any segment between two non-adjacent
                points on the iceberg are blocked by the iceberg itself.*/
                if( this.checkVerticesInInIceberg(u, v, icberg) == true )
                {
                    nXY[u.x+""+u.y+""+v.x+""+v.y] = 1 
                    continue ;
                }

                /** Check if any of start, end, icbergs vercites Intersects with Icberg Shapes */
                if(  nXY[u.x+""+u.y+""+v.x+""+v.y] == 1  )
                {
                    continue ;
                }
                if( this.checkVerticesintersectionInInIceberg(u, v, icberg) == true )
                {
                    //alert("Yofi") ;
                    nXY[u.x+""+u.y+""+v.x+""+v.y] = 1 
                    continue ;
                }
            }

            /**If there wasn't any intersection for u,v segment, after checking all icebergs, then add this edge */
            if(  nXY[u.x+""+u.y+""+v.x+""+v.y] != 1  )
            {
                nAddEdge = true ;
            }
            //Add Edge
            if( nAddEdge == true )
            {
                //Add Edge
                
                if( u.x == oEndPoint.X && u.y == oEndPoint.Y )
                {
                    let B = "A"+v.x+""+v.y ;
                    oGraphEndChild[B] = distance(u, v) ;/**Last graph node fix with previous child*/
                }
                else if( v.x == oEndPoint.X && v.y == oEndPoint.Y )
                {
                    let B = "A"+u.x+""+u.y ;
                    oGraphEndChild[B] = distance(u, v) ;/**Last graph node fix with previous child*/
                }

                let oEdge = new Object() ;
                oEdge.u = u ;
                oEdge.v = v ;
                oEdge.distance = distance(u, v) ;
                oArrEdges[oArrEdges.length] = oEdge ;

                let A = "A"+u.x+""+u.y ;
                let B = "A"+v.x+""+v.y ;
                
                let oGraphEdgeItem = oGraphEdges[A] ;
                if( typeof(oGraphEdgeItem) == "undefined" )
                {
                    oGraphEdgeItem = new Object() ;
                    oGraphEdges[A] = oGraphEdgeItem ;
                }
                
                oGraphEdgeItem[B] = oEdge.distance ;
               
                oGraphDictionary[A] = u ;
                oGraphDictionary[B] = v ;
            }
        }

        let start = null ;
        let end = sGraphEndLabel ;
        for( let key in oGraphEdges )
        {
            oGraph.addVertex(key, oGraphEdges[key]) ;
            if( start == null )
            {
                start = key ;
            }
        }

        oGraph.addVertex(end, oGraphEndChild) ;

        let oRes = new Object() ;
        let oPathRes = oGraph.shortestPath( start, end ).reverse() ;
        oRes.path = new Array() ;
        oRes.path[0] = oGraphDictionary[start] ; /**Points Route */
        oRes.distanceRoute = new Array() ;/**Segments sistance calculation */
        for( let i = 0 ; i < oPathRes.length ; i++ )
        {
            oRes.path[oRes.path.length] = oGraphDictionary[oPathRes[i]] ;
        }
        
        for( let i = 0 ; i < oRes.path.length - 1 ; i++ )
        {
            oRes.distanceRoute[oRes.distanceRoute.length] = distance(oRes.path[i], oRes.path[i+1]) ;
        }
        
        //oRes.path = oGraph.shortestPath( start, end ).reverse() ;
        oRes.distance = oGraph.distance ;
        oRes.edges = oArrEdges ;
        return oRes ;
    }

    demo()
    {
        /**Demo 
         * Create Demo Route Plan And Draw start, end points and Iceberg  shapes
         * Calculate shortest path
        */
        let oLocationStart = new Circle(17, 17, 8) ;
        let oLocationEnd = new Circle(483, 483, 10) ;
        
        this.LocationStart = oLocationStart ;
        this.LocationEnd = oLocationEnd ;

        let oShape1 = new Shape(null, TypeEnum.POLYGON) ;
        oShape1.Point = new Point(50,60) ;
        oShape1.Point = new Point(230,145) ;
        oShape1.Point = new Point(180,230) ;
        oShape1.Point = new Point(130,200) ;
        
        let oShape2 = new Shape(null, TypeEnum.POLYGON) ;
        oShape2.Point = new Point(300,300) ;
        oShape2.Point = new Point(420,380) ;
        oShape2.Point = new Point(350,230) ;
        
        let oShape3 = new Shape(null, TypeEnum.POLYGON) ;
        oShape3.Point = new Point(250,165) ;
        oShape3.Point = new Point(280,244) ;
        oShape3.Point = new Point(260,300) ;
        oShape3.Point = new Point(190,400) ;
               
        this.addShape(oShape1) ;
        this.addShape(oShape2) ;
        this.addShape(oShape3) ;
        
        this.draw(ctxDemo) ;
        return this.shortestPath() ;
    }
}