<script lang="ts" setup>
import {useAsyncData} from "#app";
import VueQrcode from 'vue-qrcode'
import type {Product} from "~/types/product";

const route = useRoute()
const { data: product, error } = useAsyncData(
    'product-detail',
    () => useApiFetch<Product>(`/products/${route.params.id}`),
)

if (error.value) {
    console.error('[fetchArticleData/SSR] SSR request error', error.value);
    throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
    })
}

const descriptionLabel = 'About';

const sliderContainer = ref(null)

const swiper = useSwiper(sliderContainer)

onMounted(() => {
    // Access Swiper instance
    // Read more about Swiper instance: https://swiperjs.com/swiper-api#methods--properties
    console.log('!!!', swiper.instance)
})
</script>

<template>
    <div :class="$style.ProductDetailPage" class="page container">
        <h2 v-if="product?.title" :class="$style.title">{{product.title}}</h2>

        <div :class="$style.content">
            <div :class="$style.imageWrap">
                <ClientOnly v-if="product?.images?.length && product?.images?.length > 1">
                    <swiper-container ref="sliderContainer">
                        <swiper-slide v-for="(image, index) in product?.images" :key="index">
                            <img
                                :class="$style.image"
                                :src="image"
                                :alt="`${product?.title}-#${index}`"
                            >
                        </swiper-slide>
                    </swiper-container>
                </ClientOnly>

                <img
                    v-else-if="product?.images?.[0]"
                    :class="$style.image"
                    :src="product.images[0]"
                    :alt="product.title"
                >

            </div>

            <div>
                <div v-if="product?.description" :class="$style.descriptionWrap">
                    <div :class="$style.descriptionLabel">
                        {{ descriptionLabel }}
                    </div>

                    <p :class="$style.description">
                        {{ product.description }}
                    </p>
                </div>

                <ClientOnly>
                    <VueQrcode
                        :class="$style.qrcode"
                        :value="route.fullPath"
                        :color="{ dark: '#000000', light: '#ffffff' }"
                        type="image/png"
                    />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.ProductDetailPage {
    //
}

.title {
    margin-bottom: 6.4rem;
    font-size: 8.4rem;
    line-height: 1;
}

.content {
    display: flex;
    gap: 3.2rem;
    align-items: flex-start;
}

.imageWrap {
    height: 70rem;
    width: 70rem;
    overflow: hidden;
    margin-bottom: 7.4rem;
    flex-shrink: 0;
}

.image {
    width: 100%;
    height: 100%;
}

.descriptionLabel {
    margin-bottom: 2.4rem;
    line-height: 1;
}

.description {
    font-size: 2.4rem;
    line-height: 1.24;
}

.qrcode {
    margin-top: 2.4rem;
    width: 30rem;
    height: 30rem;
}
</style>
