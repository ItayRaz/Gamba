<template>
  <section v-if="imgs.length" class="event-gallery flex align-center">
    <button @click="getNextImg(-1)">⇠</button>
    <ul  class="clean-list flex row">
      <li
        v-for="(img,idx) in imgsToShow"
        :class="{middle : idx === Math.floor(imgs.length/2)}"
        :key="idx"
      >
        <img class="img-details" :src="img" />
      </li>
    </ul>
    <button @click="getNextImg(1)">⇢</button>
  </section>
</template>

<script>
export default {
  props: ["imgs"],
  data() {
    return {
      currImg: 0,
      imgCounter: 0,

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
        imgsReplace = this.imgsToShow.slice(0,this.imgs.length-1);
        imgsReplace.unshift(this.imgsToShow[this.imgs.length-1]);
        this.imgsToShow = imgsReplace;
      }
      else{
        imgsReplace = this.imgsToShow.slice(1,this.imgs.length);        
        imgsReplace.push(this.imgsToShow[0]);
        this.imgsToShow = imgsReplace;

      }

      this.$emit("setMainImg", this.currImg);
    }
  },
  created() {
    this.$emit("setMainImg", this.currImg);
    if(this.imgs.length) this.currImg = Math.floor(this.imgs.length/2)
    console.log(this.imgs);
    
  }
};
</script>


