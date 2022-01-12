import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import React from 'react';
import clsx from 'clsx';

import Text from '@element/Text';

interface IProps {
  label: string;
  maxLength?: number;
  required?: boolean;

  value: string;
  setValue: Dispatch<SetStateAction<string>>;

  className?: string;
  htmlId?: string;
  name: string;
  placeholder?: string;

  textarea?: boolean;
}

const Input = ({ label, name, setValue, value, className, htmlId, maxLength, textarea, placeholder, required }: IProps) => {
  const handleChange = (event: ChangeEvent) => {
    if (event.target instanceof HTMLInputElement) setValue(event.target.value);
  };

  return (
    <label htmlFor={name} className={clsx(['form-control border-b border-beige', className])} id={htmlId}>
      <div className='flex justify-between w-full'>
        <Text small>
          {label.toUpperCase()}
          {required && <span className='text-red-800'> *</span>}
        </Text>

        {maxLength && (
          <Text small>
            {value.length} / {maxLength}
          </Text>
        )}
      </div>

      {textarea ? (
        <textarea
          className='w-full bg-transparent text-beige outline-none py-2 text-base'
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          maxLength={maxLength}
        >
          {value}
        </textarea>
      ) : (
        <input
          type='text'
          className='w-full bg-transparent text-beige outline-none py-2 text-base'
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
      )}
    </label>
  );
};

export default Input;
