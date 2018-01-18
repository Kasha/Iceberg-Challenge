# Iceberg-Challenge
Navigate a ship from point A to point B in the Northern Ocean with icebergs. The path should be as short as possible and not cross any of the icebergs

The Icebergs Challenge The task Navigate a ship from point A to point B in the Northern Ocean with icebergs. The path should be as short as possible and not cross any of the icebergs (touching an iceberg’s edge or corner is OK). You can assume all coordinates are positive decimals (if you wish) and all polygons are convex. Iceberg Web App

Route Plan for creating start, end points and polygons
Short Path Calculation
Visual display of Shapes and shortest path
2 Route Plan Objects,
Demo with predefined start, end points and polygons.
Route Plan for creating points and polygons Technology ES6 updated code and OO syntax, Angular, Bootstrap, HTML5 Canvas (Java script only)
Install Copy folder as is to your host server (Copy and Play) Structure

Route Plan Class
Create, Add and Manage a collection of Circles and Shapes
Draw Shapes
Calculates Shortest Path

Implementation of graph routes and edges in (JavaScript implementation). Graph with all possible routes and their lengths. Created graph is analyzed using the shortest route algorithm (Dijkstra's algorithm) to calculate the shortest path.

Point Class: Base class with x,y attributes
Shape Class: Base class
Create, Add and Manage a collection of segments
Draw Shape
Circle Class, extends Shape

GraphSearchAlgo Module with shapeCtrl for Setting and Adding Shapes to Route Plan, execute short path method and display data

Graph Edges Algorithm Navigate a ship from point A to point B in the Northern Ocean with icebergs. The path should be as short as possible and not cross any of the icebergs (touching the iceberg is OK). Assumptions: All polygons are convex. The polygons are not overlapping with each other (touching is OK). Algorithm Observation: the shortest route must only go through the start and end points and vertices on the various icebergs. If an iceberg is blocking a possible travel between two points, it is always shorter to go around it to its edge rather than further. Therefore, we first build an undirected graph where each point (start, end and vertices of all the icebergs) is a node. Then, we go through each pair of nodes and figure out if a route between them is possible (not blocked by and iceberg). If the route is clear, we add an edge to the graph between the two nodes and mark its weight as the geometric distance between them. Finally, we have a graph with all possible routes and their lengths. What is left is to use a shortest route algorithm (such as Dijkstra's algorithm) to calculate the shortest path. Screen Cast Video: https://youtu.be/KXuh3wxa5tc Live Demo: http://veeca.me/iceberg/index.html
