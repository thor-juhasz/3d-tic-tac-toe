<template>
    <button><slot /></button>
</template>

<style scoped>
button {
    @apply inline-block rounded-md px-3 py-2 font-bold text-xl text-white shadow-md;
    @apply transition duration-150 bg-white/10 hover:bg-white/20 shadow-white/10 hover:shadow-white/20;
}
</style>
