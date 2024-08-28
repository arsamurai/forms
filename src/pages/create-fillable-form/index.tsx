import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useFillableFormQuery } from "@services/fillable-forms-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import CreateFillableFormHeader from "./components/create-filable-form-header"
import { FillableForm } from "./components/fillable-form"

const CreateFillableFormPage = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: form, isLoading, isError } = useFillableFormQuery(Number(id), state?.entity)

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
      <CreateFillableFormHeader title={form?.title} />
      <FillableForm form={form} />
    </div>
  )
}
export default CreateFillableFormPage
