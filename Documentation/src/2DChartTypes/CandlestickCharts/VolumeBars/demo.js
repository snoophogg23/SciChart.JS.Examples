const getCandles = async (
    symbol,
    interval,
    limit = 300
) => {
  let url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  try {
    console.log(`SimpleBinanceClient: Fetching ${limit} candles of ${symbol} ${interval}`);
    const response = await fetch(url);
    // Returned data format is [ { date, open, high, low, close, volume }, ... ]
    const data = await response.json();
    // Map to { dateValues[], openValues[], highValues[], lowValues[], closeValues[] } expected by scichart.js
    const dateValues = [];
    const openValues = [];
    const highValues = [];
    const lowValues = [];
    const closeValues = [];
    const volumeValues = [];
    data.forEach(candle => {
      const [timestamp, open, high, low, close, volume] = candle;
      dateValues.push(timestamp / 1000); // SciChart expects Unix Timestamp / 1000
      openValues.push(parseFloat(open));
      highValues.push(parseFloat(high));
      lowValues.push(parseFloat(low));
      closeValues.push(parseFloat(close));
      volumeValues.push(parseFloat(volume));
    });
    return { dateValues, openValues, highValues, lowValues, closeValues, volumeValues };
  } catch (err) {
    console.error(err);
    return [];
  }
};

async function candlestickAndVolumeChart(divElementId) {
  // Demonstrates how to create a Candlestick chart with SciChart.js
  const {
    SciChartSurface,
    CategoryAxis,
    NumericAxis,
    FastCandlestickRenderableSeries,
    FastColumnRenderableSeries,
    XyDataSeries,
    OhlcDataSeries,
    NumberRange,
    SciChartJsNavyTheme
  } = SciChart;

  // or, for npm, import { SciChartSurface, ... } from "scichart"

  const { wasmContext, sciChartSurface } = await SciChartSurface.create(divElementId, {
    theme: new SciChartJsNavyTheme()
  });
  sciChartSurface.xAxes.add(new CategoryAxis(wasmContext));
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { labelPrefix: "$", labelPrecision: 2 }));

  // #region ExampleA
  // Add a secondary axis for the volume bars
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { id: "VolumeAxisId", isVisible: false, growBy: new NumberRange(0, 4) }));

  // Fetch data. Format is { dates[], opens[], highs[], lows[], closes[], volumes[] }
  const { dateValues, openValues, highValues, lowValues, closeValues, volumeValues }
      = await getCandles("BTCUSDT", "4h", 100);

  // Add a column series to render the volume bars
  sciChartSurface.renderableSeries.add(new FastColumnRenderableSeries(wasmContext, {
    dataSeries: new XyDataSeries(wasmContext, { xValues: dateValues, yValues: volumeValues }),
    yAxisId: "VolumeAxisId",
    strokeThickness: 0,
    dataPointWidth: 0.7,
    opacity: 0.47
  }));

  // continue to add the candlestick series to the chart...
  // #endregion

  const candlestickSeries = new FastCandlestickRenderableSeries(wasmContext, {
    dataSeries: new OhlcDataSeries(wasmContext, {
      xValues: dateValues,
      openValues,
      highValues,
      lowValues,
      closeValues,
    }),
    strokeThickness: 1,
    dataPointWidth: 0.7,
    brushUp: "#33ff3377",
    brushDown: "#ff333377",
    strokeUp: "#77ff77",
    strokeDown: "#ff7777",
  });
  sciChartSurface.renderableSeries.add(candlestickSeries);

  // add interactivity for the example
  const { MouseWheelZoomModifier, ZoomPanModifier, ZoomExtentsModifier } = SciChart;
  sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier({ excludedYAxisIds: ["VolumeAxisId"]}));
  sciChartSurface.chartModifiers.add(new ZoomPanModifier({ excludedYAxisIds: ["VolumeAxisId"]}));
  sciChartSurface.chartModifiers.add(new ZoomExtentsModifier());
};

candlestickAndVolumeChart("scichart-root");





async function builderExample(divElementId) {
  // Demonstrates how to create a line chart with SciChart.js using the Builder API
  const {
    chartBuilder,
    ESeriesType,
    EAxisType,
    EThemeProviderType,
    NumberRange
  } = SciChart;

  // or, for npm, import { chartBuilder, ... } from "scichart"

  // Data format is { dateValues[], openValues[], highValues[], lowValues[], closeValues[] }
  const { dateValues, openValues, highValues, lowValues, closeValues, volumeValues }
      = await getCandles("BTCUSDT", "1h", 100);

  // #region ExampleB
  const { wasmContext, sciChartSurface } = await chartBuilder.build2DChart(divElementId, {
    surface: { theme: { type: EThemeProviderType.Dark } },
    xAxes: [{ type: EAxisType.CategoryAxis }],
    yAxes: [
        { type: EAxisType.NumericAxis, options: { labelPrefix: "$", labelPrecision: 2 } },
        { type: EAxisType.NumericAxis, options: { isVisible: false, id: "VolumeAxisId", growBy: new NumberRange(0, 4) } },
    ],
    series: [
      {
        type: ESeriesType.CandlestickSeries,
        ohlcData: {
          xValues: dateValues,
          openValues,
          highValues,
          lowValues,
          closeValues
        },
        options: {
          dataPointWidth: 0.7,
          brushUp: "#33ff3377",
          brushDown: "#ff333377",
          strokeUp: "#77ff77",
          strokeDown: "#ff7777",
          strokeThickness: 1,
        }
      },
      {
        type: ESeriesType.ColumnSeries,
        xyData: {
          xValues: dateValues,
          yValues: volumeValues,
        },
        options: {
          yAxisId: "VolumeAxisId",
          strokeThickness: 0,
          dataPointWidth: 0.7,
          opacity: 0.47
        }
      }
    ]
  });
  // #endregion
};



if (location.search.includes("builder=1"))
builderExample("scichart-root");
