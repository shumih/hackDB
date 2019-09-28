<script>
  import SegueButton from "../common/SegueButton.svelte";
  import Datepicker from "svelte-calendar";
  import { pageStorageItem } from "../store.js";

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function handleNext() {
    shown = false;
    pageStorageItem.set(page);
  }

  let shown = true;
  let date = new Date(1955, 1, 24);
  $: age = date && getAge(date);

  export let page;
</script>

<style>
  label {
    font-family: "Gilroy Extra Bold";
    font-size: 24px;
    line-height: 29px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: 100%;
    width: 335px;
    margin: 0 auto;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fact {
    margin-top: 5px;
    font-family: Helvetica;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: var(--fact-color);
  }

  button {
    width: 335px;
    height: 37px;
    font-family: Helvetica;

    border: none;
    border-radius: 9px;
    background: #dcdcdc;
    margin: 0;
    margin-top: 8px;
  }

  .active {
    background: var(--pink);
  }
</style>

{#if shown}
  <div class="wrapper">
    <div class="items">
      <div class="form-group">
        <label>Дата рождения</label>
        <Datepicker format={'#{j} #{F} #{Y}'} bind:selected={date} />
      </div>
      <div class="form-group">
        <label>Сколько вам полных лет?</label>
        <input type="number" value={age} />
      </div>

      <div class="buttons">
        <button
          type="button"
          class:active={date}
          on:click={handleNext}
          disabled={!date}>
          Далее
        </button>
        {#if date}
          <span class="fact">
            Ты знал, что в этот день родился Стив Джобс?"
          </span>
        {/if}
      </div>
    </div>
  </div>
{/if}
