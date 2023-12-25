/* eslint-disable react-hooks/exhaustive-deps */

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToaster: any = ({ message, info }: { message: any; info: any }) => {
  /*   useEffect(() => {
    if (info === "error") {
      toast.error(message);
    } else {
      toast.info(message);
    }
  }, []); */

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  );
};

export default CustomToaster;
