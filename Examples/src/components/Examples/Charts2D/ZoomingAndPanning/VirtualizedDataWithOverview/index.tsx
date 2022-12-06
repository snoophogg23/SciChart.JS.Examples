import * as React from "react";
import { NumberRange } from "scichart/Core/NumberRange";
import { SciChartSurface } from "scichart";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import classes from "../../../../Examples/Examples.module.scss";
import { Subject, debounceTime } from "rxjs";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { OverviewRangeSelectionModifier } from "scichart/Charting/ChartModifiers/OverviewRangeSelectionModifier";
import { XAxisDragModifier } from "scichart/Charting/ChartModifiers/XAxisDragModifier";
import { YAxisDragModifier } from "scichart/Charting/ChartModifiers/YAxisDragModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { AxisBase2D } from "scichart/Charting/Visuals/Axis/AxisBase2D";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { EAutoRange } from "scichart/types/AutoRange";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { EXyDirection } from "scichart/types/XyDirection";
import { easing } from "scichart/Core/Animations/EasingFunctions";
import { appTheme } from "../../../theme";


export const divElementId = "chart";
export const divOverviewId = "overview";

export const drawExample = async () => {
    const { wasmContext, sciChartSurface } = await SciChartSurface.create(divElementId, {theme: appTheme.SciChartJsTheme});
    const xAxis = new NumericAxis(wasmContext, {
        axisAlignment: EAxisAlignment.Bottom,
        visibleRange: new NumberRange(4000000, 5000000),
        autoRange: EAutoRange.Never,
        labelPrecision: 0,
        useNativeText: true
    });

    sciChartSurface.xAxes.add(xAxis);
    const yAxis = new NumericAxis(wasmContext, {
        axisAlignment: EAxisAlignment.Right,
        visibleRange: new NumberRange(-5000, 5000),
        autoRange: EAutoRange.Never,
        labelPrecision: 0,
        useNativeText: true
    });
    sciChartSurface.yAxes.add(yAxis);

    const dataSeries = new XyDataSeries(wasmContext, { containsNaN: false, isSorted: true });
    const rendSeries = new FastLineRenderableSeries(wasmContext, { dataSeries, strokeThickness: 2, stroke: appTheme.VividOrange });
    sciChartSurface.renderableSeries.add(rendSeries);
    rendSeries.rolloverModifierProps.tooltipTextColor = "black";
    rendSeries.rolloverModifierProps.showRollover = true;

    sciChartSurface.chartModifiers.add(
        new ZoomExtentsModifier({ xyDirection: EXyDirection.YDirection }),
        new XAxisDragModifier(),
        new YAxisDragModifier(),
        new ZoomPanModifier(),
        new MouseWheelZoomModifier()
    );

    // Create an observable stream
    const subject = new Subject<NumberRange>();

    // Push visible range changes into the observable
    xAxis.visibleRangeChanged.subscribe(async args => {
        subject.next(args.visibleRange);
    });

    // subscribe to the observable with a debounce
    subject.pipe(debounceTime(250)).subscribe((r: NumberRange) => {
        // Fetch data and update the dataSeries
        loadPoints(r.min, r.max, sciChartSurface.domCanvas2D.width, dataSeries).then(() => {
            // Update the y axis
            const yRange = yAxis.getWindowedYRange(null);
            yAxis.animateVisibleRange(yRange, 250, easing.outExpo);
        });
    });

    const overview = await createOverview(xAxis);

    // Load initial data
    loadPoints(xAxis.visibleRange.min, xAxis.visibleRange.max, sciChartSurface.domCanvas2D.width, dataSeries).then(
        () => {
            sciChartSurface.zoomExtents();
        }
    );

    return [sciChartSurface, overview];
};

const loadPoints = async (xFrom: number, xTo: number, chartWidth: number, dataSeries: XyDataSeries) => {
    chartWidth = Math.floor(chartWidth);

    const response = await fetch(`api/data/${xFrom}-${xTo}/${chartWidth}`);
    const data: { x: number[]; y: number[] } = await response.json();
    console.log(`Loaded ${data.x.length} points`);
    dataSeries.clear();
    dataSeries.appendRange(data.x, data.y);
};

const createOverview = async (originalMainAxis: AxisBase2D) => {
    const { wasmContext, sciChartSurface } = await SciChartSurface.create(divOverviewId, {theme: appTheme.SciChartJsTheme});
    const xAxis = new NumericAxis(wasmContext, {
        axisAlignment: EAxisAlignment.Bottom,
        visibleRange: new NumberRange(0, 10000000),
        autoRange: EAutoRange.Never,
        labelPrecision: 0,
        drawMinorGridLines: false
    });

    sciChartSurface.xAxes.add(xAxis);
    const yAxis = new NumericAxis(wasmContext, {
        axisAlignment: EAxisAlignment.Right,
        autoRange: EAutoRange.Once,
        drawLabels: false,
        drawMinorGridLines: false,
        drawMinorTickLines: false
    });
    sciChartSurface.yAxes.add(yAxis);

    const dataSeries = new XyDataSeries(wasmContext, { containsNaN: false, isSorted: true });
    const rendSeries = new FastLineRenderableSeries(wasmContext, { dataSeries, strokeThickness: 2, stroke: appTheme.VividOrange });
    sciChartSurface.renderableSeries.add(rendSeries);

    const rangeSelectionModifier = new OverviewRangeSelectionModifier();
    // Bind the modifier range to the visible range of the main chart xAxis
    rangeSelectionModifier.onSelectedAreaChanged = (selectedRange: NumberRange) => {
        if (!selectedRange.equals(originalMainAxis.visibleRange)) {
            originalMainAxis.visibleRange = selectedRange;
        }
    };

    // Update the overview selected area when the range on the main chart changes
    originalMainAxis.visibleRangeChanged.subscribe(({ visibleRange }) => {
        const min = visibleRange.min > xAxis.visibleRange.min ? visibleRange.min : xAxis.visibleRange.min;
        const max = visibleRange.max < xAxis.visibleRange.max ? visibleRange.max : xAxis.visibleRange.max;
        const updatedSelectedRange = new NumberRange(min, max);
        // Prevent circular updates
        const shouldUpdateSelectedRange = !updatedSelectedRange.equals(rangeSelectionModifier.selectedArea);
        if (shouldUpdateSelectedRange) {
            rangeSelectionModifier.selectedArea = updatedSelectedRange;
        }
    });

    // Set the inital range
    rangeSelectionModifier.selectedArea = new NumberRange(
        Math.max(xAxis.visibleRange.min, originalMainAxis.visibleRange.min),
        Math.min(xAxis.visibleRange.max, originalMainAxis.visibleRange.max)
    );

    // Add the modifier to the surface
    sciChartSurface.chartModifiers.add(rangeSelectionModifier);

    // Load the full dataSet
    loadPoints(0, 10000000, sciChartSurface.domCanvas2D.width, dataSeries);

    return sciChartSurface;
};

export default function VirtualizedDataOverview() {
    let charts: SciChartSurface[];

    React.useEffect(() => {
        (async () => {
            charts = await drawExample();
        })();
        // Delete sciChartSurface on unmount component to prevent memory leak
        return () => {
            charts.forEach(chart => chart?.delete());
        };
    }, []);

    return (
        <div className={classes.ChartWrapper}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div id={divElementId} style={{ flexBasis: 600, flexGrow: 1, flexShrink: 1 }} />
                <div id={divOverviewId} style={{ flexBasis: 100, flexGrow: 1, flexShrink: 1 }} />
            </div>
        </div>
    );
}