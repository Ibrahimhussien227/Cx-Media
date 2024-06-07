


export interface ICustomSelectProps {
    value?: IOption;
    options: IOption[];
    onSelect: (selectedOp:IOption)=> void;
    className?: string;
    label?: string;
    note?: string;
    placeholder?: string;
}
