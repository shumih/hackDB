<script>
  import SegueButton from "../common/SegueButton.svelte";
  import { addressStorageItem } from "../store.js";

  export let page;
  let value;
</script>

<style>
  .uraddress {
    font-family: Helvetica;
    font-size: 13px;
    line-height: 17px;
  }
</style>

<div class="wrapper">
  <h4 class="question">Укажите номер вашей квартиры</h4>
  <div class="items">

    <span class="uraddress">{$addressStorageItem}</span>

    <input type="text" bind:value />
    <SegueButton active={value} {page} fact="" />
  </div>
</div>
