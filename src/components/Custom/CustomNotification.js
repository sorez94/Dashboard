import {toast} from "react-toastify";

class CustomNotification {
    toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        rtl: true,
        bodyClassName: "toast-body"
    }

    showToastSuccess(content, config = {}) {
        toast.success(content, {...this.toastConfig, ...config});
    }

    showToastInfo(content, config = {}) {
        toast.info(content, {...this.toastConfig, ...config});
    }

    showToastWarning(content, config = {}) {
        toast.warning(content, {...this.toastConfig, ...config});
    }

    showToastError(content, config = {}) {
        toast.error(content, {...this.toastConfig, ...config});
    }
}

const instance = new CustomNotification();
export default instance;
