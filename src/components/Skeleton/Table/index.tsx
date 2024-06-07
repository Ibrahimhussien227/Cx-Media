import Row from "./_components/Row";
import Head from "./_components/Head";

const TableSkeleton = () => {
  return (
    <div className="bg-white w-full py-2 animate-pulse">
      {/* header */}
      <div className="flex flex-row">
        <Head />
        <Head />
        <Head />
        <Head />
        <Head />
        <Head />
      </div>
      {/* body */}
      <div className="flex flex-col mt-2">
        <Row bgColor={"bg-[#F5F8FF]"} />
        <Row bgColor={"bg-white"} />
        <Row bgColor={"bg-[#F5F8FF]"} />
        <Row bgColor={"bg-white"} />
        <Row bgColor={"bg-[#F5F8FF]"} />
        <Row bgColor={"bg-white"} />
        <Row bgColor={"bg-[#F5F8FF]"} />
        <Row bgColor={"bg-white"} />
        <Row bgColor={"bg-[#F5F8FF]"} />
        <Row bgColor={"bg-white"} />
        <Row bgColor={"bg-[#F5F8FF]"} />
        <Row bgColor={"bg-white"} />
      </div>
    </div>
  );
};

export default TableSkeleton;
