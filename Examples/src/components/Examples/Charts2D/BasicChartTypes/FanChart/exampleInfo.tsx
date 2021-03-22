import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { GalleryItem } from "../../../../../helpes/types/types";
import { TDocumentationLink } from "../../../../../helpes/types/ExampleDescriptionTypes";
import bandChart from "../BandSeriesChart/javascript-band-chart.jpg";
import ExampleDescription from "../../../../ExampleDescription/ExampleDescription";

const description = `Demonstrates how to create a JavaScript Fan Chart. This chart type can be used for visualizing forecasting
or estimation figures and can be achieved in SciChart.js using several Band Series overlaid with varying
opacity.`;
const tips = [
    `As well as stroke, you can set strokeThickness, isVisible properties to change how the series is rendered.`
];

const documentationLinks: TDocumentationLink[] = [
    {
        href: ExampleStrings.urlDocumentationHome,
        title: ExampleStrings.titleDocumentationHome,
        linkTitle: "SciChart.js Documentation Home"
    },
    {
        href: ExampleStrings.urlTutorialsHome,
        title: ExampleStrings.titleTutorialsHome,
        linkTitle: "SciChart.js Tutorials"
    },
    {
        href: ExampleStrings.urlFanChartDocumentation,
        title: ExampleStrings.urlTitleFanChartDocumentation,
        linkTitle: "JavaScript Fan Chart Documentation"
    },
    {
        href: ExampleStrings.urlRenderSeriesPropertiesDocumentation,
        title: ExampleStrings.urlTitleRenderSeriesProperties,
        linkTitle: "Common RenderableSeries Properties"
    }
];

const seeAlso: GalleryItem[] = [
    {
        chartGroupTitle: "See also",
        items: [
            {
                imgPath: bandChart,
                title: ExampleStrings.titleBandChart,
                seoTitle: ExampleStrings.urlTitleBandChart,
                examplePath: ExampleStrings.urlBandChart
            }
        ]
    }
];

const Subtitle = () => (
    <p>
        Demonstrates how to create a <strong>JavaScript Fan Chart</strong> using SciChart.js, High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

const Description = () => (
    <div>
        <ExampleDescription
            documentationLinks={documentationLinks}
            tips={tips}
            description={description}
        />
    </div>
);
export const fanChartExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleFanChart,
    path: ExampleStrings.urlFanChart,
    subtitle: Subtitle,
    description: Description,
    seeAlso,
    code,
    githubUrl,
    seoDescription:
        "Demonstrates how to create a JavaScript Fan Chart. This chart type can be used for visualizing forecasting or " +
        "estimation figures and can be achieved in SciChart.js using several Band Series overlaid with varying opacity.",
    seoKeywords: "fan, chart, javascript, webgl, canvas",
    thumbnailImage: "javascript-fan-chart.jpg"
};
