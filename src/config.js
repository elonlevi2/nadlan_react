import { toast } from 'react-toastify';


export const localhost = 'http://localhost:8000/api/'
// export const localhost = 'http://18.194.173.51/django/api/'
export const s3Url = 'https://nadlans3.s3.eu-central-1.amazonaws.com/properties/'

export const notify = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

export const notifyError = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

