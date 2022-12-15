import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { GalleryItem } from "../../../../../helpers/types/types";
import { TDocumentationLink } from "../../../../../helpers/types/ExampleDescriptionTypes";
import exampleImage from "./javascript-chart-annotations.jpg";

const previewDescription = `An introduction to the Annotations API in SciChart.js, which allows SVG elements or custom WebGL rendered
elements to be placed over the chart at specific X,Y data-values.`;
const description = `Several annotations are available out of the box, such as LineAnnotation, BoxAnnotation, TextAnnotation, and
we provide a CustomAnnotation and SVGAnnotation which allows for custom shapes to be placed over the chart.`;
const tips = [
    `The AnnotationBase type has properties for x,yCoordinateMode which allow you to place annotations are
    relative or absolute values. Great for docking annotations to the top,left,right,bottom of a chart, or
    creating watermarks!`
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
        href: ExampleStrings.urlAnnotationsDocumentation,
        title: ExampleStrings.urlTitleAnnotationsDocumentation,
        linkTitle: "Annotations API Documentation"
    }
];

const Subtitle = () => (
    <p>
        Demonstrates how to add Annotations (shapes, boxes, lines, text) to a <strong>JavaScript Chart</strong> using
        SciChart.js, High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank">
            JavaScript Charts
        </a>
    </p>
);

export const annotationsAreEasyExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleAnnotationsAreEasy,
    pageTitle: ExampleStrings.titleAnnotationsAreEasy + ExampleStrings.exampleGenericTitleSuffix,
    path: ExampleStrings.urlAnnotationsAreEasy,
    subtitle: Subtitle,
    documentationLinks,
    tips,
    description,
    previewDescription,
    githubUrl,
    metaDescription:
        "Demonstrates how to place Annotations (lines, arrows, markers, text) over a JavaScript Chart using SciChart.js Annotations API",
    metaKeywords: "annotations, chart, api, javascript, webgl, canvas",
    thumbnailImage: exampleImage
};
