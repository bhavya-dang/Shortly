<template>
  <div class="flex justify-center items-center h-screen font-mono">
    <div class="text-center w-1/2">
      <h1 class="text-white font-bold text-6xl mb-6">Shortly!</h1>
      <p class="text-sm text-gray-400 font-semibold mb-6">
        Shorten. Simplify. Share.
      </p>
      <div class="flex items-center justify-center gap-x-2">
        <input
          id="urlInput"
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
        class="flex items-center justify-evenly mt-3 bg-[#219e7a] text-white py-3 rounded w-full"
        v-if="shortUrl.length > 0"
      >
        <p class="text-base short-url">{{ shortUrl }}</p>
        <div class="toolbar-btns space-x-3">
          <button
            @click.prevent="copy"
            class="cursor-pointer hover:opacity-75 transition duration-150 ease-in-out"
          >
            <i class="fa-solid fa-copy"></i>
          </button>
          <a
            :href="shortUrl"
            target="_blank"
            class="hover:opacity-75 transition duration-150 ease-in-out"
            ><i class="fa-solid fa-arrow-up-right-from-square"></i
          ></a>
          <button
            @click.prevent="
              {
                // qrgen();
                toggleModal = !toggleModal;
              }
            "
            class="cursor-pointer hover:opacity-75 transition duration-150 ease-in-out"
          >
            <i class="fa-solid fa-qrcode"></i>
          </button>
        </div>
      </div>
      <hr
        class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-1/2 ml-auto mr-auto"
      />
      <div>
        <p class="text-sm text-gray-400 font-semibold mt-6">
          Developed by
          <a
            href="https://github.com/Sync-Codes"
            target="_blank"
            class="text-[#219e7a] hover:underline"
            >Sync</a
          >
          |
          <span class="text-sm text-gray-400 font-semibold mt-6"
            >{{ totalURLS }} URLs Shortened | {{ totalRedirects }} Total
            Redirects</span
          >
        </p>
      </div>
    </div>

    <div
      v-if="toggleModal"
      class="modal-box fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full">
          <button
            @click.prevent="toggleModal = !toggleModal"
            class="absolute top-0 right-0 mt-[0.15rem] mr-1 text-gray-500 hover:text-gray-600 transition duration-150 ease-in-out"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <qrcode-vue
            :value="shortUrl"
            size="300"
            level="H"
            margin="5"
            render-as="svg"
          />
        </div>
      </div>
    </div>
    <div
      v-if="toggleModal"
      class="absolute z-40 inset-0 opacity-95 bg-black"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";

const apiURL = "https://shortly.fly.dev/";
export default {
  name: "Main",
  components: {
    QrcodeVue,
  },
  mounted() {
    this.getStats();
    console.log("Component mounted.");
  },
  data() {
    return {
      url: "",
      output: "",
      shortUrl: "",
      toggleModal: false,
      totalRedirects: 0,
      totalURLS: 0,
    };
  },
  methods: {
    getStats: function () {
      axios
        .get(`${apiURL}stats`)
        .then((response) => {
          console.log(response.data);
          this.totalRedirects = response.data.totalRedirects;
          this.totalURLS = response.data.totalUrls;
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
      if (this.url === "") {
        this.$toast.error(`Please enter a valid URL!`, {
          position: "top-right",
        });
        // Close all opened toast after 3000ms
        setTimeout(this.$toast.clear, 3000);
        return;
      }

      try {
        const response = await axios.post(
          `${apiURL}api/v1/url/shorten`,
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
        this.url = "";
        // console.log(response.data);
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.error(`Something went wrong! Please try again.`, {
            position: "top-right",
          });
          // Close all opened toast after 3000ms
          setTimeout(this.$toast.clear, 3000);
        } else if (error.response.status === 401) {
          this.$toast.error(`Please enter a valid URL!`, {
            position: "top-right",
          });
          // Close all opened toast after 3000ms
          setTimeout(this.$toast.clear, 3000);
        }
        console.log("Error occurred while fetching data:", error.response.data);
      }
    },
  },
};
</script>
