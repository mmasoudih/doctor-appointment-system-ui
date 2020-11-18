<template>
  <div>
    <b-avatar :src="profilePicture.profile_photo_url" size="6rem"></b-avatar>  
  </div>
</template>
<script>
export default {
  computed:{
    profilePicture(){
      return this.$store.getters.userInfo;
    }
  }
}
</script>