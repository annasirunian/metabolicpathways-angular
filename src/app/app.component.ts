import { Component, OnInit } from "@angular/core";
import { Builder } from "escher-vis";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  ngOnInit() {
    this.embedPathwayMap(null);
    document
      .getElementById("show_demo")
      .addEventListener("click", () => this.handleShowDemo());
  }

  embedPathwayMap(data) {
    Builder(data, null, null, document.getElementById("map_container"), {
      menu: "zoom"
    });
  }

  loadFile(text) {
    let data = JSON.parse(text);
    this.embedPathwayMap(data);
  }

  handleShowDemo() {
    let client = new XMLHttpRequest();
    client.open("GET", "demo.json");
    client.onload = () => this.loadFile(client.responseText);
    client.send();
  }
}
