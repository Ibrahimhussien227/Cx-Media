import CopyText from "./_component/CopyText";

const ContactUs = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between items-start px-5 pt-[5px] pb-5 border-b-[1px]">
        <h2 className=" text-[20px] font-MinionPro">Contact Us.</h2>
        <p className="text-secondary text-[12px] tracking-[0]">
          You can send us an email or call our support hotline using the details
          below.
        </p>
      </div>
      <div className="flex flex-col w-[100%] sm:px-[20px] py-[20px]">
        <CopyText title="EMAIL" initialText="support@we.properties" />
        <CopyText title="SUPPORT HOTLINE" initialText="800 837767" />
      </div>
    </div>
  );
};

export default ContactUs;
