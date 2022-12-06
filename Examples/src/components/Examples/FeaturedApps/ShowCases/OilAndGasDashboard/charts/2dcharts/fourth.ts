import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { getColor } from "../utils";
import { XyScatterRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries";
import { TSciChart } from "scichart/types/TSciChart";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import {appTheme} from "../../theme";

export default async function init2dFourthChart(id: string) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(id, { theme: appTheme.SciChartJsTheme });
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { visibleRange: new NumberRange(-0.5, 5.5), isVisible: false }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { visibleRange: new NumberRange(-0.5, 5.5), isVisible: false }));

    // Create a scatter series with some initial data
    const scatterSeriesR = generateData(wasmContext, getColor('red'), data.xValuesR, data.yValuesR);
    const scatterSeriesB = generateData(wasmContext, getColor('blue'), data.xValuesB, data.yValuesB);
    const scatterSeriesG = generateData(wasmContext, getColor('green'), data.xValuesG, data.yValuesG);

    sciChartSurface.renderableSeries.add(scatterSeriesG);
    sciChartSurface.renderableSeries.add(scatterSeriesB);
    sciChartSurface.renderableSeries.add(scatterSeriesR);

    return sciChartSurface;
}

function generateData(wasmContext: TSciChart, color: string, xValues: number[], yValues: []) {
    return new XyScatterRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, {
            xValues,
            yValues
        }),
        pointMarker: new EllipsePointMarker(wasmContext, {
            width: 3,
            height: 3,
            fill: color,
            strokeThickness: 0
        })
    });
}

