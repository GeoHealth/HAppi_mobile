import {Component, forwardRef} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {SingleValueComponent} from "./single_value_component";

@Component({
  selector: 'factor-pain-intensity',
  template: `
            <ion-item>
              <ion-label>Pain intensity: {{value}}</ion-label>
              <ion-range min="1" max="10" pin="true" [(ngModel)]="value" ngDefaultControl>
                <ion-icon range-left small name="sad"></ion-icon>
                <ion-icon range-right name="sad"></ion-icon>
              </ion-range>
            </ion-item>
            `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FactorPainIntensityComponent),
    multi: true
  }]
})
export class FactorPainIntensityComponent extends SingleValueComponent {
  protected initialValue(): any {
    return 1;
  }
}
