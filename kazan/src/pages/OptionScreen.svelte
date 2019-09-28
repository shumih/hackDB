<script>
  import SegueButton from "../common/SegueButton.svelte";

  export let page;
  export let fact = "";
  export let showHintWithIndex = null;
  let index;
  let shouldShowHint;

  $: if (showHintWithIndex != null) {
    shouldShowHint =
      showHintWithIndex != null ? index === parseInt(showHintWithIndex) : true;
  }
</script>

<style>
  .items {
    margin-top: 16px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 16px;
  }

  .ellipse {
    position: relative;
    width: 149px;
    height: 149px;

    border-radius: 50%;
    background: #dcdcdc;
  }

  .selected {
    background: #ff8484;
  }

  .group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .group > span {
    font-family: Helvetica;
    font-size: 13px;
    line-height: 17px;
    text-align: center;
  }
</style>

<div class="wrapper">
  <slot name="question" />
  <div class="items">
    <div class="group">
      <div
        class="ellipse"
        class:selected={index === 0}
        on:click={e => (index = 0)}>
        <slot name="0" />
      </div>
      <span>Да</span>
    </div>
    <div class="group">
      <div
        class="ellipse"
        class:selected={index === 1}
        on:click={e => (index = 1)}>
        <slot name="1" />
      </div>
      <span>Нет</span>
    </div>
  </div>
  <SegueButton
    {page}
    active={index != null}
    disabled={index == null}
    fact={fact.replace(/\\n/g, '<br>')}
    showHint={shouldShowHint} />
</div>
