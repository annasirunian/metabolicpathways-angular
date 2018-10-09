import { Component } from "@angular/core";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"]
})
export class StatisticsComponent {
  areTablesVisible = false;
  nodeTypes = [];
  genes = [];

  clearStatistics() {
    this.areTablesVisible = true;
    this.nodeTypes = [];
    this.genes = [];
  }

  getStatistics(data) {
    this.clearStatistics();

    // Nodes statistics
    let nodeTypes = {};
    let nodes = Object.values(data[1].nodes);
    for (let node of nodes) {
      let nodeType = node.node_type;
      if (!(nodeType in nodeTypes)) {
        nodeTypes[nodeType] = 0;
      }
      nodeTypes[nodeType]++;
    }
    for (let type of Object.keys(nodeTypes)) {
      this.nodeTypes.push({ type: type, number: nodeTypes[type] });
    }

    // Genes statistics
    let genes = {};
    let reactions = Object.values(data[1].reactions);
    for (let reaction of reactions) {
      for (let geneInReaction of reaction.genes) {
        let gene = geneInReaction.name;
        if (!(gene in genes)) {
          genes[gene] = 0;
        }
        genes[gene]++;
      }
    }

    let geneNames = Object.keys(genes);
    for (let name of geneNames) {
      if (genes[name] <= 1) {
        delete genes[name];
      }
    }
    for (let gene of Object.keys(genes)) {
      this.genes.push({ name: gene, reactions: genes[gene] });
    }
  }
}
