interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

function Input ({id, onChange, value, label, type}: InputProps) {
  return (
    <div className="relative">
      <input 
        className="
          block 
          w-full 
          px-6 pt-6 pb-1 
          text-base
          text-white 
          bg-neutral-700 
          appearance-none 
          rounded-md
          peer
        "
        id={id}
        name={id}
        type={type ? type : 'text'}
        onChange={onChange}
        value={value}
        placeholder=" "
      />
      <label 
        className="
          absolute
          top-4
          left-6
          z-10
          text-base
          text-zinc-400
          duration-500
          transform
          -translate-y-3
          scale-75
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
        "
        htmlFor={id}>
          {label}
        </label>
    </div>
  );
}

export default Input;