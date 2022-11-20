import { Block } from 'core';
import './ControlledInput.scss';
import { validateValue, ValidationRule } from 'utils';
import { InputProps } from '../Input/Input';

export type ControlledInputProps = InputProps & {
  label: string;
  validationRule?: ValidationRule;
};

export default class ControlledInput extends Block<ControlledInputProps> {
  static componentName = 'ControlledInput';

  constructor(props: ControlledInputProps) {
    super(props);

    this.setProps({
      ...props,
      onFocus: (event) => this.validate(event),
      onBlur: (event) => this.validate(event),
    });
  }

  validate(event: FocusEvent) {
    if (this.props.validationRule) {
      const input = event.target as HTMLInputElement;
      const { value } = input;
      const errorText = validateValue(this.props.validationRule, value);
      this.refs.error.setProps({ text: errorText });
    }
  }

  render() {
    // language=hbs
    return `
      <div class="form-control">
        <label class="form-control__label" for="{{name}}">{{label}}</label>
        {{{Input
            name=name
            type=type
            value=value
            placeholder=placeholder
            onFocus=onFocus
            onBlur=onBlur
            ref="input"
        }}}
        {{{InputError ref="error"}}}
      </div>
    `;
  }
}
