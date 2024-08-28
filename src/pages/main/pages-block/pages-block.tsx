import { Link } from "react-router-dom"

import { cn } from "@shared/utils/cn"

import { pageLinks } from "./page-links.constants"

const PagesBlock = () => {
  return (
    <div className="grid h-fit w-full max-w-[1440px] grid-cols-1 gap-5 bg-white p-10 sm:grid-cols-2 md:grid-cols-3 md:px-[70px] md:py-[136px]">
      {pageLinks.map(link => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            "flex h-40 w-full items-center justify-center rounded-[20px] p-2 text-center text-2xl",
            link.color,
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
export default PagesBlock
