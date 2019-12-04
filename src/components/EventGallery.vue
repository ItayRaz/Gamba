<template>
  <section v-if="imgs.length" class="event-gallery flex align-center">
    <img src alt />
    <div class="btn-img flex">
      <button class="left" @click.stop="getNextImg(-1)"><i class="fa fa-chevron-left"></i></button>
      <button class="right" @click.stop="getNextImg(1)"><i class="fa fa-chevron-right"></i></button>
    </div>
    <ul class="clean-list flex row">
      <li class="pointer" v-for="(img,idx) in imgsToShow" :key="idx">
        <p v-if="idx === currImg" @click.stop="setImg(idx)"><i class="fa fa-circle"></i></p>
        <p v-else @click.stop="setImg(idx)"><i class="fa fa-circle"></i></p>
        <!-- <img class="img-details" :src="img" /> -->
        <!-- :class="{middle : idx === Math.floor(imgs.length/2)}" -->
        <!-- <p v-if="idx === Math.floor(imgs.length/2)" @click="getNextImg(-1)">⚪</p> -->
        <!-- <p v-else @click="getNextImg(1)">⚫</p> -->
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["imgs"],
  data() {
    return {
      currImg: 0,
      imgCounter: 0,
      changeImgs: 0,
      imgsToShow: this.imgs
    };
  },
  methods: {
    getNextImg(diff) {
      this.currImg += diff;

      if (this.currImg < 0) this.currImg = this.imgs.length - 1;
      if (this.currImg === this.imgs.length) this.currImg = 0;

      var imgsReplace;

      if (diff < 1) {
        imgsReplace = this.imgsToShow.slice(0, this.imgs.length - 1);
        imgsReplace.unshift(this.imgsToShow[this.imgs.length - 1]);
        this.imgsToShow = imgsReplace;
      } else {
        imgsReplace = this.imgsToShow.slice(1, this.imgs.length);
        imgsReplace.push(this.imgsToShow[0]);
        this.imgsToShow = imgsReplace;
      }

      this.$emit("setMainImg", this.currImg);
    },
    setImg(idx) {
      clearInterval(this.changeImgs);
      this.currImg = idx;
      this.$emit("setMainImg", this.currImg);
      this.switchImgs();
    },
    switchImgs() {
      this.changeImgs = setInterval(() => {
        this.currImg++;
        if (this.currImg >= this.imgs.length) this.currImg = 0;
        this.$emit("setMainImg", this.currImg);
      }, 6000);
    }
  },
  created() {
    // this.switchImgs();
  },
  // destroyed() {
  //   if (this.changeImgs) clearInterval(this.changeImg);
  // }
};
</script>


