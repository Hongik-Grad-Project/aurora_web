import { toast, ToastOptions, ToastContent } from 'react-toastify';

// Define type for toast notification type
type ToastType = 'error' | 'warning' | 'success';

// Function to push notification with custom styles and icons
export const pushNotification = (msg: string, type: ToastType) => {
  const options: ToastOptions = {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: false,
    closeButton: false,
    className: 'flex justify-center items-center rounded-full shadow-lg bg-[#6A6F7A] text-white',
    // Update the font properties below
    bodyClassName: 'font-pretendard text-18px font-medium leading-27px text-center px-10',  // Custom font styles applied
  };

  // Define toast content
  const content: ToastContent = (
    <div className="flex justify-center items-center w-full">
      <span>{msg}</span>
    </div>
  );

  // Trigger toast notification
  toast(content, options);
};
