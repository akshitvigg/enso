interface InputProps {
  placeholder: string;
}

export function Input({ placeholder }: InputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className=" outline-none  bg-green-500"
      />
    </div>
  );
}
