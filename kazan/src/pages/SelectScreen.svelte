<script>
  import SegueButton from "../common/SegueButton.svelte";

  export let question;
  export let fact = "";
  export let options;
  export let page;
  export let hint = "";
  export let showHintWithIndex = null;
  let index;

  $: active = index != null;
  $: showHint =
    showHintWithIndex == null ? true : parseInt(showHintWithIndex) === index;
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
</style>

<div class="wrapper">
  <h4 class="question">{question}</h4>
  <div class="items">
    {#each options as option, i}
      <div
        class="item"
        class:selected={index === i}
        on:click={() => (index = i)}>
        {option}
      </div>
    {/each}

    {#if hint}
      <span class="hint">{hint}</span>
    {/if}
  </div>
  <SegueButton {page} {active} {showHint}>
    <span class="fact" slot="fact">
      {#if page === 'achivement'}
        56% населения имеют высшее образование
        <br />
        и ты среди них!
      {/if}
      {#if page === 'candidate'}
        Спасибо, что рассказываешь!
        <br />
        Ты наверное такой умный
      {/if}
      {#if page === 'student'}Это же не самое главное в жизни, правда?{/if}
    </span>
  </SegueButton>
</div>
