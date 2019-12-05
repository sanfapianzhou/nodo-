<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data:function(){
  	return {show:true}
  },
  components:{

  },
  methods:{
  	 toggleMenu:function(){
  	 	this.show = !show;
  	}
  }
}
</script>
<style>
</style>

