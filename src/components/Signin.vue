<template>
  <section class="flex column align-center sign-in">
    <h2>Sign in</h2>
    <form @submit.prevent="SignIn" class="flex column align-center justify-center sign-in">
      <input autofocus type="text" placeholder="User name" v-model="user.username" />
      <input type="password" placeholder="Password" v-model="user.password" />
      <!-- <input type="text" placeholder="Profile image" v-model="user.img"/> -->
      Profile Picture:
      <input class="file-input" type="file" ref="files" @change="uploadImg('userImg')" />
      Cover image:
      <input class="file-input" type="file" ref="files" @change="uploadImg" />
      <!-- <input type="text" placeholder="Cover image" v-model="user.coverImg" /> -->
      <input type="text" placeholder="Email" v-model="user.email" />
      <input type="text" placeholder="Mobile" v-model="user.mobile" />
      <textarea type="text" placeholder="Something about you?" v-model="user.about" />
      <button>{{SigninBtnMsg}}</button>
    </form>
  </section>
</template>

<script>
import cloudinaryService from "../services/cloudinary.service";

export default {
  data() {
    return {
      user: {},
      isEdit: false
    };
  },
  computed: {
    SigninBtnMsg() {
      return this.user._id ? "Save" : "Sign in";
    }
  },
  methods: {
    SignIn() {
      if (!this.user.username || !this.user.password) return;
      this.$store
        .dispatch({ type: "signIn", user: { ...this.user } })
        .then(user => {
          if (this.isEdit) this.$router.push("/user/" + this.user._id);
          else this.$emit("logedIn");
        });
    },
    openLoading() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    closeLoading() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      loading.close();
    },
    uploadImg(type) {
      let imgCount = this.$refs.files.files.length;

      this.openLoading();
      cloudinaryService.uploadImg(event, imgCount).then(res => {
        console.log(res);
        if (type === "userImg") this.user.img = res[0];
        else this.user.coverImg = res[0];
        this.closeLoading();
      });
    }
  },
  created() {
    var _id = this.$route.params._id;
    if (!_id) _id = "";
    else this.isEdit = true;
    this.$store.dispatch({ type: "getUser", _id }).then(user => {
      this.user = user;
    });
  }
};
</script>