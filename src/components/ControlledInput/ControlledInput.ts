import { Block } from 'core';
import './ControlledInput.pcss';
import { validateValue, ValidationRule } from 'utils/validator';

type ControlledInputProps = {
  label: string;
  validationRule?: ValidationRule;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
};

export default class ControlledInput extends Block<ControlledInputProps> {
  static componentName = 'ControlledInput';

  constructor(props: ControlledInputProps) {
    super(props);

    this.setProps({
      ...props,
      onFocus: this.validate,
      onBlur: this.validate,
    });
  }

  validate = (event: FocusEvent) => {
    if (this.props.validationRule) {
      const input = event.target as HTMLInputElement;
      const { value } = input;
      const errorText = validateValue(this.props.validationRule, value);
      this.refs.error.setProps({ text: errorText });
    }
  };

  render() {
    // language=hbs
    return `
      <div class="form-control">
        <label class="form-control__label" for="{{name}}">{{label}}</label>
        {{{Input
            name=name
            type=type
            value=value
            onFocus=onFocus
            onBlur=onBlur
            ref="input"
        }}}
        {{{InputError ref="error"}}}
      </div>
    `;
  }
}
