import * as React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { appTheme, ExampleDataProvider } from "scichart-example-dependencies";
import classes from "../../../styles/Examples.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import {
    ELegendOrientation,
    ELegendPlacement,
    ENumericFormat,
    FastLineRenderableSeries,
    LegendModifier,
    NumericAxis,
    NumberRange,
    SciChartSurface,
    XyDataSeries,
    getLegendItemHtml
} from "scichart";

const divElementId = "chart";

const drawExample = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });

    // Add an X, Y Axis
    sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, {
            labelFormat: ENumericFormat.Decimal,
            labelPrecision: 2
        })
    );
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            labelFormat: ENumericFormat.Decimal,
            labelPrecision: 2,
            growBy: new NumberRange(0.1, 0.1)
        })
    );

    // Add some data
    const data0 = ExampleDataProvider.getFourierSeriesZoomed(1.0, 0.1, 5.0, 5.15);
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, {
                xValues: data0.xValues,
                yValues: data0.yValues,
                dataSeriesName: "First Line Series"
            }),
            strokeThickness: 3,
            stroke: "auto"
        })
    );

    const data1 = ExampleDataProvider.getFourierSeriesZoomed(0.6, 0.13, 5.0, 5.15);
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, {
                xValues: data1.xValues,
                yValues: data1.yValues,
                dataSeriesName: "Second Line Series"
            }),
            strokeThickness: 3,
            stroke: "auto"
        })
    );

    const data2 = ExampleDataProvider.getFourierSeriesZoomed(0.5, 0.12, 5.0, 5.15);
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, {
                xValues: data2.xValues,
                yValues: data2.yValues,
                dataSeriesName: "Third Line Series"
            }),
            strokeThickness: 3,
            stroke: "auto"
        })
    );

    const data3 = ExampleDataProvider.getFourierSeriesZoomed(0.4, 0.11, 5.0, 5.15);
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, {
                xValues: data3.xValues,
                yValues: data3.yValues,
                dataSeriesName: "Fourth Line Series"
            }),
            strokeThickness: 3,
            stroke: "auto"
        })
    );

    // add the legend modifier and show legend in the top left
    const legendModifier = new LegendModifier({
        showLegend: true,
        placement: ELegendPlacement.TopLeft,
        orientation: ELegendOrientation.Vertical,
        showCheckboxes: true,
        showSeriesMarkers: true
    });

    sciChartSurface.chartModifiers.add(legendModifier);

    return { sciChartSurface, wasmContext, legendModifier };
};

const placementSelect = [
    { value: ELegendPlacement.TopLeft, text: "Top-Left" },
    { value: ELegendPlacement.TopRight, text: "Top-Right" },
    { value: ELegendPlacement.BottomLeft, text: "Bottom-Left" },
    { value: ELegendPlacement.BottomRight, text: "Bottom-Right" }
];

const orientationSelect = [
    { value: ELegendOrientation.Vertical, text: "Vertical" },
    { value: ELegendOrientation.Horizontal, text: "Horizontal" }
];

