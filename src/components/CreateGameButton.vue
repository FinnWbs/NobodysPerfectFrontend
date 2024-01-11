<template>
  <a href="/game/create" class="button-link" style="text-decoration: none">
    <span class="material-icons icon">
      <div>add_circle_outline</div>
    </span>
  </a>
</template>

<script></script>

<style scoped>
.button-link:hover .material-icons {
  transition: box-shadow 0.4s;
  box-shadow: #2c3e50;
}
.button-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
}
.icon {
  font-size: 50px;
  color: #2c3e50;
}
</style>
