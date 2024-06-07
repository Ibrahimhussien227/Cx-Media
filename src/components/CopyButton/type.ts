import { IButtonProps } from "../button/types";


export interface ICopyButtonProps extends Omit<IButtonProps, 'onClick' | 'children'> {
  text: string;
}