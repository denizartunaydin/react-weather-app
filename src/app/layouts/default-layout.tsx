import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <div className="body">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
