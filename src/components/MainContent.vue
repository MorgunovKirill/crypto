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
                v-model="query"
                type="text"
                name="wallet"
                id="wallet"
                class="block w-full pt-6 pr-10 border border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например DOGE"
                @keypress.enter="addTicker(query)"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          class="inline-flex items-center mt-3 py-3 px-6 border border-transparent shadow-sm text-base leading-4 font-medium rounded text-white bg-purple-800 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          @click="addTicker(query)"
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
          v-model="filter"
          type="text"
          name="search"
          class="block w-full max-w-464 pr-10 pl-10 pt-2 pb-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          placeholder="Найти тикер"
        />
      </div>
      <dl
        v-if="tickers.length"
        class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3"
      >
        <div
          v-for="ticker in filteredList()"
          :key="ticker"
          class="relative bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
          :class="{ 'ticker-picked': pickedTicker === ticker }"
          @click="selectTicker(ticker)"
        >
          <div class="py-4 px-5">
            <dt class="text-sm font-medium text-gray-700 truncate">
              {{ ticker.name }}
            </dt>
            <dd class="text-4xl leading-9 font-semibold text-gray-900">
              {{ ticker.price }} $
            </dd>
          </div>
          <button
            class="absolute top-18 right-23 z-10 flex items-center justify-center font-medium text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            @click.stop="removeTicker(ticker)"
          >
            <img src="../assets/icon-delete.svg" alt="удалить тикер" />
          </button>
        </div>
      </dl>
      <section v-if="pickedTicker" class="relative mt-4">
        <div class="flex bg-white p-5 rounded-lg items-end h-64">
          <div
            v-for="(bar, idx) in normalizeGraph()"
            :key="idx"
            :style="{ height: `${bar}%` }"
            class="bg-yellow-500 border w-8 h-24"
          ></div>
        </div>
      </section>
      <hr class="mt-4" />
      <div class="flex pt-3 justify-between items-center">
        <div class="text-gray-900">Показано 6 результатов из 10</div>
        <div class="flex">
          <button
            v-if="page > 1"
            @click="page = page - 1"
            type="button"
            class="inline-flex items-center mr-4 py-3 px-6 border border-transparent shadow-sm text-gray-900 text-base leading-4 font-medium rounded bg-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Назад
          </button>
          <button
            v-if="hasNextPage"
            @click="page = page + 1"
            type="button"
            class="inline-flex items-center py-3 px-6 border border-transparent shadow-sm text-gray-900 text-base leading-4 font-medium rounded bg-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="../assets/app.css" scoped></style>
<script setup>
import { onMounted, ref, watchEffect } from "vue";

const query = ref("");
const pickedTicker = ref();
const tickers = ref([]);
const graph = ref([]);
const page = ref(1);
const filter = ref("");
const hasNextPage = ref(false);

const addTicker = (val) => {
  if (
    val !== "" &&
    !tickers.value.some((el) => {
      return el.name === val;
    })
  ) {
    const newTicker = { name: val.toUpperCase(), price: "-" };

    tickers.value.push(newTicker);

    localStorage.setItem("cryptolist", JSON.stringify(tickers.value));

    selectTicker(newTicker);

    subscribeToUpdates(newTicker.name);
  }

  query.value = "";
  filter.value = "";
};

const removeTicker = (ticker) => {
  tickers.value = tickers.value.filter((el) => {
    return el.name !== ticker.name;
  });

  if (pickedTicker.value === ticker) {
    pickedTicker.value = null;
  }
};

const filteredList = () => {
  const start = (page.value - 1) * 6;
  const end = page.value * 6;

  const filteredTickers = tickers.value
    .filter((ticker) => ticker.name.includes(filter.value.toUpperCase()))
    .slice(start, end);

  hasNextPage.value = filteredTickers.length >= end;

  return filteredTickers;
};

const subscribeToUpdates = (tickerName) => {
  setInterval(async () => {
    const f = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=91d258e61c3a806be8ce7c2f5c859a5047d6b20fe587ac8d18161dc1eba0f4ee`
    );
    const data = await f.json();

    tickers.value.find((t) => t.name === tickerName).price =
      data.USD > 1 ? data.USD.toFixed(2) : data.USD.toPrecision(2);

    if (pickedTicker?.value?.name === tickerName) {
      graph.value.push(data.USD);
    }
  }, 3000);
};

const normalizeGraph = () => {
  const maxValue = Math.max(...graph.value);
  const minValue = Math.min(...graph.value);
  return graph.value.map(
    (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
  );
};

const selectTicker = (ticker) => {
  pickedTicker.value = ticker;
  graph.value = [];
};

onMounted(() => {
  const tickersData = localStorage.getItem("cryptolist");

  if (tickersData) {
    tickers.value = JSON.parse(tickersData);
    tickers.value.forEach((el) => {
      subscribeToUpdates(el.name);
    });
  }
});

const clearFilter = (val) => {
  if (val) page.value = 1;
};

watchEffect(() => clearFilter(filter.value));
</script>
