import { ITagCheckboxProps } from "./types"


const TagCheckbox =({isChecked, onClick, tagOption}:ITagCheckboxProps)=>{
  return (
    <span
      onClick={()=> onClick(tagOption)}
      className={`
        font-medium text-[12px] capitalize shrink-0  p-2.5 rounded-[2px]
        cursor-pointer transition border
        ${isChecked? 'bg-[#5A6A93] text-white': 'bg-[#232F4B] text-faint'}`}
    >
      {tagOption.display}
    </span>
  )
}


export default TagCheckbox;