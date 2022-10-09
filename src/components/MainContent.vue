<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <!-- <div
      class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div> -->
    <div class="container">
      <section class="bg-white p-4 mb-4 rounded-lg">
        <div class="flex">
          <div class="flex-grow max-w-md">
            <label
              for="wallet"
              class="absolute z-10 top-9 left-13 block text-xs font-medium text-gray-700"
              >Тикер</label
            >
            <div class="relative rounded-md shadow-md">
              <input
                type="text"
                name="wallet"
                id="wallet"
                class="block w-full pt-6 pr-10 border border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например DOGE"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          class="inline-flex items-center mt-3 py-3 px-6 border border-transparent shadow-sm text-base leading-4 font-medium rounded text-white bg-purple-800 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Добавить
        </button>
      </section>
      <div class="mt-1 relative rounded-md">
        <img
          class="absolute z-10 top-11 left-15"
          src="../assets/icon-search.svg"
          alt="иконка поиск"
        />
        <input
          type="text"
          name="search"
          class="block w-full max-w-464 pr-10 pl-10 pt-2 pb-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          placeholder="Найти тикер"
        />
      </div>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          class="relative bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        >
          <div class="py-4 px-5">
            <dt class="text-sm font-medium text-gray-700 truncate">ETH</dt>
            <dd class="text-4xl leading-9 font-semibold text-gray-900">
              1.11$
            </dd>
          </div>
          <button
            class="absolute top-18 right-23 z-10 flex items-center justify-center font-medium text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
          >
            <img src="../assets/icon-delete.svg" alt="удалить тикер" />
          </button>
        </div>
        <div
          class="relative bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        >
          <div class="py-4 px-5">
            <dt class="text-sm font-medium text-gray-700 truncate">ETH</dt>
            <dd class="text-4xl leading-9 font-semibold text-gray-900">
              1.11$
            </dd>
          </div>
          <button
            class="absolute top-18 right-23 z-10 flex items-center justify-center font-medium text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
          >
            <img src="../assets/icon-delete.svg" alt="удалить тикер" />
          </button>
        </div>
        <div
          class="relative bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        >
          <div class="py-4 px-5">
            <dt class="text-sm font-medium text-gray-700 truncate">ETH</dt>
            <dd class="text-4xl leading-9 font-semibold text-gray-900">
              1.11$
            </dd>
          </div>
          <button
            class="absolute top-18 right-23 z-10 flex items-center justify-center font-medium text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
          >
            <img src="../assets/icon-delete.svg" alt="удалить тикер" />
          </button>
        </div>
        <div
          class="relative bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        >
          <div class="py-4 px-5">
            <dt class="text-sm font-medium text-gray-700 truncate">ETH</dt>
            <dd class="text-4xl leading-9 font-semibold text-gray-900">
              1.11$
            </dd>
          </div>
          <button
            class="absolute top-18 right-23 z-10 flex items-center justify-center font-medium text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
          >
            <img src="../assets/icon-delete.svg" alt="удалить тикер" />
          </button>
        </div>
      </dl>
      <hr class="w-full border-t border-gray-600 my-4" />
      <section class="relative">
        <div class="flex bg-white p-5 rounded-lg items-end h-64">
          <div class="bg-yellow-500 border w-8 h-24"></div>
          <div class="bg-yellow-500 border w-8 h-32"></div>
          <div class="bg-yellow-500 border w-8 h-48"></div>
          <div class="bg-yellow-500 border w-8 h-16"></div>
        </div>
      </section>
    </div>
  </div>
</template>
<style src="../assets/app.css" scoped></style>
