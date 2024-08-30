import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useWebpageQuery } from "@services/webpages-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import CreateWebpageHeader from "./components/create-webpage-header"
import WebpageForm from "./components/webpage-form"

const CreateWebpagePage = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: webpage, isLoading, isError } = useWebpageQuery(Number(id), state?.entity)

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
      <CreateWebpageHeader title={webpage?.title} />
      <WebpageForm webpage={webpage} />
    </div>
  )
}
export default CreateWebpagePage
