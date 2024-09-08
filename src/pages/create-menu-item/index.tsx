import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useMenuItemQuery } from "@services/menu-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import CreateMenuItemHeader from "./components/create-menu-item-header"
import MenuItemForm from "./components/menu-item-form"

const CreateMenuItemPage = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: menuItem, isLoading, isError } = useMenuItemQuery(Number(id), state?.menuItem)

  useEffect(() => {
    if (!state?.menuItem) {
      return
    }
    navigate(pathname, {
      replace: true,
      state: {
        ...state,
        menuItem: null,
      },
    })
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="mx-auto mt-32">
        <Loading />
      </div>
    )
  }

  if (isError) {
    return <Navigate to={ROUTES.ROOT.path} replace />
  }

  return (
    <div className="w-full space-y-10 pb-14 pt-7">
      <CreateMenuItemHeader title={menuItem?.title} />
      <MenuItemForm menuItem={menuItem} />
    </div>
  )
}
export default CreateMenuItemPage
