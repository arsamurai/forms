import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useFillableFormQuery } from "@services/fillable-forms-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import CreateFillableFormHeader from "./components/create-filable-form-header"
import { FillableForm } from "./components/fillable-form"

const CreateFillableForm = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: form, isLoading, isError } = useFillableFormQuery(Number(id), state?.form)

  useEffect(() => {
    if (!state?.form) {
      return
    }
    navigate(pathname, {
      replace: true,
      state: {
        ...state,
        form: null,
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
    <div className="w-full space-y-[76px] py-7">
      <CreateFillableFormHeader title={form?.title} />
      <FillableForm form={form} />
    </div>
  )
}
export default CreateFillableForm
