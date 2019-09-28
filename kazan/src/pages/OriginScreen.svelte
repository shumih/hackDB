<script>
  import SegueButton from "../common/SegueButton.svelte";
  import { onMount } from "svelte";

  let value;
  export let page;
</script>

<style>
  .form-group {
    height: 100%;
  }

  .suggest-control {
    border: 1px solid #dcdcdc;
  }

  label {
    font-family: "Gilroy Extra Bold";
    font-size: 24px;
    line-height: 29px;
  }
</style>

<div class="wrapper">

  <div class="form-group">
    <label>Место Вашего рождения</label>
    <input
      type="text"
      class="suggest-control"
      placeholder="Страна, регион, город"
      bind:value />
  </div>
  <SegueButton
    {page}
    fact={value && value.includes('Казань') ? 'Круто! Это же в твоем городе проходила лучшая Универсиада?' : ''}
    active={value} />
</div>
