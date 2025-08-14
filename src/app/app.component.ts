import { ApplicationRef, Component, inject } from "@angular/core";
import { LoggerService } from "./services/logger.service";
import { LoggersInjectionToken } from "./injection tokens/logger.injection-token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Starting Advanced Topics';
  ar = inject(ApplicationRef);
  loggers = inject(LoggersInjectionToken);
  constructor() {
    this.loggers.forEach(logger => logger.logger('GTI'))
  }
}
