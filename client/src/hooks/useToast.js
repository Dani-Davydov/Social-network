import toast from 'react-hot-toast';

export const useToast = () => {
    return (type, toastName) => {
        switch(type) {
            case 'success':
                toast.success(toastName);
                break
            case 'error':
                toast.error(toastName);
                break
            default:
                toast.success(toastName);
                break
        }
    }
}