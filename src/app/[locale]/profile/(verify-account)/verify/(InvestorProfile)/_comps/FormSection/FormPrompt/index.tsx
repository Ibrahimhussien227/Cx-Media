import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FormPrompt = ({
  hasUnsavedChanges,
  message,
}: {
  hasUnsavedChanges: boolean;
  message: string;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
    };

    const originalPush = router.push;
    const originalReplace = router.replace;

    window.addEventListener("beforeunload", onBeforeUnload);

    router.push = async (href, options) => {
      if (!window.confirm(message)) {
        throw "Route change was aborted.";
      }
      return originalPush(href, options);
    };

    router.replace = async (href, options) => {
      if (!window.confirm(message)) {
        throw "Route change was aborted.";
      }
      return originalReplace(href, options);
    };

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [hasUnsavedChanges, message, router]);
  return <></>;
};

export default FormPrompt;
