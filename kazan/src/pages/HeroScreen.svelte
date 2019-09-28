<script>
  import SegueButton from "../common/SegueButton.svelte";
</script>

<style>
  .block {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    left: 0;
    top: 24%;
  }

  :global(.button) {
    margin-top: 16px;
  }

  .title {
    font-family: "Gilroy Extra Bold";

    font-size: 25px;
    line-height: 31px;
    text-align: center;
    width: 300px;

    color: var(--black);
  }

  span {
    color: var(--pink);
  }

  button {
    width: 335px;
    height: 37px;
    font-family: Helvetica;

    border: none;
    border-radius: 9px;
    background: var(--pink);
    margin: 0;
    margin-top: 8px;
  }
</style>

<div class="block">

  <img src="./images/hero.png" alt="hero" width="172px" />

  <h4 class="title">
    <span>Ты герой!</span>
    <br />
    Опрос пройден
  </h4>

  <button
    type="button"
    on:click={() => window.location.replace('https://ozon.ru')}>
    Забрать свой подарок
  </button>
</div>
