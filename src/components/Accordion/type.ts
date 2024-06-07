export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  startExpanded?: boolean;
  statusText?: string;
  type?: string;
}
