import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import useGastos from "../hooks/useGastos";

const ModalNuevoGasto0 = () => {
  const {
    handleModalGasto0,
    handleModalGasto,
    modalGasto0,
    handleModalMercado,
  } = useGastos();

  const handleMovimiento = (e) => {
    e.preventDefault();
    handleModalGasto0();
    handleModalGasto();
  };

  const handleMercado = (e) => {
    e.preventDefault();
    handleModalGasto0();
    handleModalMercado();
  };

  return (
    <Transition.Root show={modalGasto0} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalGasto0}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleModalGasto0}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="absolute right-8 top-0 hidden pr-4 pt-4 sm:block"></div>
                <div className="mt-3 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
                  {/* Continúa desde el título del diálogo */}
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 text-center uppercase  "
                  >
                    Nuevo Movimiento
                  </Dialog.Title>
                  {/* Contenedor de tarjetas */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Primera tarjeta */}
                    <div
                      className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:cursor-pointer"
                      onClick={(e) => handleMovimiento(e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 14 14"
                        className="h-10 w-10"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M8.351 5.307a1.166 1.166 0 0 0-1.1-.778h-.903a1.041 1.041 0 0 0-.223 2.059l1.375.3a1.167 1.167 0 0 1-.25 2.307h-.777c-.508 0-.94-.324-1.1-.777m1.489-3.889V3.362m0 7V9.196m-4.864 4.302v-2.5h2.5" />
                          <path d="M13.388 5.804a6.5 6.5 0 0 1-11.39 5.35M.612 8.196a6.5 6.5 0 0 1 11.39-5.35" />
                          <path d="M12.002.502v2.5h-2.5" />
                        </g>
                      </svg>
                      <p className="mt-2 text-lg font-semibold text-center">
                        Movimiento (Gasto o Ingreso)
                      </p>
                    </div>
                    {/* Segunda tarjeta */}
                    <div
                      className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-green-700 text-white hover:cursor-pointer"
                      onClick={(e) => handleMercado(e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.04em"
                        height="1em"
                        viewBox="0 0 512 496"
                        className="h-10 w-10"
                      >
                        <path
                          fill="currentColor"
                          d="M448 69H137l-3-12q-5-23-22.5-37.5T70 5H21q-9 0-15 6T0 27q0 9 6 15t15 6h49q19 0 22 17l49 256q6 21 23.5 34t38.5 13h202q10 0 16-6t6-15q0-22-22-22H203q-14 0-20-12l-2-9h214q20 0 36.5-12t22.5-31l58-123v-5q0-27-18.5-45.5T448 69M192 261h-19l-28-149h47zm85 0h-42V112h42zm86 0h-43V112h43zm53-17v2q-3 10-11 13V112h43q18 0 21 17zM256 432q0 18-12.5 30.5T213 475q-17 0-29.5-12.5T171 432t12.5-30.5T213 389q18 0 30.5 12.5T256 432m171 0q0 18-12.5 30.5T384 475t-30.5-12.5T341 432t12.5-30.5T384 389t30.5 12.5T427 432"
                        />
                      </svg>
                      <p className="mt-2 text-lg font-semibold">Supermercado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNuevoGasto0;
