<script>
  import SegueButton from "../common/SegueButton.svelte";
  import { pageStorageItem } from "../store";

  export let options;
  export let page;
  let index;

  $: active = index != null;
  $: isDual = index === 1;
</script>

<style>
  .items {
    margin-top: 16px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin-bottom: 16px;
  }

  .item.selected {
    background: var(--pink);
  }

  .item {
    font-family: Helvetica;
    font-size: 14px;
    line-height: 18px;
    height: 37px;
    padding: 0 14px;

    background: #dcdcdc;
    border-radius: 9px;
    line-height: 37px;
  }

  .item:not(:last-of-type) {
    margin-bottom: 15px;
  }

  .hint {
    height: 16px;
    left: 20px;
    top: 459px;

    font-family: Helvetica;
    font-size: 12px;
    line-height: 16px;

    text-align: center;

    color: #8b8b8b;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
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

<div class="wrapper">
  <h4 class="question">Ваше гражданство</h4>
  <div class="items">
    {#each options as option, i}
      <div
        class="item"
        class:selected={index === i}
        on:click={() => (index = i)}>
        {option}
      </div>
    {/each}

  </div>
  <SegueButton
    page={isDual ? 'citizen-dual' : page}
    showHint={isDual}
    disabled={!active}
    {active}>

    <span class="fact" slot="fact">
      Ты действительно уникальная личность!
      <br />
      Какие страны?
    </span>

  </SegueButton>
</div>
