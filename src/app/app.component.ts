import { Component, OnInit } from "@angular/core";
import { Builder } from "escher";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  ngOnInit() {
    this.embedPathwayMap(null);
  }

  embedPathwayMap(data) {
    Builder(data, null, null, document.getElementById("map_container"), {
      menu: "zoom",
      enable_editing: false
    });
  }
}
