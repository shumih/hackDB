<script>
  import { pageStorageItem } from "../store";
  import SegueButton from "../common/SegueButton.svelte";

  import Select from "svelte-select";

  let items = [
    { value: "chocolate", label: "Chocolate" },
    { value: "pizza", label: "Pizza" },
    { value: "cake", label: "Cake" },
    { value: "chips", label: "Chips" },
    { value: "ice-cream", label: "Ice Cream" }
  ];

  export let label;
</script>

<style>
  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-family: "Gilroy Extra Bold";
    font-size: 24px;
    line-height: 29px;
  }
</style>

<div class="form-group">
  <label>{label}</label>
  <Select {items} />
</div>
