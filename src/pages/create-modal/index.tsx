import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useModalQuery } from "@services/modals-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"

import CreateModalHeader from "./components/create-modal-header"
import ModalForm from "./components/modal-form"

const CreateModalPage = () => {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: modal, isLoading, isError } = useModalQuery(Number(id), state?.entity)

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
      <CreateModalHeader title={modal?.title} />
      <ModalForm modal={modal} />
    </div>
  )
}
export default CreateModalPage
