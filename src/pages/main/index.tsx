import { PagesBlock } from "./pages-block"

const MainPage = () => {
  return (
    <div className="flex min-h-svh items-center bg-blue-light py-20">
      <div className="container max-w-[2000px]">
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-16 2xl:gap-32">
          <div className="h-fit w-full space-y-5 xl:sticky xl:top-5 xl:max-w-[416px]">
            <div className="font-inter-semibold text-3xl">Пояснение:</div>
            <p className="text-xl">
              При натисканні на будь-яку кнопку головного меню користувач переходить до загального
              списку обраної категорії. Наприклад, при натисканні на кнопку Сторінки користувач
              переходить на список сторінок, які можна видалити або редагувати тощо.
            </p>
            <p className="text-xl">
              Зі сторінки списку користувач може перейти на сторінку редагування, натиснувши іконку
              редагування на одному із пунктів списку
            </p>
          </div>
          <PagesBlock />
        </div>
      </div>
    </div>
  )
}
export default MainPage
