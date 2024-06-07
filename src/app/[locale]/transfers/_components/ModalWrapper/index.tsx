import EditModal from "./EditModal";
import CreateModal from "./CreateModal";
import Link from "next/link";

const ModalWrapper = ({
  searchParams,
}: {
  searchParams: ISearchParamsProps["searchParams"];
}) => {
  return (
    <>
      {/* CREATE NEW BUTTON */}
      <Link
        className="absolute right-0 mr-[70px] bg-active text-xs text-white text-[10px] font-bold flex flex-row gap-x-4 rounded-[2px] py-2 px-3 items-center justify-center]"
        href={{ query: { ...searchParams, modal: "create" } }}
      >
        CREATE NEW +
      </Link>

      {/* EDIT MODAL (ONCLICK ROW) */}
      {searchParams.modal && searchParams.modal == "edit" && (
        <EditModal searchParams={searchParams} />
      )}

      {/* CREATE MODAL (ONCLICK BUTTON) */}
      {searchParams.modal && searchParams.modal == "create" && (
        <CreateModal searchParams={searchParams} />
      )}

      {/* success create action modal */}
      {/* <Modal
        className="w-[350px]"
        title="Share Transfer Listing Created"
        description="You have successfully created your share transfer listing. You can manage your listing under ‘My Listings’ in the Transfers section."
        // setShowModal={setShowModal}
      >
        <CustomButton
          title="CANCEL"
          className="transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-[white] text-[10px] tracking-[1.5px] px-2 flex font-bold justify-center items-center rounded-[2px]"
        />

        <CustomButton
          title="SAVE CHANGES"
          className="bg-[#FF6C02] w-full py-2 px-2 text-white text-[10px] flex font-bold tracking-[1.5px] justify-center items-center rounded-[2px]"
        />
      </Modal> */}

      {/* <Modal
        className="w-[350px]"
        title="Listing Updated."
        description="You have successfully updated the listing."
        // setShowModal={setShowModal}
      >
        <CustomButton
          title="OK"
          className="bg-[#FF6C02] w-full py-2 px-2 text-white text-[10px] flex font-bold tracking-[1.5px] justify-center items-center rounded-[2px]"
        />
      </Modal> */}

      {/* <Modal
        className="w-[350px]"
        title="Delete Listing?"
        description="Are you sure you want to delete this listing? Any existing requests to purchase this listing will be cancelled and the buyer will be refunded."
        // setShowModal={setShowModal}
      >
        <CustomButton
          title="CANCEL"
          className="transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-[white] text-[10px] tracking-[1.5px] px-2 flex font-bold justify-center items-center rounded-[2px]"
        />

        <CustomButton
          title="CONFIRM"
          className="bg-[#FF6C02] w-full py-2 px-2 text-white text-[10px] flex font-bold tracking-[1.5px] justify-center items-center rounded-[2px]"
        />
      </Modal> */}

      {/* <Modal
        className="w-[350px]"
        title="Listing Deleted."
        description="You have successfully deleted the listing."
        // setShowModal={setShowModal}
      >
        <CustomButton
          title="OK"
          className="bg-[#FF6C02] w-full py-2 px-2 text-white text-[10px] flex font-bold tracking-[1.5px] justify-center items-center rounded-[2px]"
        />
      </Modal> */}
    </>
  );
};

export default ModalWrapper;
