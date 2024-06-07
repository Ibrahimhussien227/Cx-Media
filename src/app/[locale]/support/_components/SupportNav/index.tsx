import NavCard from "@/components/NavCard";
import { SupportNavs } from "./config";

const SupportNav = () => {
  return (
    <div className="flex flex-col w-full">
      {SupportNavs.map((nav) => (
        <NavCard
          key={nav.href}
          title={nav.title}
          description={nav.description}
          href={nav.href}
        />
      ))}
    </div>
  );
};

export default SupportNav;
