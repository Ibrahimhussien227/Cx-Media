


const ProgressBar =({percent}:{percent:number})=>{

  return (
    <div className="bg-black border border-[#5A6A93] w-full h-2 rounded-md">
      <div
        className={`h-full bg-gradient-to-l rounded-[8px] ${percent < 50? 'from-[#FF5A5A]': percent < 80? 'from-[#FFBA00]': 'from-[#12EF90]'} from-80%`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;
