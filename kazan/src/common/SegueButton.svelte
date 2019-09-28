<script>
  import { pageStorageItem } from "../store";

  export let active = false;
  export let page;
  export let title = "Далее";
  export let fact;
  export let showHint = true;
  export let disabled = false;
</script>

<style>
  div {
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

<div>
  <button
    type="button"
    class:active
    on:click={e => pageStorageItem.set(page)}
    {disabled}>
    {title}
  </button>
  {#if active && showHint}
    <slot name="fact">
      {#if fact}
        <span class="fact">
          {@html fact}
        </span>
      {/if}
    </slot>
  {/if}
</div>
