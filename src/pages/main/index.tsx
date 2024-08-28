import { PagesBlock } from "./pages-block"

const MainPage = () => {
  return (
    <div className="flex min-h-svh items-center bg-blue-light py-20">
      <div className="container max-w-[2000px]">
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-16 2xl:gap-32">
          <div className="h-fit space-y-5 xl:sticky xl:top-5">
            <div className="font-inter-semibold text-3xl">Пояснение:</div>
            <div className="text-xl">Для создания формы кликните по кнопке справа</div>
          </div>
          <PagesBlock />
        </div>
      </div>
    </div>
  )
}
export default MainPage
