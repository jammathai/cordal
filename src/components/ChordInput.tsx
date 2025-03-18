import Scale from "@/models/Scale";
import FlexInput from "./FlexInput";

const TEXT_COLORS = [
  "text-red-900",
  "text-blue-900",
  "text-yellow-900",
  "text-violet-900",
  "text-green-900",
  "text-pink-900",
  "text-cyan-900",
  "text-orange-900",
  "text-indigo-900",
  "text-lime-900",
  "text-fuchsia-900",
  "text-teal-900",
];

const BORDER_COLORS = [
  "border-red-900",
  "border-blue-900",
  "border-yellow-900",
  "border-violet-900",
  "border-green-900",
  "border-pink-900",
  "border-cyan-900",
  "border-orange-900",
  "border-indigo-900",
  "border-lime-900",
  "border-fuchsia-900",
  "border-teal-900",
];

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
      {scales.map((scale) => (
        <div
          className={`pl-1 ${TEXT_COLORS[scale.notes[0]]} text-sm ${
            BORDER_COLORS[scale.notes[0]]
          } border-t-2`}
        >
          {scale.name}
        </div>
      ))}
    </div>
  );
}
