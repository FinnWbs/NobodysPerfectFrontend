<template>
  <a href="/game/create" class="button-link" style="text-decoration: none;">
    <span class="material-icons icon">
      <div>add_circle_outline</div>
    </span>
  </a>
</template>

<script>
</script>

<style scoped>
.button-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-link:hover .material-icons {
  transition: box-shadow 0.4s;
  color: lightgrey;
}
.button-link{
  color: inherit;

  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  text-align: center;
}
.icon{
  font-size: 50px;
  color: gray;
}

</style>
