import FlexInput from "./FlexInput";

export default function ChordInput({
  defaultValue,
  scale,
  setValue,
  ...props
}: Readonly<
  {
    defaultValue: string;
    scale: string;
    setValue: (value: string) => void;
  } & React.ComponentProps<typeof FlexInput>
>) {
  return (
    <div>
      <div className="mt-2 mb-1 pl-1 h-7 text-primary text-lg border-primary border-b-2">
        {scale}
      </div>
      <FlexInput
        className="w-0 p-1 rounded-md bg-transparent placeholder-placeholder"
        defaultValue={defaultValue}
        placeholder="%"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          input.value = input.value
            .replace("#", "♯")
            .replace("b", "♭")
            .replace("M", "Δ");
        }}
        {...props}
      />
    </div>
  );
}
