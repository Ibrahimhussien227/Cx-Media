import React, { useState, useRef } from "react";
import { DotsThreeVertical } from "@/utils/icons";
import useClickOutside from "../../hooks/useClickOutside";

interface IAction {
  title: string;
  clickHandler: () => void;
}

interface IActionsMenuProps {
  actions: IAction[];}

const ActionsMenu: React.FC<IActionsMenuProps> = ({ actions }) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ulRef = useRef(null);

  useClickOutside(ulRef, () => setIsMenuOpen(false));

  const handleOpenClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <DotsThreeVertical
        className="ml-[20px]"
        onClick={handleOpenClick}
        size={24}
        color="#ffffff"
      />
      {isMenuOpen && (      
          <ul
            ref={ulRef}
            className="absolute right-[5px] bottom-[0] bg-[#232F4B] border rounded-[2px] text-[#93A0C3] text-[12px] px-[10px] "
          >
            {actions.map((action, index) => (
              <li key={index} onClick={action.clickHandler} className="py-[5px]">
                {action.title}
              </li>
            ))}
          </ul>      
      )}
    </>
  );
};

export default ActionsMenu;

