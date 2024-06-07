"use client";

import { useSearchParams } from "next/navigation";

import CompanyDetailsForm from "@/app/user-accounts/_comps/Forms/CompanyDetailsForm";
import useGetSellerDetails from "@/hooks/services/seller/getSellerDetails";
import IdentityForm from "./_components/IdentityForm";
import RepresentativeForm from "./_components/RepresentativeForm";

const Profile = () => {
  const searchParams = useSearchParams();
  const { sellerDetails } = useGetSellerDetails(searchParams.get("id")!);

  return (
    <>
      {sellerDetails && (
        <>
          <IdentityForm data={sellerDetails?.identity} />
          <RepresentativeForm data={sellerDetails?.companyRepresentative} />
          <CompanyDetailsForm data={sellerDetails?.companyDetails} />
        </>
      )}
    </>
  );
};

export default Profile;
