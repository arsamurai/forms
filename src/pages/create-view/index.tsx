import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useViewQuery } from "@services/view-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import CreateViewHeader from "./components/create-view-header"
import { ViewForm } from "./components/view-form"

const CreateViewPage = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: view, isLoading, isError } = useViewQuery(Number(id), state?.entity)

  useEffect(() => {
    if (!state?.entity) {
      return
    }
    navigate(pathname, {
      replace: true,
      state: {
        ...state,
        entity: null,
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
    <div className="w-full space-y-[76px] pb-14 pt-7">
      <CreateViewHeader title={view?.title} />
      <ViewForm view={view} />
    </div>
  )
}
export default CreateViewPage
