<script>
  import Scatterplot from "../chart/Skatterplot.svelte";
  import data from "../chart/data";
</script>

<style>
  .chart {
    width: 100%;
    max-width: 640px;
    height: calc(100% - 4em);
    min-height: 280px;
    max-height: 480px;
    margin: 0 auto;
  }
</style>

<div class="chart">
  <h2>Scatter chart</h2>

  <Scatterplot points={data} />
</div>
