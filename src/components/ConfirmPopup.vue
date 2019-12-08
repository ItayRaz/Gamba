<template>
    <section v-if="msgTxt">
        <router-link @click.native="reject" :to="link" v-if="type === 'Notification'" class="notification-popup">
            <h4>{{msgTxt}}</h4>
            <button class="close-btn" @click.stop.prevent="reject">X</button>
        </router-link>
        <div v-else>
            <div class="screen"></div>
            <section class="confirm-modal">
                <p>{{msgTxt}}</p>
                <div class="buttons-container">
                    <button v-if="isConfirm" @click="resolve">{{confirmBtnMsg}}</button>
                    <button @click="reject">{{closeBtnMsg}}</button>
                </div>
            </section>
        </div>
    </section>
</template>


<script>

export default {
    name: 'alert',
    computed: {
        confirmBtnMsg() {
            return 'Confirm';
        },
        closeBtnMsg() {
            return (this.isConfirm)? 'Cancel' : 'Close';
        },
        isConfirm() {
            return this.$store.getters.isConfirm;
        },
        msgTxt() {
            return this.$store.getters.alertMsg;
        },
        confirmResolve() {
            return this.$store.getters.confirmResolve;
        },
        confirmReject() {
            return this.$store.getters.confirmReject;
        },
        type() {
            return this.$store.getters.alertType;
        },
        link() {
            return this.$store.getters.alertLink;
        }
    },
    methods: {
        resolve() {
            this.confirmResolve();
            this.$store.commit('resetAlert');
        },
        reject() {
            if (this.isConfirm) this.confirmReject();
            this.$store.commit('resetAlert');
        }
    },
}
</script>

<style>
.screen {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 29;
}

.confirm-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid rgb(134, 15, 15);
    border-radius: 20px;
    width: 300px;
    min-height: 200px;
    padding: 20px;
    position: fixed;
    z-index: 30 !important;
    top: 12vh;
    right: 50%;
    transform: translate(50%, 0);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.confirm-modal > * {
    text-align: center;
    width: 100%;
    margin: 20px 0;
}

.confirm-modal .buttons-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}

.confirm-modal button {
    background: unset;
    font-size: 1.2rem;
    border: 1px solid black;
    border-radius: 7.5px;
    margin: 5px;
    outline: unset;
    transition: 0.3s;
    /* background-color: rgba(223, 210, 210, 0.3); */
}
.confirm-modal button:hover {
    cursor: pointer;
    color: rgb(124, 43, 43);
    /* border-color: rgb(124, 43, 43); */
}


.notification-popup {
    color: white !important;
    position: fixed;
    top: 0;
    right: 0;
    /* right: 50%;
    transform: translate(50%, 0); */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    padding-right: 30px;
    width: 300px;
    min-height: 70px;
    background-color: black;
    z-index: 30 !important;
}

.close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
}

@media (max-width: 500px) {
    .confirm-modal {
        width: 90vw;
    }
    .notification-popup {
        width: 100%;
    }
}

</style>