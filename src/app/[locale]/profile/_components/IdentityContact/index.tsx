import AccordionComponent from "@/components/Accordion";
import ProfileEditForm from "./profileEditForm";

const IdentityContact = () => {
  return (
    <AccordionComponent title="Identity & Contact" statusText="INCOMPLETE">
      <ProfileEditForm />
    </AccordionComponent>
  );
};

export default IdentityContact;
