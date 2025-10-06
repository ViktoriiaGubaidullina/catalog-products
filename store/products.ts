import {defineStore} from 'pinia';
import {reactive} from 'vue';
import type {Product, ProductsResponse} from "~/types/product";
import type {Category} from "~/types/category";

interface ProductsState {
    products: Product[];
    categories: Category[];
    searchQuery: string;
    categorySlug: string | null;
}

export const useProductsStore = defineStore('products', function () {
    const state = reactive<ProductsState>({
        products: [],
        categories: [],
        searchQuery: '',
        categorySlug: null,
    })

    const filteredProducts = computed<Product[]>(() => {
        let result: Product[] = state.products;

        if (state.categorySlug) {
            result = result.filter((e: Product) => e.category === state.categorySlug);
        }

        if (state.searchQuery) {
            result = result.filter((e: Product) => e.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }

        return result;
    })

    function setSearchQuery(value: string): void {
        state.searchQuery = value.trim();
    }

    function setCategorySlug(value: string | null): void {
        state.categorySlug = value;
    }

    async function fetchProducts(): Promise<void> {
        try {
            const response = await useApiFetch<ProductsResponse>('/products');
            state.products = response.products;
        } catch (e) {
            console.error('[useProductsStore/fetchProducts]: ', e);
        }
    }

    async function fetchCategories(): Promise<void> {
        try {
            state.categories = await useApiFetch<Category[]>('/products/categories');
        } catch (e) {
            console.error('[useProductsStore/fetchCategories]: ', e);
        }
    }

    return {
        ...toRefs(state),
        filteredProducts,
        setCategorySlug,
        setSearchQuery,
        fetchProducts,
        fetchCategories,
    }
})
