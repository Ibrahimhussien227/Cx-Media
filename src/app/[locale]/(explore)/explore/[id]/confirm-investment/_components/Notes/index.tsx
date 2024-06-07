const Notes = () => {
  return (
    <div className="relative mt-7 mb-10 bg-bot p-2">
      <div className="absolute flex bg-[#FF6C02] h-[15px] w-[2px] top-[33px] left-[-1px]" />
      <div className="py-5 px-3 font-[500] text-[#2C3A5C]">NOTE</div>
      <div className="px-8">
        <ul className="text-[#FF6C02] space-y-3">
          <li>
            <span className="text-secondary">
              This confirmation is an expression of your interest to invest in
              this offering and the requested shares will be issued to you after
              a 48 hour cooling period.
            </span>
          </li>
          <li>
            <span className="text-secondary">
              Shares are allocated on a first come first serve basis and will be
              based on their availability at the end of the cooling period.
            </span>
          </li>
          <li>
            <span className="text-secondary">
              In the event that the requested amount of shares are unavailable
              after the cooling period, you will have the option to refund your
              investment amount.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notes;
