
export interface SideNavItemProps {
  title: string;
  to: string;
  Icon: string;
  placeholder?: string;
  navSize: string;
  type?: string;
}

export interface MobileProps {
  onOpen: () => void;
  rest: string;
}

export interface SidebarContentProps {
  onClose: () => void;
  rest: string;
}
