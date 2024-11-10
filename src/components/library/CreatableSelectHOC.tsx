import { SelectOption } from '@/pages';
import { GroupBase } from 'react-select';
import React, { RefAttributes } from 'react';
import CreatableSelect, { CreatableProps } from 'react-select/creatable';
import Select from 'react-select/dist/declarations/src/Select';

export const CreatableSelectHOC: React.FC<
  CreatableProps<SelectOption, false, GroupBase<SelectOption>> &
    RefAttributes<Select<SelectOption, false, GroupBase<SelectOption>>>
> = (props) => {
  return (
    <CreatableSelect
      {...props}
      unstyled
      classNames={{
        container: () => 'w-full border-b border-black',
        menuList: () => 'bg-1-12 my-1 py-1 divide-y-2 divide-black rounded',
        option: () => 'p-2 hover:bg-white',
        dropdownIndicator: () => 'mx-2',
      }}
      isSearchable
    />
  );
};
