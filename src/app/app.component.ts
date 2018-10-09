import { Component, OnInit } from "@angular/core";
import { Builder } from "escher-vis";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  nodeTypes = [];
  genes = [];

  ngOnInit() {
    this.embedPathwayMap(null);
  }

  embedPathwayMap(data) {
    Builder(data, null, null, document.getElementById("map_container"), {
      menu: "zoom"
    });
  }

  loadFile(text) {
    try {
      let data = JSON.parse(text);
      this.embedPathwayMap(data);
      this.getStatistics(data);
      document.getElementById("load_error").className = "";
    } catch (err) {
      console.error("Unable to load file: ", err);
      document.getElementById("load_error").className = "visible";
    }
  }

  handleThemeChange(evt) {
    document.getElementById("parent_container").className = evt.target.value;
  }

  handleFileSelect(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();

    reader.onload = e => this.loadFile(e.target.result);

    reader.readAsText(file);
    document.getElementById("file_selector").value = "";
  }

  handleShowDemo() {
    let client = new XMLHttpRequest();
    client.open("GET", "demo.json");
    client.onload = () => this.loadFile(client.responseText);
    client.send();
  }

  clearStatistics() {
    let container = document.getElementById("statistics_container");
    if (container.firstChild.nodeName === "SPAN") {
      container.removeChild(container.firstChild);
    }
    this.nodeTypes = [];
    this.genes = [];
  }

  getStatistics(data) {
    this.clearStatistics();
    document.getElementById("node_statistics").className = "visible";
    document.getElementById("gene_statistics").className = "visible";

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
