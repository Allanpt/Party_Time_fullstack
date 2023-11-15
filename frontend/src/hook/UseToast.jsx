import { toast } from "react-toastify"

function UseToast(msg, status = null) {
  
    if(!status){
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light"
        })
    }else if(status === "error"){
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light"
        })
    }
        
}

export default UseToast