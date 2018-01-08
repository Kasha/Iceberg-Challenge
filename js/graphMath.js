
  const dijkstra = (graph) => {
    const costs = Object.assign({finish: Infinity}, graph.start);
    const parents = {finish: null};
    for (let child in graph.start) {  // add children of start node
      parents[child] = 'start';
    }
    const processed = [];
    let node = lowestCostNode(costs, processed);
    while (node) {
      let cost = costs[node];
      let children = graph[node];
      for (let n in children) {
        let newCost = cost + children[n];
        if (!costs[n]) {
          costs[n] = newCost;
          parents[n] = node;
        }
        if (costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = lowestCostNode(costs, processed);
    }
    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    
    optimalPath.reverse();  // reverse array to get correct order
    const results = {
      distance: costs.finish,
      path: optimalPath
    };
    return results;
  }; //end of function


  function ccw(A,B,C)
  {
    return (C.y-A.y)*(B.x-A.x) > (B.y-A.y)*(C.x-A.x) ;
  }

  function intersect(A,B,C,D)
  {
    return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D) ;
  }


  /**The intersection of polygon and geometry entity.
     The intersection may be empty and can contain individual Points and
     complete Line Segments. */
function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}
/*
_.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

function intersection(array) 
{
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };*/

  function intersect1(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
  }

function  distance(a,b)
{
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2) ;
}

function is_between(a,c,b)
{
    return distance(a,c) + distance(c,b) == distance(a,b) ;
}

function cmp(x,y)
{
    /*A negative number if x is less than y.
    Zero if x is equal to y.
    A positive number if x is greater than y.*/
    if( x < y )
    {
        return -1 ;
    }

    if( x == y )
    {
        return 0 ;
    }

    return 1 ;
}
function Segment(a,b,c)
{
    return ((b.x - a.x) * (c.y - a.y) == (c.x - a.x) * (b.y - a.y) && 
    Math.abs(cmp(a.x, c.x) + cmp(b.x, c.x)) <= 1 &&
    Math.abs(cmp(a.y, c.y) + cmp(b.y, c.y)) <= 1) ;
}

// A representation of a 2D Point.
function point(label, x, y) {
    
        this.label = label;
        this.x = x;
        this.y = y;
    
        this.distance=function(that) {
            var dX = that.x - this.x;
            var dY = that.y - this.y;
            return Math.sqrt((dX*dX) + (dY*dY));
        }
    
        this.slope=function(that) {
            var dX = that.x - this.x;
            var dY = that.y - this.y;
            return dY / dX;
        }
    
        this.toString=function() {
            return this.label;
        }
    }
    
    // A custom sort function that sorts p1 and p2 based on their slope
    // that is formed from the upper most point from the array of points.
    function pointSort(p1, p2) {
        // Exclude the 'upper' point from the sort (which should come first).
        if(p1 == upper) return -1;
        if(p2 == upper) return 1;
    
        // Find the slopes of 'p1' and 'p2' when a line is 
        // drawn from those points through the 'upper' point.
        var m1 = upper.slope(p1);
        var m2 = upper.slope(p2);
    
        // 'p1' and 'p2' are on the same line towards 'upper'.
        if(m1 == m2) {
            // The point closest to 'upper' will come first.
            return p1.distance(upper) < p2.distance(upper) ? -1 : 1;
        }
    
        // If 'p1' is to the right of 'upper' and 'p2' is the the left.
        if(m1 <= 0 && m2 > 0) return -1;
    
        // If 'p1' is to the left of 'upper' and 'p2' is the the right.
        if(m1 > 0 && m2 <= 0) return 1;
    
        // It seems that both slopes are either positive, or negative.
        return m1 > m2 ? -1 : 1;
    }
    
    // Find the upper most point. In case of a tie, get the left most point.
    function upperLeft(points) {
        var top = points[0];
        for(var i = 1; i < points.length; i++) {
            var temp = points[i];
            if(temp.y > top.y || (temp.y == top.y && temp.x < top.x)) {
                top = temp;
            }
        }
        return top;
    }
    
    const graph = {
        start: {A: 5, B: 2},
        A: {C: 4, D: 2},
        B: {A: 8, D: 7},
        C: {D: 6, finish: 3},
        D: {finish: 1},
        finish: {}
      };
    
      const costs = {
        A: 5,
        B: 2,
        finish: Infinity
      };
      
    const parents = {
        A: 'start', 
        B: 'start', 
        finish: null
      };
    
    const lowestCostNode = (costs, processed) => {
        return Object.keys(costs).reduce((lowest, node) => {
          if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
              lowest = node;
            }
          }
          return lowest;
        }, null);
      };
    
      
    
    /**
     * Basic priority queue implementation. If a better priority queue is wanted/needed,
     * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
     * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
     */
    function PriorityQueue () {
        this._nodes = [];
      
        this.enqueue = function (priority, key) {
          this._nodes.push({key: key, priority: priority });
          this.sort();
        };
        this.dequeue = function () {
          return this._nodes.shift().key;
        };
        this.sort = function () {
          this._nodes.sort(function (a, b) {
            return a.priority - b.priority;
          });
        };
        this.isEmpty = function () {
          return !this._nodes.length;
        };
      }
      
      /**
       * Pathfinding starts here
       */
      function Graph(){
        var INFINITY = 1/0;
        this.vertices = {};
        this.distance = 0 ;
      
        this.addVertex = function(name, edges){
          this.vertices[name] = edges;
        };
      
        this.shortestPath = function (start, finish) {
          var nodes = new PriorityQueue(),
              distances = {},
              previous = {},
              path = [],
              smallest, vertex, neighbor, alt;
      
          for(vertex in this.vertices) {
            if(vertex === start) {
              distances[vertex] = 0;
              nodes.enqueue(0, vertex);
            }
            else {
              distances[vertex] = INFINITY;
              nodes.enqueue(INFINITY, vertex);
            } 
      
            previous[vertex] = null;
          }
      
          while(!nodes.isEmpty()) {
            smallest = nodes.dequeue();
      
            if(smallest === finish) {
              path = [];
      
              while(previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
              }
      
              break;
            }
      
            if(!smallest || distances[smallest] === INFINITY){
              continue;
            }
      
            for(neighbor in this.vertices[smallest]) {
              alt = distances[smallest] + this.vertices[smallest][neighbor];
      
              if(alt < distances[neighbor]) {
                distances[neighbor] = alt;
                this.distance = alt ;
                previous[neighbor] = smallest;
      
                nodes.enqueue(alt, neighbor);
              }
            }
          }
      
          return path;
        };
      }