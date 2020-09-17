export const code = `
import * as React from "react";
import {SciChart3DSurface} from "scichart3d/Charting3D/Visuals/SciChart3DSurface";
import {NumericAxis3D} from "scichart3d/Charting3D/Visuals/Axis/NumericAxis3D";
import {CameraController} from "scichart3d/Charting3D/CameraController";
import {Vector3} from "scichart3d/Charting3D/Vector3";
import {MouseWheelZoomModifier3D} from "scichart3d/Charting3D/ChartModifiers/MouseWheelZoomModifier3D";
import {OrbitModifier3D} from "scichart3d/Charting3D/ChartModifiers/OrbitModifier3D";
import {PixelPointMarker3D} from "scichart3d/Charting3D/Visuals/PointMarkers/DefaultPointMarkers";
import {ScatterRenderableSeries3D} from "scichart3d/Charting3D/Visuals/RenderableSeries/ScatterRenderableSeries3D";
import {TSciChart3D} from "scichart3d/types/TSciChart3D";
import {EColorMapMode, TLinearColorMap} from "scichart3d/types/TLinearColorMap";
import {EColor} from "scichart3d/types/Color";
import {XyzDataSeries3D} from "scichart3d/Charting3D/Model/DataSeries/XyzDataSeries3D";
import {AscData, AscReader} from "./AscReader";
import {linearColorMapLerp} from "scichart3d/utils/colorUtil";

const divElementId = "chart";

type TMetadata = {
    vertexColorAbgr: number;
    pointScale: number;
};

const drawExample = async () => {
    // Create a SciChart3DSurface
    const { wasmContext, sciChart3DSurface } = await SciChart3DSurface.create(divElementId);

    // Create and attach a camera to the 3D Viewport
    sciChart3DSurface.camera = new CameraController(wasmContext, {
        position: new Vector3(300, 300, 300),
        target: new Vector3(0, 50, 0)
    });

    // Add an X,Y,Z axis to the viewport
    sciChart3DSurface.xAxis = new NumericAxis3D(wasmContext, { axisTitle: "X Axis" });
    sciChart3DSurface.yAxis = new NumericAxis3D(wasmContext, { axisTitle: "Y Axis" });
    sciChart3DSurface.zAxis = new NumericAxis3D(wasmContext, { axisTitle: "Z Axis" });

    // Create a 3D Scatter series uing pixel point marker, a high performance single pixel applied per x,y,z data-point
    // The dataseries is type XyzDataSeries3D which is created and returned from getData function
    const series = new ScatterRenderableSeries3D(wasmContext, {
        pointMarker: new PixelPointMarker3D(wasmContext, { fill: "#00FF00" }),
        dataSeries: getData(wasmContext),
    });
    sciChart3DSurface.renderableSeries.add(series);

    // Add interactivity modifiers for orbiting and zooming with the mousewheel
    sciChart3DSurface.chartModifiers.add(new MouseWheelZoomModifier3D());
    sciChart3DSurface.chartModifiers.add(new OrbitModifier3D());

    return { wasmContext, sciChart3DSurface };
};

function getData(wasmContext: TSciChart3D) {
    // The LinearColorMap type in SciChart allows you to generate a colour map based on a
    // minimum and maximum value, e.g. min=0, max=50 means the gradient brush below is mapped into that range
    //
    const colorMap: TLinearColorMap = {
        Minimum: 0,
        Maximum: 50,
        Mode: EColorMapMode.Interpolated,
        GradientStops: [
            { color: EColor.DodgerBlue, offset: 0 },
            { color: EColor.LimeGreen, offset: 0.2 },
            { color: EColor.Orange, offset: 0.5 },
            { color: EColor.OrangeRed, offset: 0.7 },
            { color: EColor.Purple, offset: 1 }
        ]
    };

    // Read the ASC Lidar data file with optional color map data
    const reader: AscReader = new AscReader(height => {
        // Linearly interpolate each heightValue into a colour and return to the ASCReader
        // This will be injected into the SciChart XyzDataSeries3D to colour points in the point-cloud
        return linearColorMapLerp(colorMap, height);
    });
    const ascData: AscData = reader.readFileToAscData("TODO");

    // Prepare metadata
    const meta: TMetadata[] = ascData.ColorValues.map(c => ({
        vertexColorAbgr: c,
        pointScale: 0
    }));

    const xyzDataSeries = new XyzDataSeries3D(wasmContext);
    xyzDataSeries.appendRange(ascData.XValues, ascData.YValues, ascData.ZValues, meta);

    return xyzDataSeries;
}

export default function LiDAR3DPointCloudDemo() {
    const [sciChart3DSurface, setSciChart3DSurface] = React.useState<SciChart3DSurface>();

    React.useEffect(() => {
        (async () => {
            const res = await drawExample();
            setSciChart3DSurface(res.sciChart3DSurface);
        })();
        // Delete sciChartSurface on unmount component to prevent memory leak
        return () => sciChart3DSurface?.delete();
    }, []);

    return (
        <React.Fragment>
            <div id={divElementId} style={{ maxWidth: 900 }} />
        </React.Fragment>
    );
}

`;