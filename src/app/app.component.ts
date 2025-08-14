import { ApplicationRef, Component, inject } from "@angular/core";
import { LoggerService } from "./services/logger.service";
import { LoggersInjectionToken } from "./injection tokens/logger.injection-token";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import { PereCdComponent } from "./cd/pere-cd/pere-cd.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NavbarComponent, RouterOutlet, PereCdComponent]
})
export class AppComponent {
  title = 'Starting Advanced Topics';
  ar = inject(ApplicationRef);
  loggers = inject(LoggersInjectionToken);
  constructor() {
    this.loggers.forEach(logger => logger.logger('GTI'))
  }
}
