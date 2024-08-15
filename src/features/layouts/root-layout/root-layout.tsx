import { Outlet } from "react-router-dom"

import { ScrollToTop } from "./components/scroll-to-top"

const RootLayout = () => (
  <>
    <div className="bg-primary-bg flex min-h-svh flex-col space-y-6 md:space-y-10 xl:space-y-16">
      <main className="container flex flex-1">
        <Outlet />
      </main>
    </div>
    <ScrollToTop />
  </>
)

export default RootLayout
