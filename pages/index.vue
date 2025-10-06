<script lang="ts" setup>
import {useProductsStore} from "~/store/products";
import type {SelectOption} from "~/types/ui";
import type {Category} from "~/types/category";
import UiPagination from "~/components/ui/UiPagination.vue";

const productsStore = useProductsStore();

const pageTitle = 'Catalog';

const filterFormConfig = {
    selector: {
        name: 'category',
        placeholder: 'All categories',
    },
    input: {
        name: 'search',
        placeholder: 'Search',
    }
}

const categoryOptions = computed<SelectOption[]>(() => {
    return productsStore.categories.map((e: Category) => ({
        label: e.name,
        value: e.slug,
    }))
})

const productLink = (id: number) => `/products/${id}`;

onMounted(async () => {
    await Promise.all([
        productsStore.fetchProducts(),
        productsStore.fetchCategories(),
    ]);
});

async function handlePaginate(value: number): Promise<void> {
    await productsStore.fetchProducts(value);
}
</script>

<template>
    <div :class="[$style.MainPage, 'page']">
        <div class="container">
            <div :class="$style.top">
                <h2 :class="$style.title">{{ pageTitle }}</h2>

                <div v-if="categoryOptions.length" :class="$style.filterForm">
                    <UiSelect
                        :model-value="productsStore.categorySlug"
                        :options="categoryOptions"
                        :name="filterFormConfig.selector.name"
                        :placeholder="filterFormConfig.selector.placeholder"
                        @update:model-value="productsStore.setCategorySlug"
                    />

                    <UiInput
                        :class="$style.input"
                        :model-value="productsStore.searchQuery"
                        :name="filterFormConfig.input.name"
                        :placeholder="filterFormConfig.input.placeholder"
                        @update:model-value="productsStore.setSearchQuery"
                    />
                </div>
            </div>

            <template  v-if="productsStore.products.length">
                <div :class="$style.grid">
                    <UiCard
                        v-for="product in productsStore.products"
                        :key="product.id"
                        :title="product.title"
                        :description="product.description"
                        :image="product.thumbnail"
                        :url="productLink(product.id)"
                    />
                </div>

                <UiPagination
                    v-if="productsStore.productsPagesCount > 1"
                    :limit="productsStore.productsPagination.limit"
                    :skip="productsStore.productsPagination.skip"
                    :total-count="productsStore.productsPagination.total"
                    @paginate="handlePaginate"
                />
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>
.MainPage {
    background-color: #FFFFFF;
}

.title {
    margin-bottom: 6.4rem;
    font-size: 8.4rem;
    line-height: 1;
}

.filterForm {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 6.4rem;
}

.input {
    flex-grow: 1;
}

.grid {
    display: grid;
    grid-gap: 6rem 3.2rem;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 6.4rem;
}
</style>
