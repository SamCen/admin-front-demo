<template>
    <div>
        <h1 class="code animation-slide-top">404</h1>
        <p>您访问的页面不存在，秒后自动返回</p>
    </div>
</template>

<script>
    export default {
        name: 'NotFound',
    };
</script>

<style lang="scss">
    @-webkit-keyframes slide-top {
        0% {
            -webkit-transform: translate3d(0, -100%, 0);
        }
        100% {
            -webkit-transform: translate3d(0, 0, 0);
        }
    }

    [class*=animation-] {
        -webkit-animation-duration: .5s;
        -webkit-animation-timing-function: ease-out;
        -webkit-animation-fill-mode: both;
    }

    .animation-slide-top {
        -webkit-animation-name: slide-top;
    }
</style>
