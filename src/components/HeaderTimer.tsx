import Select from "./Select";
import Settings from "@/icons/Settings";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTimerStore } from "@/store/timerStore";

export default function HeaderTimer() {
  const { scramble, selectedCube } = useTimerStore();
  const { setSettingsOpen } = useSettingsModalStore();
  return (
    <>
      {/* Selectors category/cube */}
      <div className="flex flex-col items-center justify-center gap-5 p-4">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setSettingsOpen(true)}
            className="w-6 h-6 text-netral-50 hover:text-neutral-200 hover:cursor-pointer"
          >
            <Settings />
          </div>
          <Select />
        </div>

        <div className="text-center font-medium text-2xl h-auto max-h-52 overflow-auto p-2 bg-zinc-900 rounded-md">
          {selectedCube ? scramble : "Pick a Cube to load a scramble."}
        </div>
      </div>
    </>
  );
}
