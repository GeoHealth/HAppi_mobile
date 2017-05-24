import { ControlValueAccessor } from "@angular/forms";

/**
 * Extends this class to create a component containing a single value supporting two-way binding.
 * It can be included in a parent component and fully support two-way data binding.
 *
 * Credits: http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
 */
export abstract class SingleValueComponent implements ControlValueAccessor {

  /**
   * The internal data model
   */
  private _value: any;

  /**
   * Read the value
   * @returns {any}
   */
  get value(): any {
    return this._value || this.initialValue();
  }

  /**
   * Set the value and call the on change callback
   * @param v
   */
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  /**
   * Set touched on blur
   */
  onTouched() {
    this._onTouchedCallback();
  }

  /**
   * Write the value
   * @param v
   */
  writeValue(v: any) {
    if (v !== this._value) {
      this._value = v;
    }
  }

  /**
   * Register the callback for onChange event
   * @param fn
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * Register the callback for onTouched event
   * @param fn
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  /**
   * Provide the initial value of the component
   */
  protected abstract initialValue(): any;

  /**
   * Placeholder for onChangeCallback. It will be replace by Angular later.
   * @private
   */
  private _onChangeCallback: (_: any) => void = () => {
  };

  /**
   * Placeholder for onChangeCallback. It will be replace by Angular later.
   * @private
   */
  private _onTouchedCallback: () => void = () => {
  };
}
