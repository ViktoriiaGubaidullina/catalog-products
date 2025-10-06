import {defineStore} from 'pinia';
import {reactive} from 'vue';
import type {Product, ProductsPagination} from "~/types/product";
import type {Category} from "~/types/category";
import type {Pagination} from "~/types/pagination";

interface ProductsState {
    products: Product[];
    productsPagination: Pagination;
    categories: Category[];
    searchQuery: string;
    categorySlug: string | null;
}

export const useProductsStore = defineStore('products', function () {
    const productsPaginationLimit = 24;

    const state = reactive<ProductsState>({
        products: [],
        productsPagination: {
            total: 0,
            skip: 0,
            limit: productsPaginationLimit,
        },
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

    const productsPagesCount = computed(
        () => Number(state.productsPagination.total)
            ? Math.ceil(Number(state.productsPagination.total) / state.productsPagination.limit)
            : 1
    );

    function setSearchQuery(value: string): void {
        state.searchQuery = value.trim();
    }

    function setCategorySlug(value: string | null): void {
        state.categorySlug = value;
    }

    async function fetchProducts(skip: number = 0, limit: number = productsPaginationLimit): Promise<void> {
        try {
            const response = await useApiFetch<ProductsPagination>('/products', {
                query: {
                    skip,
                    limit,
                }
            });
            state.products = response.products;
            state.productsPagination = {
                total: response.total,
                skip: response.skip,
                limit,
            };
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
        productsPagesCount,
        setCategorySlug,
        setSearchQuery,
        fetchProducts,
        fetchCategories,
    }
})
