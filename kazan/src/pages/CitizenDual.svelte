<script>
  import SegueButton from "../common/SegueButton.svelte";

  export let page;

  let value1;
  let value2;

  $: active = value2 && value1;
</script>

<style>
  .wrapper {
    height: 100%;
  }

  .action-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 320px;
  }

  input::-webkit-input-placeholder {
    font-family: Helvetica;
    font-size: 12px;
    line-height: 16px;
  }
</style>

<div class="wrapper">
  <h4 class="question">Ваше гражданство</h4>
  <div class="items">
    <input
      type="text"
      placeholder="Просто начните писать :)"
      bind:value={value1} />
    <input
      type="text"
      placeholder="Просто начните писать :)"
      bind:value={value2} />
  </div>
  <div class="action-block">
    <SegueButton {active} disabled={!active} {page}>
      <span class="fact" slot="fact">Вау! Ну ты крутой</span>
    </SegueButton>
  </div>
</div>
