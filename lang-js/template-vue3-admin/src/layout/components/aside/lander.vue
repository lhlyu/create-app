<template>
    <section class="lander">
        <div class="avatar">
            <img src="/avatar.png" alt="logo" />
        </div>
        <div class="info">
            <div class="name">
                <strong>管理员：谕</strong>
            </div>
            <div class="extra">
                <small>欢迎您登录</small>
            </div>
        </div>
        <div class="btns">
            <ul>
                <li v-show="store.theme === 'dark'">
                    <svg
                        @click="store.setTheme('light')"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </li>
                <li v-show="store.theme === 'light'">
                    <svg
                        @click="store.setTheme('dark')"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                </li>
                <li>
                    <svg
                        @click="logout"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useSiteStore from '../../../stores/site'

const router = useRouter()
const store = useSiteStore()

const logout = () => {
    setTimeout(() => {
        router.replace({ name: 'login' })
    }, 200)
}
</script>

<style lang="scss" scoped>
.lander {
    display: flex;
    flex-direction: row;
    height: 80px;
    border-bottom: 1px dashed rgba(var(--admin-font-color), 0.1);
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    will-change: width;

    .avatar {
        width: 90px;
        flex-shrink: 0;

        img {
            width: 50px;
            height: 50px;
            margin: 15px 20px;
            object-fit: cover;
            border-radius: 50%;
            will-change: width;
        }
    }
    .info {
        width: 136px;
        display: flex;
        flex-shrink: 0;
        flex-direction: column;

        .name {
            flex: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            will-change: width;
            line-height: 58px;
            font-size: 18px;
        }

        .extra {
            flex: 1;
            line-height: 28px;
            overflow: hidden;
        }
    }
    .btns {
        flex-shrink: 0;
        width: 64px;
        margin-right: 10px;

        ul {
            list-style-type: none;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            height: 100%;

            li {
                cursor: pointer;
                opacity: 0.8;
                &:hover {
                    color: rgb(var(--admin-theme-color));
                }
            }
        }
    }
}
</style>
