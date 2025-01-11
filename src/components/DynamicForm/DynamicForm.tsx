import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface InputConfig {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

interface DynamicFormProps {
  inputs: InputConfig[];
  onSubmit: SubmitHandler<any>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ inputs, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {inputs.map((input) => (
        <div key={input.name}>
          <label className="block text-sm font-medium text-gray-700">
            {input.label}
          </label>
          <input
            {...register(input.name, { required: input.required })}
            type={input.type}
            placeholder={input.placeholder}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
