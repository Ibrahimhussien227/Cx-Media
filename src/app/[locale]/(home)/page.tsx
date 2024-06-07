// "use client";

// import { useEffect } from "react";

import CustomButton from "@/components/CustomButton";
// import { getSocketConnection } from "@/utils/socket";
import AccordionComponent from "@/components/Accordion";
import StartingCard from "../../../components/StartingCard";
import HeroSection from "@/components/HeroSection";

// let socket;
const Home = () => {
  // const socketInitializer = async () => {
  //   socket = getSocketConnection();
  //   const payload = {
  //     eventName: "test",
  //     eventData: {
  //       value: "test value",
  //     },
  //   }; 
  //   socket.emit("message", payload);
  //   socket.on("test", (data) => {
  //     console.log("data---", data);
  //   });
  // };
  // useEffect(() => {
  //   socketInitializer();
  // }, []);

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll">
      <HeroSection header="This is a hero title for the landing page." />
      <section className="flex w-full  justify-center">
        <div className="flex w-[80%] items-center my-[140px]">
          <StartingCard
            header="For Investors."
            descreption=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              tincidunt, mi sit amet venenatis pellentesque."
            buttonTitle="START INVESTING"
          />

          <StartingCard
            header="For Property Owners."
            descreption=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              tincidunt, mi sit amet venenatis pellentesque."
            buttonTitle="START SELLING"
          />
        </div>
      </section>
      <section className="flex items-center justify-center bg-[#2C3A5C] text-secondary py-10">
        <div className="flex items-center w-full justify-around mx-auto">
          <div>
            <p className="text-white text-[30px] font-minion mb-2 tracking-[0px]">
              Join our WealthHub.
            </p>
            <p className="text-[#D4E4F2] text-[14px] tracking-[0px]">
              Subscribe to our newsletter and get Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit. Integer tincidunt.
            </p>
          </div>
          <div className="flex flex-row justify-between items-center bg-white px-1 py-1 rounded-sm w-[30%]">
            <input
              placeholder="Enter your Email"
              className="text-[#93A0C3] text-[14px] px-[10px]"
            />
            <CustomButton
              disabled={true}
              className="bg-active px-4 py-2 rounded-sm disabled:opacity-50"
            >
              <p className="text-white text-[10px]">JOIN NEWSLETTER</p>
            </CustomButton>
          </div>
        </div>
      </section>
      <HeroSection
        header="This is a hero section for Investors."
        descreption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
        amet venenatis pellentesque."
        bgColor="bg-white"
      />
      <HeroSection
        reverse
        header="This is a hero section for Investors."
        descreption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
        amet venenatis pellentesque."
        bgColor="bg-[#2C3A5C]"
      />
      <section className="flex w-full  justify-center">
        <div className="flex w-[80%] items-center my-[120px] flex-col">
          <div className="flex justify-between items-center w-full p-[20px] pt-0">
            <h1 className="text-[40px] leading-[50px]">
              Frequently asked questions.
            </h1>
            <p className="text-secondary text-[14px] tracking-[0px]">
              For more information, visit our{" "}
              <span className="text-[#FF6C02] text-[14px] tracking-[0px] font-bold">
                Help Center.
              </span>
            </p>
          </div>
          <div className="flex w-full flex-col">
            <AccordionComponent title="This is an example of a frequently asked question?">
              <p className="text-secondary text-[14px] py-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
                amet venenatis pellentesque.
              </p>
            </AccordionComponent>
            <AccordionComponent title="This is an example of a frequently asked question?">
              <p className="text-secondary text-[14px] py-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
                amet venenatis pellentesque.
              </p>
            </AccordionComponent>
            <AccordionComponent title="This is an example of a frequently asked question?">
              <p className="text-secondary text-[14px] py-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
                amet venenatis pellentesque.
              </p>
            </AccordionComponent>
            <AccordionComponent title="This is an example of a frequently asked question?">
              <p className="text-secondary text-[14px] py-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
                amet venenatis pellentesque.
              </p>
            </AccordionComponent>
            <AccordionComponent title="This is an example of a frequently asked question?">
              <p className="text-secondary text-[14px] py-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tincidunt, mi sit amet venenatis pellentesque. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Integer tincidunt, mi sit
                amet venenatis pellentesque.
              </p>
            </AccordionComponent>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
