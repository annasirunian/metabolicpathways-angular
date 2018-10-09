import { StatisticsComponent } from "./statistics/statistics.component";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
  @Output()
  embedPathwayMapClicked = new EventEmitter();

  @ViewChild(StatisticsComponent)
  statisticsComponent: StatisticsComponent;

  constructor(private http: HttpClient) {}

  isErrorVisible = false;
  theme = "default_theme";

  embedPathwayMap(data) {
    this.embedPathwayMapClicked.emit(data);
  }

  loadFile(text, toParse) {
    try {
      let data;
      if (toParse) {
        data = JSON.parse(text);
      } else {
        data = text;
      }
      this.embedPathwayMap(data);
      this.statisticsComponent.getStatistics(data);
      this.isErrorVisible = false;
    } catch (err) {
      console.error("Unable to load file: ", err);
      this.isErrorVisible = true;
    }
  }

  handleThemeChange(evt) {
    this.theme = evt.target.value;
  }

  handleFileSelect(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = e => this.loadFile(e.target.result, true);
    reader.readAsText(file);
    document.getElementById("file_selector").value = "";
  }

  handleShowDemo() {
    this.http.get("demo.json").subscribe(data => this.loadFile(data, false));
  }
}
