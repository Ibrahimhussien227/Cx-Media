import CustomButton from "@/components/CustomButton";
import { ArrowLeft } from "@/utils/icons";

const StepButtons = ({
  step,
  isDirty,
  handleBack,
  handleNext,
}: {
  step: number;
  isDirty: boolean;
  handleBack: () => void;
  handleNext: () => void;
}) => {
  return (
    <>
      <CustomButton
        className={`transition-all delay-100 w-full py-2 bg-[#F5F8FF80] border text-secondary text-[12px] tracking-[1.5px] font-bold ${
          !isDirty && step > 1 && "opacity-50"
        }`}
        onClick={handleBack}
        disabled={!isDirty && step > 1}
      >
        <ArrowLeft size={18} className="inline-block mr-1" /> BACK
      </CustomButton>

      {step == 2 ? (
        <CustomButton
          className={`transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-bold`}
          type="submit"
          disabled={!isDirty}
        >
          CONFIRM
        </CustomButton>
      ) : (
        <div
          className={`flex justify-center transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-bold ${
            isDirty ? "cursor-pointer" : "opacity-50"
          }`}
          onClick={isDirty ? () => handleNext() : () => {}}
        >
          NEXT
        </div>
      )}
    </>
  );
};

export default StepButtons;
