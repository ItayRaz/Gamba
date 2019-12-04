<template>
    <section class="flex align-center column-evento-preview">
        <router-link class="evento-img" :to="'/event/'+evento._id"><img :src="evento.imgs[0]" alt=""></router-link>
        <div class="flex column info">
            <div class="flex align-center creator">
                <p>Event by: </p>
                <router-link :to="'/user/'+evento.creator._id">{{evento.creator.name}}</router-link>
            </div>
            <router-link :to="'/event/'+evento._id"><short-txt :txt="evento.title" :txtLimit="15"/></router-link>
        </div>
        <div class="members-avatar-container flex" v-if="evento.members">
            <div v-for="idx in evento.members.slice(0,1).length">
                <router-link :to="'/user/'+evento.members[idx-1]._id"><avatar class="avatar" :username="evento.members[idx-1].name" :src="evento.members[idx-1].img" :size="30" rounded/></router-link>
            </div>
            <!-- <avatar v-for="idx in 3" class="avatar" :key="idx" :username="'Aviv'" :src="''" :size="30" rounded></avatar> -->
        </div>
    </section>
</template>

<script>
import Avatar from "vue-avatar";
import shortTxt from './ShortTxt.vue';

export default {
    props: ['evento'],
    components: {
        Avatar,
        shortTxt
    }
}
</script>