import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useOffcanvasQuery } from "@services/offcanvas-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import CreateOffcanvasHeader from "./components/create-offcanvas-header"
import OffcanvasForm from "./components/offcanvas-form"

const CreateOffcanvasPage = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: offcanvas, isLoading, isError } = useOffcanvasQuery(Number(id), state?.entity)

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
    <div className="w-full space-y-10 pb-14 pt-7">
      <CreateOffcanvasHeader title={offcanvas?.title} />
      <OffcanvasForm offcanvas={offcanvas} />
    </div>
  )
}
export default CreateOffcanvasPage
