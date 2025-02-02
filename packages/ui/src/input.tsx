interface InputProps {
  placeholder: string;
  reference: HTMLInputElement | any;
}

export function Input({ placeholder, reference }: InputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className=" p-7 outline-none"
        ref={reference}
      />
    </div>
  );
}
