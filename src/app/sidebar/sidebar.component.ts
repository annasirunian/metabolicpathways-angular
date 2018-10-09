import { StatisticsComponent } from "./statistics/statistics.component";
import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef
} from "@angular/core";
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

  @ViewChild("fileSelector")
  fileSelector: ElementRef;

  constructor(private http: HttpClient) {}

  isErrorVisible = false;
  theme = "default_theme";

  embedPathwayMap(data) {
    this.embedPathwayMapClicked.emit(data);
  }

  loadFile(data) {
    try {
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
    reader.onload = e => {
      try {
        this.loadFile(JSON.parse(e.target["result"]));
      } catch (err) {
        console.error("Unable to parse a JSON file: ", err);
        this.isErrorVisible = true;
      }
    };
    reader.readAsText(file);
    this.fileSelector.nativeElement.value = "";
  }

  handleShowDemo() {
    this.http.get("assets/demo.json").subscribe(data => this.loadFile(data));
  }
}
