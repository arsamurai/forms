import React from "react"
import { ToastContainer as LibToastContainer } from "react-toastify"

const ToastContainer = () => {
  return (
    <LibToastContainer
      className="w-full max-w-[400px] p-2"
      bodyClassName="m-0 p-0 text-base text-t-black"
      toastClassName="flex min-h-12 w-full cursor-pointer items-center justify-between rounded-xl border border-stroke bg-white p-1.5 shadow-shadow-gray"
    />
  )
}

export default ToastContainer
