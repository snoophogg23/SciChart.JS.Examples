import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examples";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";

const Description = () => (
    <div>Performance demo showing SciChart.js loading 500 series each with 500 points description</div>
);
const Subtitle = () => (<p>Click <strong>Load</strong> to see SciChart.js create 500 Series,{' '}
    each with 500 points instantly!</p>);

export const load500By500ExampleInfo: TExampleInfo = {
    title: "Load 500 Series x 500 Points Performance Demo",
    path: "/featuredApps_performanceDemos_Load500By500",
    subtitle: Subtitle,
    description: Description,
    code,
    githubUrl,
};