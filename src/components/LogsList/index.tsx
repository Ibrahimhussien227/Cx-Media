

const LogsList = ({ title, logs, data, className}: ILogsListProps) => {
  return (
    <div className={`border rounded-sm ${className}`}>
      {title && (
        <h3 className="border-b-[0.5px] py-4 px-5 relative before:block before:w-0.5 before:h-2 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-orange before:rounded-sm">
          {title}
        </h3>
      )}
      <ul>
        {logs.map((log) => (
          <li
            key={"log" + log.accessorKey}
            className="flex gap-2 justify-between p-4 first-of-type:mt-3 last-of-type:mb-3"
          >
            <span className="font-medium text-[10px] text-faint tracking-[1.5px] uppercase">
              {log.header}
            </span>
            <hr className="shrink-0 grow border-dotted self-center"/>{/* the dots */}
            <span className="text-[14px] font-extralight self-end">
              {log.formatter?
                log.formatter(data[log.accessorKey as keyof typeof data]) :
                data[log.accessorKey as keyof typeof data]
              }
            </span>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default LogsList;
