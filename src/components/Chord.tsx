import FlexInput from "./FlexInput";

export default function Chord({
  defaultValue,
  setValue,
  ...props
}: Readonly<
  {
    defaultValue: string;
    setValue: (value: string) => void;
  } & React.ComponentProps<typeof FlexInput>
>) {
  return (
    <div>
      <div className="mb-1 pl-1 text-primary text-lg border-primary border-b-2"></div>
      <FlexInput
        className="w-0 p-1 rounded-md bg-transparent placeholder-placeholder"
        defaultValue={defaultValue}
        placeholder="%"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        {...props}
      />
    </div>
  );
}
