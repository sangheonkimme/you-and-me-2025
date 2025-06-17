import { toast } from 'react-toastify';

export const ToastError = (message) => {
  return toast.error(message, {
    toastId: 1,
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastInfo = (message) => {
  return toast.info(message, {
    toastId: 2,
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
