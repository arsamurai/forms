import { Link } from "react-router-dom"

import { cn } from "@shared/utils/cn"

import { pageLinks } from "./page-links.constants"

const PagesBlock = () => {
  return (
    <div className="h-fit min-h-[1024px] w-full max-w-[1440px] bg-white px-[70px] py-[136px]">
      {pageLinks.map(link => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            "flex h-40 w-[310px] items-center justify-center rounded-[20px] text-2xl",
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
