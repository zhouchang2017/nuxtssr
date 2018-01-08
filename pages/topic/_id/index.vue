<template>
    <div>
        <article class="home-mian" role="main">
            <main-swiper-4-pic-banner />
            <div class="home-mian">
                <div class="home-mian-left">
                    <recommend-photographic/>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
  export default {
    layout: 'topic',
    components: {
      'recommend-photographic': () => import('~/components/RecommendPhotographic'),
      'main-swiper-4-pic-banner': () => import('~/components/MainSwiper4PicBanner')
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>