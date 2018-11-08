// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';
import {Select} from 'baseui/select';

type Props = {
  multiple?: boolean,
} & MultipleValuesFieldRenderProps;
export default function render({
  input,
  inputProps,
  meta,
  caption,
  multiple,
  label,
  options,
}: Props) {
  const {value, onChange, ...inputRest} = input;
  let selectedOptions;
  if (multiple) {
    selectedOptions = options.filter(option => value.includes(option.id));
  } else {
    selectedOptions = options.filter(option => option.id === value);
  }
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Select
        {...inputRest}
        {...inputProps}
        multiple={multiple}
        selectedOptions={selectedOptions}
        onChange={({selectedOptions}) => {
          if (multiple) {
            onChange(
              Array.isArray(selectedOptions)
                ? selectedOptions.map(option => option.id)
                : undefined
            );
          } else {
            onChange(
              Array.isArray(selectedOptions) && selectedOptions[0]
                ? selectedOptions[0].id
                : undefined
            );
          }
        }}
        options={options}
      />
    </FormControl>
  );
}
