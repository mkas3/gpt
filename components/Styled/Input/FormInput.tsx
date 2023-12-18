import { TextInputProps } from 'react-native';
import { Input } from './index';
import {Control, Controller, FieldValues, RegisterOptions} from 'react-hook-form';

type FormInputProps = TextInputProps & {
  control: Control<any>;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

export const FormInput = ({ control, name, rules, ...otherProps }: FormInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur } }) => (
        <Input
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          {...otherProps}
        />
      )}
    />
  );
};
