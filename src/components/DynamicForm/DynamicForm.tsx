// import React from 'react';
// import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// import { Select } from 'antd';

// interface InputConfig {
//   name: string;
//   type: string;
//   label: string;
//   placeholder: string;
//   required?: boolean;
//   options?: { label: string; value: string }[];
// }

// interface DynamicFormProps {
//   inputs: InputConfig[];
//   onSubmit: SubmitHandler<any>;
//   defaultValues?: Record<string, any>;
// }

// const DynamicForm: React.FC<DynamicFormProps> = ({
//   inputs,
//   onSubmit,
//   defaultValues,
// }) => {
//   const { register, handleSubmit, control } = useForm({
//     defaultValues,
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
//       {inputs.map((input) => (
//         <div key={input.name}>
//           <label className="block text-sm font-medium dark:text-[#ECEDEF] text-[#1C2434]">
//             {input.label}
//           </label>
//           {input.type === 'select' ? (
//             <Controller
//               name={input.name}
//               control={control}
//               rules={{ required: input.required }}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   showSearch
//                   placeholder={input.placeholder}
//                   className="w-full"
//                   options={input.options?.map((option) => ({
//                     label: option.label,
//                     value: option.value,
//                   }))}
//                   filterOption={(inputValue, option) => {
//                     return (
//                       option?.label
//                         .toLowerCase()
//                         .includes(inputValue.toLowerCase()) ?? false
//                     );
//                   }}
//                   onChange={(value) => field.onChange(value)}
//                 />
//               )}
//             />
//           ) : (
//             <input
//               {...register(input.name, { required: input.required })}
//               type={input.type}
//               placeholder={input.placeholder}
//               className="bg-white dark:bg-[#24303F] dark:text-white text-gray-900 mt-1 block w-full shadow-sm sm:text-sm border-[1.5px] border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
//             />
//           )}
//         </div>
//       ))}
//       <div className="flex justify-center">
//         <button
//           type="submit"
//           className="mt-6 px-4 py-2 dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default DynamicForm;


import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Select } from 'antd';

interface InputConfig {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface DynamicFormProps {
  inputs: InputConfig[];
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  inputs,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const formValues = watch();

  // Check if all required fields are filled
  const allFieldsFilled = inputs.every(
    (input) => !input.required || (formValues[input.name] && formValues[input.name].trim() !== '')
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
      {inputs.map((input) => (
        <div key={input.name}>
          <label className="block text-sm font-medium dark:text-[#ECEDEF] text-[#1C2434]">
            {input.label}
          </label>
          {input.type === 'select' ? (
            <Controller
              name={input.name}
              control={control}
              rules={{ required: input.required }}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder={input.placeholder}
                  className="w-full"
                  options={input.options?.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  filterOption={(inputValue, option) => {
                    return (
                      option?.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ?? false
                    );
                  }}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          ) : (
            <input
              {...register(input.name, { required: input.required })}
              type={input.type}
              placeholder={input.placeholder}
              className="bg-white dark:bg-[#24303F] dark:text-white text-gray-900 mt-1 block w-full shadow-sm sm:text-sm border-[1.5px] border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          )}
          {errors[input.name] && (
            <p className="dark:text-white text-xs mt-1">
              {input.label} is required.
            </p>
          )}
        </div>
      ))}
      {!allFieldsFilled && (
        <p className="dark:text-white text-xs mt-1">
          Please fill in all required fields before submitting.
        </p>
      )}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!allFieldsFilled || !isValid}
          className={`mt-6 px-4 py-2 ${
            allFieldsFilled && isValid
              ? 'dark:bg-[#3B4ED1] bg-[#3C50E0] hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          } text-white font-semibold rounded-md transition duration-300`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