export default function ChartLegendsAPI() {
    const sciChartSurfaceRef = React.useRef<SciChartSurface>();
    const legendModifierRef = React.useRef<LegendModifier>();

    const [placementValue, setPlacementValue] = React.useState<ELegendPlacement>(ELegendPlacement.TopLeft);
    const [orientationValue, setOrientationValue] = React.useState<ELegendOrientation>(ELegendOrientation.Vertical);
    const [showLegendValue, setShowLegendValue] = React.useState(true);
    const [showCheckboxesValue, setShowCheckboxesValue] = React.useState(true);
    const [showSeriesMarkersValue, setShowSeriesMarkersValue] = React.useState(true);

    React.useEffect(() => {
        const chartInitializationPromise = drawExample().then(({ sciChartSurface, legendModifier }) => {
            sciChartSurfaceRef.current = sciChartSurface;
            legendModifierRef.current = legendModifier;
        });

        return () => {
            // check if chart is already initialized
            if (sciChartSurfaceRef.current) {
                sciChartSurfaceRef.current.delete();
                sciChartSurfaceRef.current = undefined;
                legendModifierRef.current = undefined;
                return;
            }

            // else postpone deletion
            chartInitializationPromise.then(() => {
                sciChartSurfaceRef.current.delete();
                sciChartSurfaceRef.current = undefined;
                legendModifierRef.current = undefined;
            });
        };
    }, []);

    const handleChangePlacement = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (legendModifierRef.current) {
            const newValue = +event.target.value as ELegendPlacement;
            setPlacementValue(newValue);
            legendModifierRef.current.sciChartLegend.placement = newValue;
        }
    };

    const handleChangeOrientation = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (legendModifierRef.current) {
            const newValue = +event.target.value as ELegendOrientation;
            setOrientationValue(newValue);
            legendModifierRef.current.sciChartLegend.orientation = newValue;
        }
    };

    const handleChangeShowLegend = (event: React.ChangeEvent<{ checked: boolean }>) => {
        if (legendModifierRef.current) {
            const newValue = event.target.checked;
            setShowLegendValue(newValue);
            legendModifierRef.current.sciChartLegend.showLegend = newValue;
        }
    };

    const handleChangeShowCheckboxes = (event: React.ChangeEvent<{ checked: boolean }>) => {
        if (legendModifierRef.current) {
            const newValue = event.target.checked;
            setShowCheckboxesValue(newValue);
            legendModifierRef.current.sciChartLegend.showCheckboxes = newValue;
        }
    };

    const handleChangeShowSeriesMarkers = (event: React.ChangeEvent<{ checked: boolean }>) => {
        if (legendModifierRef.current) {
            const newValue = event.target.checked;
            setShowSeriesMarkersValue(newValue);
            legendModifierRef.current.sciChartLegend.showSeriesMarkers = newValue;
        }
    };

    const useStyles = makeStyles(theme => ({
        flexContainer: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%"
        },
        toolbar: {
            minHeight: "70px",
            padding: "10",
            color: appTheme.ForegroundColor,
            fontSize: "13px",
            flex: "none"
            // flexBasis: "70px"
        },
        combobox: {
            color: appTheme.Background,
            backgroundColor: appTheme.ForegroundColor,
            margin: "10"
        },
        chartElement: {
            width: "100%",
            flex: "auto"
        }
    }));
    const localClasses = useStyles();

    return (
        <React.Fragment>
            <div className={classes.FullHeightChartWrapper} style={{ background: appTheme.DarkIndigo }}>
                <div className={localClasses.flexContainer}>
                    {/*The toolbar is here*/}
                    <div className={localClasses.toolbar}>
                        Show Legend?
                        <Checkbox checked={showLegendValue} onChange={handleChangeShowLegend} />
                        Show Visibility Checkboxes?
                        <Checkbox checked={showCheckboxesValue} onChange={handleChangeShowCheckboxes} />
                        Show Series Markers?
                        <Checkbox checked={showSeriesMarkersValue} onChange={handleChangeShowSeriesMarkers} />
                        <label id="sciChartPlacement-label">
                            Legend Placement
                            <select
                                className={localClasses.combobox}
                                id="sciChartPlacement"
                                value={placementValue}
                                onChange={handleChangePlacement}
                            >
                                {placementSelect.map(el => (
                                    <option key={el.value} value={el.value}>
                                        {el.text}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label id="sciChartPlacement-label">
                            Legend Orientation
                            <select
                                className={localClasses.combobox}
                                id="sciChartOrientation"
                                value={orientationValue}
                                onChange={handleChangeOrientation}
                            >
                                {orientationSelect.map(el => (
                                    <option key={el.value} value={el.value}>
                                        {el.text}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    {/*The chart will be located here*/}
                    <div style={{ flex: "auto" }}>
                        <div id={divElementId} style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
