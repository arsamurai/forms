import { Suspense } from "react"
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "@shared/ui/toastify"

import { QueryProvider } from "./query"
import { Router } from "./router"
import { SearchProvider } from "./search"

const App = () => {
  return (
    <QueryProvider>
      <Suspense>
        <SearchProvider>
          <ToastContainer />
          <Router />
        </SearchProvider>
      </Suspense>
    </QueryProvider>
  )
}

export default App
