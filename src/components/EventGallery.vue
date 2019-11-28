<template>
  <section class="event-gallery flex align-center">
    <button @click="getNextImg(1)">⇠</button>
      <ul class="clean-list flex row">
        <li v-for="(img,idx) in imgsToShow" :class="{middle : idx === 1}" :key="idx">
          <img class="img-details" :src="img" />
        </li>
      </ul>
      <button @click="getNextImg(-1)">⇢</button>
  </section>
</template>

<script>
export default {
  props: ["imgs"],
  data() {
    return {
      imgCounter: 0,
      imgsToShow: this.imgs.slice(this.imgCounter, 3)
    };
  },
  methods: {
    getNextImg(diff) {
      this.imgCounter += diff;

      if (this.imgCounter < 0) this.imgCounter = this.imgs.length - 1;
      if (this.imgCounter === this.imgs.length) this.imgCounter = 0;

      if (this.imgCounter === this.imgs.length - 1) {
        this.imgsToShow = this.imgs.slice(0,2);
        this.imgsToShow.unshift(this.imgs[this.imgCounter])        
      } else if (this.imgCounter === this.imgs.length - 2) {
        this.imgsToShow = this.imgs.slice(this.imgCounter);
        this.imgsToShow.push(this.imgs[0]);
      } else {
        this.imgsToShow = this.imgs.slice(this.imgCounter, this.imgCounter + 3);
      }
    },
    middleImg(){

    }
  }
};
</script>


