<template>
    <div class="navlist">
        <div class="item" v-for="(v,i) in value" :key="i">
            <template v-if="v.children">
                <div
                    :class="['item-title','iconfont',v.icon,active.index == i && active.status?'active':'']"
                    @click="onEvent(i)"
                >
                    {{v.name}}
                    <i
                        :class="['iconfont',active.index == i && active.status?'icon-down':'icon-right']"
                    ></i>
                </div>
                <div :class="['item-list ',active.index == i && active.status?'active':'none']">
                    <template v-for="(e,i) in v.children">
                        <router-link
                            :to="v.path+'/'+e.path"
                            active-class="active"
                            tag="div"
                            :key="i"
                        >{{e.name }}</router-link>
                    </template>
                </div>
            </template>
            <div :class="['item-title','iconfont',v.icon]" v-else>
                <router-link :to="v.path" active-class="active" tag="div">{{ v.name }}</router-link>
            </div>
        </div>
    </div>
</template>  
<script>
export default {
    props: ["value"],
    data() {
        return {
            active: {
                index: 0,
                status: false
            }
        };
    },
    methods: {
        onEvent(i) {
            this.active = {
                index: i,
                status: !this.active.status
            };
        }
    }
};
</script> 
<style lang="less" scoped>
.navlist {
    background: #fff;
    .item {
        .item-list {
            display: none;
            &.active {
                display: block;
            }
        }
        .item-title {
           &.active{
              
           }
        }
    }
}
</style>  