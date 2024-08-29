import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useClearFormQuery } from "@services/clear-forms-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import { ClearForm } from "./components/clear-form"
import CreateClearFormHeader from "./components/create-clear-form-header"

const CreateClearFormPage = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: form, isLoading, isError } = useClearFormQuery(Number(id), state?.entity)

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
      <CreateClearFormHeader title={form?.title} />
      <ClearForm form={form} />
    </div>
  )
}
export default CreateClearFormPage
