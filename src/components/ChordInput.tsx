import Scale from "@/models/Scale";
import FlexInput from "./FlexInput";

export default function ChordInput({
  defaultValue,
  scales,
  setValue,
  ...props
}: Readonly<
  {
    defaultValue: string;
    scales: Scale[];
    setValue: (value: string) => void;
  } & React.ComponentProps<typeof FlexInput>
>) {
  return (
    <div>
      <div className="mt-2 mb-1 pl-1 h-4 text-primary text-xs border-primary border-b-2">
        {scales.map((scale) => scale.name).join(" | ")}
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
          input.value = input.value.replace("#", "♯").replace("b", "♭");
        }}
        {...props}
      />
    </div>
  );
}
