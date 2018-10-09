import { Component, OnInit } from "@angular/core";
import { Builder } from "escher-vis";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  ngOnInit() {
    this.embedPathwayMap(null);
  }

  embedPathwayMap(data) {
    Builder(data, null, null, document.getElementById("map_container"), {
      menu: "zoom"
    });
  }
}
