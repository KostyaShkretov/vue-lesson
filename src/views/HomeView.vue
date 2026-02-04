<template>
  <div class="head">
    <h1>Содержание</h1>
    <ul class="head__list">
      <li><router-link :to="{ name: 'Emodji' }"> Emodji</router-link></li>
      <li><router-link :to="{ name: 'Present' }"> Present</router-link></li>
      <li><router-link :to="{ name: 'Domen' }"> Domen</router-link></li> 
      <li><router-link :to="{ name: 'Game' }"> True or False </router-link></li>
    </ul> 
  </div>
</template> 
<script> 

export default { 

};
</script>

<style>
a {
  text-decoration: none;
  color: #6e38f7; 
}
ul {
    list-style: none;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
.head__list{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
 
</style>