

class Graph {
    constructor() {
      this.vertices = {}; 
    }
    //Method to add the vertex
    addVertex(value) {
      if (!this.vertices[value]) {
        this.vertices[value] = [];
      }
    }
    //Method to add the edge between the vertices
    addEdge(vertex1, vertex2) {
      if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
        console.log("This vertex does not exist.");
      }
  
      if (!this.vertices[vertex1].includes(vertex2)) {
        this.vertices[vertex1].push(vertex2);
      }
      if (!this.vertices[vertex2].includes(vertex1)) {
        this.vertices[vertex2].push(vertex1);
      }
    }
    //Shortest road from vertex to vertex.
    bfs2(startVertex) {
        let list = this.vertices; 
        let queue = [startVertex];
        let visited = { [startVertex]: 1 }; 
        
        // кратчайшее расстояние от стартовой вершины
        let distance = { [startVertex]: 0 }; 
        // предыдущая вершина в цепочке
        let previous = { [startVertex]: null };
    
        function handleVertex(vertex) {
          let neighboursList = [list.vertex];
         
    
          neighboursList.forEach(neighbour => {
            if (neighboursList == undefined && !visited[neighbour]) {
              visited[neighbour] = 1;
              queue.push(neighbour);
              // сохраняем предыдущую вершину
              previous[neighbour] = vertex;
              // сохраняем расстояние 
              distance[neighbour] = distance[vertex] + 1;
            }
            
          });
        }
    
        // перебираем вершины из очереди, пока она не опустеет
        while(queue.length) {
          let activeVertex = queue.shift();
          handleVertex(activeVertex);
        }
        
        return { distance, previous }
    }

    findShortestPath(startVertex, finishVertex) {
        let result = this.bfs2(startVertex);
    
        if (!(finishVertex in result.previous)) 
        throw new Error(`There is no path from ${startVertex} to vertex ${finishVertex}`);
            
        let path = [];
        
        let currentVertex = finishVertex;
        
        while(currentVertex !== startVertex) {
          path.unshift(currentVertex);
          currentVertex = result.previous[currentVertex];
        }
        
        path.unshift(startVertex);
        
        return path;
    }
    
    
  
    
    

    
}

let graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');

graph.addEdge('A', 'B');
graph.addEdge('B', 'F');
graph.addEdge('F', 'G');
graph.addEdge('A', 'C');
graph.addEdge('C', 'D');
graph.addEdge('D', 'F');
graph.addEdge('C', 'E');
graph.addEdge('E', 'F');



let answers = graph.bfs2('А');
graph.findShortestPath('A', 'G');
graph.findShortestPath('B', 'F');
console.log(graph);
//graph.findShortestPath('A', 'G');
