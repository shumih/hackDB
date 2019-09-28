<script>
  import SegueButton from "../common/SegueButton.svelte";

  export let withDeclineAnswer;
  export let page;
  export let question;

  let value;
</script>

<style>
  .wrapper {
    height: 100%;
  }

  .action-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  <h4 class="question">{question}</h4>
  <div class="items">
    <input type="text" placeholder="Просто начните писать :)" bind:value />
  </div>
  <div class="action-block">
    {#if withDeclineAnswer}
      <SegueButton title="Отказаться от ответа" {page} />
    {/if}

    <SegueButton active={value} disabled={!value} {page}>
      <span class="fact" slot="fact">
        {#if page === 'half'}
          Ты знал, что в составе населения России
          <br />
          насчитывается более 180 национальностей?
          <br />
          Россия - самая уникальная страна в мире!
        {/if}
      </span>
    </SegueButton>
  </div>
</div>
