<script>
  import { onMount } from "svelte";
  import { pageStorageItem, addressStorageItem } from "../store";
  import SegueButton from "../common/SegueButton.svelte";
  import QrScanner from "qr-scanner";

  async function getAddress(coords) {
    const res = await ymaps.geocode(coords);
    return res.geoObjects.get(0);
  }

  function handleInput() {
    if (!pageStorageItem) {
      observer.disconnect();
    }

    const el = document.querySelector("[data-suggest=true] > ymaps");
    if (!el) {
      return;
    }

    observer.observe(el, {
      childList: true,
      subtree: true
    });
  }

  onMount(() => {
    ymaps.ready(function init() {
      yMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
      });

      ymaps.geolocation
        .get({
          provider: "yandex",
          mapStateAutoApply: true
        })
        .then(result => getAddress(result.geoObjects.position))
        .then(result => {
          addressStorageItem.set(result.getAddressLine());
        });

      const suggestView = new ymaps.SuggestView("suggest", { results: 2 });
      suggestView.events.add("select", async () => {
        addressStorageItem.set(suggest.value);

        const geocode = await ymaps.geocode(suggest.value, {
          results: 1
        });

        const geoobject = geocode.geoObjects.get(0);
        const coords = geoobject.geometry.getCoordinates();
        const bounds = geoobject.properties.get("boundedBy");

        geoobject.options.set("preset", "islands#darkBlueDotIconWithCaption");
        geoobject.properties.set("iconCaption", geoobject.getAddressLine());
        yMap.geoObjects.add(geoobject);
        yMap.setBounds(bounds, {
          checkZoomRange: true
        });
      });
    });

    observer = new MutationObserver(data => {
      suggestItems = data
        .map(
          record =>
            record.type === "childList" &&
            record.addedNodes &&
            Array.from(record.addedNodes)
              .filter(el => el.matches("[data-index]"))
              .map(el => el.textContent)
              .flat()
        )
        .filter(Boolean);
    });
  });

  let videoEl;
  let shouldShowVideo = false;
  let suggestItems = [];
  let observer;
  let yMap;

  export let page;
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .block {
    height: 186px;
    padding: 16px;

    background: #f2f2f2;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .cross {
    outline: none;
    background: none;
    border: none;
  }

  .label {
    font-family: "Gilroy Extra Bold";
    margin: 8px 0;
  }

  .uraddress {
    font-family: Helvetica;
    font-size: 13px;
    line-height: 17px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    top: 0;
    font-family: Helvetica;
    font-size: 20px;
    line-height: 26px;

    color: #000000;
  }

  .form-group {
    position: relative;
  }

  .cross {
    position: absolute;
    right: 8px;
    top: 12px;
    border-radius: 50%;
    background: #dcdcdc;
    height: 16px;
    width: 16px;
    margin: 0;
    padding: 0;
    font-size: 11px;
    text-align: center;
    line-height: 16px;
  }

  .suggestions {
    margin-top: 4px;
    overflow-x: hidden;
    height: 24px;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .suggest-control {
    margin-top: 0;
  }

  .suggest {
    white-space: nowrap;
    background: #dcdcdc;
    border-radius: 15px;
    font-family: "Gilroy Light", Roboto;
    font-size: 12px;
    line-height: 16px;
    padding: 4px;
    color: black;
  }

  #map {
    height: 100%;
    width: 100%;
  }

  button {
    height: 37px;
    font-family: "Gilroy Light", Roboto;

    background: var(--pink);
    border-radius: 9px;
    border: var(--pink);
    margin: 0;
  }

  button.no {
    background: #dcdcdc;
  }

  :global(.ymaps-2-1-74-search__suggest) {
    display: none !important;
  }

  :global(.ymaps-2-1-74-suggest-item) {
    font-family: "Gilroy Light", Roboto;
    border-radius: 15px;
  }

  :global(ymaps) * {
    background: #dcdcdc;
  }

  :global(.ymaps-2-1-74-search__suggest) {
    box-shadow: none;
    border-radius: 16px;
  }
</style>

<div class="container">
  <div class="block">
    <div class="header">
      <h2 class="label">Укажите Ваш адрес</h2>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.9123 0.283216C15.8209 0.188709 15.6799 0.162371 15.5606
          0.217216L0.180648 7.27586C0.0570129 7.33287 -0.0151848 7.46332
          0.00278719 7.59842C0.0207591 7.73352 0.124563 7.84073 0.258733
          7.86304L7.15718 9.01914L7.94577 15.538C7.9625 15.6737 8.06631 15.7831
          8.2011 15.806C8.21876 15.8091 8.23611 15.8107 8.25346 15.8107C8.36966
          15.8107 8.47842 15.7453 8.5311 15.6384L15.9678 0.636458C16.026
          0.519021 16.0037 0.377414 15.9123 0.283216Z"
          fill="black" />
      </svg>
    </div>
    <div class="form-group">
      <input
        id="suggest"
        type="text"
        class="suggest-control"
        bind:value={$addressStorageItem}
        on:input={handleInput} />
      {#if pageStorageItem}
        <button
          class="cross"
          aria-label="Clear"
          on:click={e => addressStorageItem.set('')}>
          <span>x</span>
        </button>
      {/if}

      <div class="suggestions">
        {#each suggestItems as suggestion}
          {#if suggestion}
            <span
              class="suggest"
              on:click={e => addressStorageItem.set(suggestion)}>
              {suggestion}
            </span>
          {/if}
        {/each}
      </div>

    </div>
    <SegueButton active="true" {page} fact="" />
  </div>
  <div id="map" />
</div>
