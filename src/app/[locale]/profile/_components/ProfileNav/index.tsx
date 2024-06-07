import ProgressBar from "@/components/ProgressBar";
import StatusText from "@/components/StatusText";
import NavCard from "@/components/NavCard";
import { Security } from "@/utils/icons";

const ProfileNavs = ({ applicationStatus }: { applicationStatus: string }) => {
  return (
    <>
      <div className="flex flex-col w-full">
        {/* Verify */}
        <NavCard
          title="Verify your Account."
          description="Complete your KYC to start investing."
          href="/profile"
        >
          <StatusText text={applicationStatus} />
        </NavCard>
        {/* Manage 1*/}
        <NavCard
          title="Manage your Wallet."
          description="Link accounts, deposit & withdraw."
          href="/profile/manage-wallet"
        >
          <p className="text-secondary font-bold text-[12px] tracking-[0px]">
            0.00 AED
          </p>
        </NavCard>
        {/* Manage 2*/}
        <NavCard
          title="Manage your Investment Cap."
          description="Apply now to invest without a cap."
          href="/profile/manage-investment"
        >
          <div className="flex w-full items-center mt-2">
            <p className="text-secondary text-[10px] font-bold mr-[10px] whitespace-nowrap tracking-[0px]">
              10,000 / 50,000 AED
            </p>

            <ProgressBar percent={0} color="orange-prograss-bar" />
          </div>
        </NavCard>
        {/* Configure */}
        <NavCard
          title="Configure Security & Settings."
          description="Customize your experience."
          href="/profile/security-settings"
        >
          <div className="flex w-full items-center justify-start gap-2 mt-2 text-secondary font-bold text-[10px]">
            <Security size={16} />
            <p className="font-bold">2FA NOT SET</p>
          </div>
        </NavCard>
      </div>
    </>
  );
};

export default ProfileNavs;
