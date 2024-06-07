
import ReduxProvider from "./redux.provider";

const Provider = ({
  children,

}: {
  children: React.ReactNode;
}) => {
  return (
      <>
        <ReduxProvider>{children}</ReduxProvider>
      </>
  );
};

export default Provider;
