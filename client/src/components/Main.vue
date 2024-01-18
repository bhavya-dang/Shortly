<template>
  <div class="flex justify-center items-center h-screen font-mono">
    <div class="text-center">
      <h1 class="text-white font-bold text-6xl mb-6">Shortly!</h1>
      <p class="text-sm text-gray-400 font-semibold mb-6">
        Shorten. Simplify. Share.
      </p>
      <div class="flex items-center justify-center gap-x-2">
        <input
          type="text"
          v-model="url"
          placeholder="Enter a valid URL!"
          class="w-full py-2 px-4 mb-4 rounded border border-gray-300"
          @keyup.enter="postData"
        />
        <button
          id="submitBtn"
          @click="postData"
          class="bg-[#219e7a] text-white py-2 px-4 mb-4 rounded hover:bg-[#46c8a3] transition duration-300 ease-in-out"
        >
          Shorten
        </button>
      </div>
      <div
        class="flex items-center justify-center space-x-2 mt-3 bg-[#219e7a] text-white py-3 rounded font-inter"
        v-if="shortUrl !== ''"
      >
        <p class="text-base short-url">{{ shortUrl }}</p>
        <button @click.prevent="copy" class="cursor-pointer">
          <i class="fa-solid fa-copy"></i>
        </button>
        <a :href="shortUrl" target="_blank"
          ><i class="fa-solid fa-arrow-up-right-from-square"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Main",
  mounted() {
    console.log("Component mounted.");
  },
  data() {
    return {
      url: "",
      output: "",
      shortUrl: "",
    };
  },
  methods: {
    copy: function () {
      const el = document.querySelector(".short-url");
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();

      // toaster message
      this.$toast.info(`Copied!`, {
        position: "top-right",
      });

      // Close all opened toast after 3000ms
      setTimeout(this.$toast.clear, 3000);
    },
    postData: async function () {
      try {
        const response = await axios.post(
          `api/v1/url/shorten`,
          {
            longUrl: this.url,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
            },
          }
        );
        this.shortUrl = response.data.shortUrl;
        // console.log(response.data);
      } catch (error) {
        console.log("Error occurred while fetching data:", error);
      }
    },
  },
};
</script>
