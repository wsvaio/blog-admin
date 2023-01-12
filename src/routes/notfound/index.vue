<template>
  <div class="flex flex-wrap min-h-screen text-center justify-center items-center">
    <div class="font-blod w-300px">
      <div class="text-72px mb-20px">404</div>
      <div class="text-30px h-40px">Page Not Found</div>
      <button
        active="scale-90 transform"
        class="rounded-lg transition mt-30px px-20px py-12px text-20px"
        @click="$router.push('/')"
      >
        👉 返回主页
      </button>
    </div>
    <img
      src="@/assets/notFound/32.svg"
      class="mx-10px mt-50px w-700px max-w-full max-h-full"
      alt="page not found"
    />
  </div>
</template>
