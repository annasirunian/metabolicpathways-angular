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
    document
      .getElementById("file_selector")
      .addEventListener("change", () => this.handleFileSelect(event));
    document
      .getElementById("theme_selector")
      .addEventListener("change", () => this.handleThemeChange(event));
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
    (<HTMLInputElement>document.getElementById("file_selector")).value = "";
  }

  handleShowDemo() {
    let client = new XMLHttpRequest();
    client.open("GET", "demo.json");
    client.onload = () => this.loadFile(client.responseText);
    client.send();
  }
}