const data: any = {
    xValuesR: [0.48, 0.3, 0.57, 0.71, 0.89, 0.97, 1.06, 1.33, 1.42, 1.56, 1.47, 1.56, 1.2, 0.84, 0.66, 0.26, 0.26, 0.35, 0.53, 0.71, 0.66, 0.39, 0.48, 1.15, 1.38, 1.24, 2.05, 2.72, 2.36, 1.73, 1.42, 2.49, 2.49, 2.45, 2.49, 2.49, 2.54, 2.76, 3.12, 3.48, 3.48, 2.94, 2.49, 2.49, 2.76, 3.25, 3.52, 3.52, 2.72, 2.31, 2.63, 2.36, 2.27, 2.72, 2.58, 3.07, 3.34, 2.81, 2.67, 1.64, 1.73, 1.78, 1.87, 1.91, 2.14, 2.14, 1.6, 1.42, 1.29, 1.11, 0.97, 0.93, 1.51, 1.87, 1.87, 1.51, 1.47, 1.56, 1.69, 1.91, 1.51, 0.84, 0.75, 1.51, 2.27, 1.96, 1.82, 1.69, 1.2, 0.84, 0.84, 0.93, 0.97, 1.2, 1.24, 1.24, 1.33, 1.47, 1.56, 1.6, 1.73, 2.27, 2.31, 1.87, 1.38, 1.15, 1.2, 1.24, 1.29, 1.11, 1.2, 1.56, 1.56, 1.33, 1.29, 1.38, 1.24, 1.11, 1.24, 1.38, 1.42, 1.15, 1.15, 1.33, 1.38, 1.42, 1.42, 1.38, 1.06, 1.15, 1.2, 1.24, 1.29, 1.29, 1.33, 1.33, 1.33, 1.33, 1.24, 1.2, 1.2, 1.2, 1.15, 1.2, 1.2, 1.42, 1.42, 1.42, 1.33, 1.29, 1.24, 1.24, 1.29, 1.33, 1.29, 1.2, 1.2, 1.11, 1.06, 1.11, 1.11, 1.15, 1.2, 1.29, 1.33, 1.33, 1.33, 1.38, 1.38, 1.42, 1.51, 1.51, 1.51, 1.51, 1.47, 1.38, 1.33, 1.24],
    yValuesR: [2.78, 2.56, 3.16, 3.39, 3.54, 3.84, 4.22, 4.29, 3.99, 3.84, 3.99, 4.29, 4.37, 3.46, 3.31, 2.86, 2.41, 1.58, 0.97, 0.75, 1.05, 2.86, 3.69, 4.44, 4.52, 4.67, 4.07, 3.31, 2.78, 1.95, 1.35, 3.84, 3.84, 3.76, 4.14, 4.29, 4.29, 4.14, 3.76, 3.46, 3.46, 4.29, 4.37, 4.37, 3.99, 3.61, 3.54, 3.76, 4.37, 4.59, 3.92, 3.61, 3.92, 4.14, 4.37, 3.84, 3.61, 3.99, 4.07, 2.56, 2.63, 2.93, 2.93, 2.86, 2.86, 2.86, 3.08, 3.08, 3.31, 3.31, 3.31, 3.31, 3.31, 3.24, 3.24, 3.24, 2.86, 2.63, 2.78, 2.93, 2.71, 2.56, 2.71, 2.48, 2.71, 3.16, 3.16, 3.24, 3.24, 3.08, 2.86, 2.78, 2.63, 2.48, 2.33, 2.18, 2.33, 2.71, 2.71, 2.86, 3.01, 3.08, 2.86, 3.08, 3.01, 2.86, 2.63, 2.48, 2.86, 2.78, 2.56, 2.56, 3.31, 3.16, 2.86, 2.86, 3.08, 2.93, 2.63, 2.78, 2.93, -0.46, -0.46, -0.39, -0.39, -0.31, -0.01, 0.14, 0.22, 0.14, 0.14, 0.07, 0.22, 0.52, 0.59, 1.27, 1.42, 1.2, 0.9, 0.75, 0.22, 0.44, 0.9, 1.12, 1.27, 1.05, 0.75, 0.52, 0.22, 0.07, -0.01, 0.29, 0.59, 0.9, 1.12, -0.24, -0.24, -0.08, 0.22, 0.52, 0.9, 1.2, 1.58, 1.73, 1.88, 1.88, 1.8, 1.58, 1.5, 1.35, 1.05, 0.82, 0.67, 0.44, 0.14, -0.08, -0.24, -0.54],
    xValuesG: [0.3, 0.44, 0.48, 0.35, 0.3, 0.39, 0.75, 0.57, 0.57, 0.53, 0.75, 0.93, 0.84, 0.71, 0.57, 0.57, 0.53, 0.39, 0.71, 0.89, 0.62, 0.75, 0.53, 0.57, 0.71, 0.84, 0.97, 0.8, 0.75, 0.93, 1.02, 0.71, 0.26, 0.21, 0.66, 0.84, 0.57, 0.53, 2.05, 2, 2.23, 2.27, 2.23, 2.85, 3.03, 2.18, 1.56, 0.8, 0.17, 0.08, 0.57, 0.53, 2.18, 1.15, 1.96, 2.14, 1.42, 1.64, 2.81, 3.25, 3.52, 3.74, 3.07, 2.58, 1.38, 0.8, 0.57, 0.53, 0.17, 0.26, 0.44, 0.57, 0.57, 0.57, 0.62, 0.57, 0.44, 0.26, 0.21, 0.26, 0.26, 0.44, 0.53, 0.62, 0.39, 0.21, 0.21, 0.3, 0.35, 2.14, 1.91, 1.78, 1.73, 1.91, 1.96, 2.09, 2.09, 2.09, 1.73, 1.73, 1.87, 1.91, 2, 2, 1.91, 2.14, 2.23, 2.09, 2.09, 2.05, 2.9, 2.85, 2.81, 2.72, 2.58, 2.58, 2.58, 2.54, 2.54, 2.54, 2.76, 2.81, 2.99, 2.94, 2.81, 2.76, 2.67, 2.45, 2.18, 2.09, 1.87, 1.82, 0.62, 0.04, 0.04, 0.08, 0.21, 0.26, 0.44, 0.44, 0.39, 0.3, 0.26, 0.44, 0.48, 0.21, 0.21, 0.21, 0.26, 0.48, 0.53, 0.75, 0.8, 0.89, 0.97, 1.02, 0.8, 0.93, 0.75, 0.48, 0.35, 0.39, 0.35, 0.57, 0.84, 0.84, 1.02, 1.02, 0.8, 0.62, 0.53, 0.44, 0.62, 0.71, 0.39, 0.21, 0.3, 0.3, 0.13, 0.13, 0.62, 0.75, 0.84, 0.8, 0.17, 0.13, 0.26, 0.3, 0.62, 0.84, 0.89, 1.78, 1.69, 1.73, 1.78, 2, 2.36, 2.27, 1.91, 1.78, 1.82, 1.96, 2.05, 2.14, 2.23, 1.82, 1.78, 1.56, 1.56, 1.51, 1.6, 1.69, 1.73, 1.82, 1.96, 2.18, 2.31, 2.23, 2.31, 2.49, 2.63, 2.81, 2.99, 3.03, 3.07, 2.94, 2.76, 2.63, 2.54, 2.45, 2.36, 2.27, 2.05, 1.87, 1.82, 1.69, 1.64, 1.64, 1.64],
    yValuesG: [2.33, 2.41, 2.41, 1.73, 1.27, 0.97, 1.2, 1.73, 2.63, 1.73, 1.58, 1.73, 0.59, 0.59, 1.05, 1.5, 1.88, 2.1, 2.03, 1.73, 1.27, 1.58, 4.97, 4.9, 4.82, 4.9, 4.9, 5.12, 5.12, 5.2, 4.9, 4.67, 5.12, 4.97, 4.75, 4.9, 5.2, 5.2, 3.92, 3.46, 3.39, 2.93, 2.86, 3.54, 3.76, 4.29, 4.82, 4.29, 3.46, 3.08, 4.52, 4.75, 4.37, 3.84, 3.61, 2.86, 2.71, 2.33, 3.01, 3.16, 3.16, 3.31, 3.76, 3.92, 4.75, 4.75, 3.46, 2.48, 5.5, 5.5, 5.42, 5.42, 5.35, 5.2, 5.05, 4.97, 5.05, 4.97, 4.97, 5.27, 5.27, 5.2, 5.12, 5.12, 5.42, 5.5, 5.2, 5.2, 5.2, 4.14, 4.14, 3.99, 3.61, 3.54, 3.54, 3.69, 3.99, 4.29, 4.22, 3.92, 3.76, 3.84, 4.22, 4.29, 3.84, 3.69, 3.92, 4.07, 3.99, 3.84, 3.24, 3.24, 3.24, 3.24, 3.08, 3.01, 2.71, 2.71, 2.93, 3.08, 3.31, 3.24, 3.16, 3.08, 2.86, 2.63, 2.56, 2.33, 1.95, 1.88, 1.73, 1.73, 2.48, 2.25, 2.03, 2.1, 2.25, 2.33, 2.56, 2.25, 2.1, 1.8, 1.5, 1.58, 1.73, 1.42, 1.12, 0.82, 0.59, 0.59, 0.59, 0.75, 0.9, 1.2, 1.58, 1.95, 1.73, 1.73, 1.35, 0.82, 0.67, 1.05, 1.58, 2.03, 2.33, 2.33, 2.25, 2.03, 1.5, 0.97, 0.67, 0.52, 0.52, 0.52, 0.44, 0.67, 1.42, 1.65, 1.88, 1.95, 2.18, 2.33, 2.33, 2.41, 2.25, 1.58, 1.2, 1.12, 1.27, 1.8, 2.1, 1.95, 1.88, 2.03, 2.1, 2.1, 2.25, 2.25, 2.1, 1.95, 1.88, 2.03, 2.18, 2.18, 2.18, 2.03, 2.03, 1.5, 1.73, 2.18, 2.25, 2.33, 2.33, 2.33, 2.41, 2.41, 2.48, 2.71, 3.31, 3.39, 3.46, 3.46, 3.39, 3.31, 3.24, 3.08, 2.93, 2.78, 2.56, 2.18, 2.03, 1.95, 1.73, 1.58, 1.5, 1.5, 1.5, 1.58, 1.88],
    xValuesB: [0.48, 0.39, 0.21, 0.21, 0.48, 0.44, 1.06, 1.24, 0.97, 0.62, 0.35, 0.35, 1.02, 0.89, 0.89, 1.64, 1.24, 0.97, 1.15, 1.29, 2.09, 1.06, 2.23, 1.82, 2.67, 3.16, 0.8, 0.93, -0.1, 0.39, 0.13, 4.06, 2.94, 2.45, 3.48, 2.18, 2.4, 2.49, 2.49, 2.67, 2.76, 3.25, 3.16, 3.25, 3.25, 3.57, 3.57, 3.34, 3.3, 3.21, 3.16, 3.07, 3.03, 2.99, 2.85, 2.81, 2.58, 2.72, 2.76, 2.9, 2.99, 3.07, 3.48, 3.34, 3.07, 2.94, 3.03, 3.3, 3.3, 3.39, 3.39, 3.43, 3.48, 3.57, 3.66, 4.06, 3.92, 3.92, 4.06, 4.01, 3.79, 3.57, 3.34, 3.16, 3.03, 2.99, 2.99, 3.3, 3.3, 3.39, 3.48, 3.66, 3.74, 4.1, 4.42, 3.92, 3.74, 3.61, 3.52, 3.39, 3.25, 3.03, 2.9, 2.72, 2.58, 2.49, 2.23, 1.87, 1.82, 1.64, 0.75, 0.17, 0.17, 0.13, 0.08, 0.08, 0.17, 0.13, 0.13, 0.21, 0.8, 0.93, 0.97, 2.31, 2.45, 2.49, 2.49, 2.58, 2.63, 2.72, 2.76, 2.94, 2.99, 3.03, 3.12, 3.21, 3.34, 3.43, 3.66, 3.83, 3.92, 3.97, 4.15, 4.1, 4.01, 3.83, 3.7, 3.57, 3.39, 3.21, 3.07, 2.85, 2.76, 2.72, 2.85, 3.12, 3.16, 3.3, 3.43, 3.57, 3.66, 3.79, 4.24, 4.28, 4.28, 4.15, 3.88, 3.74, 3.57, 3.39, 1.69, 2, 2.14, 2.31, 2.58, 2.9, 3.16, 3.34, 3.57, 3.74, 4.01, 4.28, 4.37, 3.92, 3.57, 3.25, 2.94, 2.36, 1.78, 1.56, 1.33, 0.97, 0.75, 0.71, 0.71, 0.71, 0.71, 0.71, 0.75, 0.75, 0.75, 0.75],
    yValuesB: [3.61, 3.39, 3.08, 2.86, 2.93, 3.39, 3.69, 3.69, 3.61, 3.54, 3.31, 2.93, 5.27, 5.05, 4.9, 5.12, 5.12, 5.05, 5.2, 5.2, 1.65, 2.71, 3.46, 4.44, 3.08, 2.93, 2.18, 1.27, 1.12, 1.73, 2.63, 2.48, 3.76, 4.22, 3.61, 3.61, 1.58, 1.58, 1.58, 1.65, 1.73, 2.03, 1.95, 2.1, 2.18, 2.18, 2.41, 2.86, 2.86, 2.63, 2.56, 2.33, 2.25, 2.18, 2.1, 2.03, 1.58, 1.65, 1.65, 1.88, 1.88, 1.95, 2.1, 2.25, 2.18, 2.18, 2.25, 2.78, 2.78, 2.93, 2.93, 3.01, 3.01, 3.01, 3.01, 2.86, 2.86, 2.86, 2.93, 2.93, 2.93, 2.78, 2.56, 2.33, 2.18, 2.1, 2.1, 2.56, 2.71, 2.78, 2.86, 2.93, 2.93, 2.93, 2.78, 2.48, 2.41, 2.33, 2.25, 2.1, 1.95, 1.8, 1.73, 1.65, 1.58, 1.5, 1.35, 1.12, 1.05, 0.9, 5.5, 5.2, 4.9, 4.52, 3.39, 2.56, 1.2, 0.9, 0.82, 0.37, 0.44, 0.59, 0.75, 1.73, 1.8, 1.88, 1.88, 1.95, 2.1, 2.33, 2.41, 2.56, 2.63, 2.78, 2.86, 3.01, 3.16, 3.24, 3.31, 3.31, 3.31, 3.31, 3.31, 3.16, 3.16, 3.08, 3.01, 2.93, 2.78, 2.63, 2.56, 2.41, 2.25, 1.95, 2.03, 2.33, 2.41, 2.48, 2.63, 2.71, 2.71, 2.78, 2.86, 2.86, 2.86, 2.78, 2.71, 2.63, 2.63, 2.48, 1.27, 1.35, 1.35, 1.42, 1.58, 1.73, 1.95, 2.18, 2.41, 2.56, 2.71, 3.01, 3.16, 3.69, 3.84, 3.99, 4.29, 4.67, 4.97, 5.12, 5.2, 5.42, 4.97, 4.67, 4.29, 3.69, 3.31, 2.86, 2.03, 1.73, 1.35, 1.12]
};
