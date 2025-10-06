<script setup lang="ts">
interface CardProps {
    image: string;
    title: string;
    description: string;
    url: string;
}

defineProps<CardProps>();

const linkLabel = 'View details';
</script>

<template>
    <div :class="$style.UiCard">
        <div :class="$style.content">
            <div :class="$style.imageWrap">
                <img
                    :class="$style.image"
                    :src="image"
                    :alt="title"
                >
            </div>

            <div :class="$style.title">{{ title }}</div>

            <div :class="$style.description">{{ description }}</div>

            <div :class="$style.linkWrap">
                <NuxtLink
                    :class="$style.link"
                    :to="url"
                >
                    {{ linkLabel }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.UiCard {
    cursor: pointer;
    position: relative;
    height: 44.4rem;
    overflow: visible;

    &:hover {
        .linkWrap {
            height: 3.6rem;
        }
    }
}

.content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
}

.imageWrap {
    width: 100%;
    height: 28rem;
    margin-bottom: 2.4rem;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.title {
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    height: 5.8rem;

    margin-bottom: .8rem;
}

.description {
    font-size: 2rem;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    height: 7.4rem;
}

.linkWrap {
    height: 0;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    transition: height $default-transition;
}

.link {
    font-size: 2rem;
    color: $accent;
    line-height: 1.2;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
