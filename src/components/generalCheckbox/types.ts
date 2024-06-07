
export interface ICheckboxProps  {
    option: IOption;
    onChange: (op: IOption, isChecked: boolean)=> void;
    isChecked?: boolean;
    className: string;
    disabled?: boolean;
}
