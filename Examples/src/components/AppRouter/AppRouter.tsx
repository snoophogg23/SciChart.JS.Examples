import * as React from "react";
import { Routes, Route, RouteProps } from "react-router-dom";
import PageHome from "../PageHome/PageHome";
import { EPageFramework, PAGES } from "./pages";
import { EXAMPLES_PAGES, TExamplePage } from "./examplePages";
import ExamplesRoot from "../Examples/ExamplesRoot";
import { getExampleComponent } from "./examples";
import classes from "../Examples/styles/Examples.module.scss";
import { GalleryItem } from "../../helpers/types/types";
import NoIndexTag from "../SeoTags/NoIndexTag";
import { InfoToolbar } from "../Examples/Toolbar";
import { FrameworkContext } from "../../helpers/shared/Helpers/FrameworkContext";
import { useContext } from "react";
type TProps = {
    currentExample: TExamplePage;
    isIFrame?: boolean;
    seeAlso: GalleryItem[];
};

const examplePagesKeys = Object.keys(EXAMPLES_PAGES);

const ExampleComponent = React.memo((props: { children: React.ReactNode; examplePage: TExamplePage }) => {
    return (
        <>
            <InfoToolbar examplePage={props.examplePage} />
            {props.children}
        </>
    );
});

export default function AppRouter(props: TProps) {
    const { currentExample, seeAlso, isIFrame = false } = props;
    const selectedFramework = useContext(FrameworkContext);

    if (isIFrame) {
        const ChartComponent = getExampleComponent(currentExample.id);

        return (
            <div className={classes.ExampleWrapperIFrame}>
                <NoIndexTag />
                <Routes>
                    {examplePagesKeys.map((key) => {
                        const exPage = EXAMPLES_PAGES[key];
                        return (
                            <Route
                                key={key}
                                path={`/iframe${exPage.path(EPageFramework.Vanilla)}`}
                                element={
                                    <ExampleComponent examplePage={currentExample}>
                                        <ChartComponent />
                                    </ExampleComponent>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        );
    } else {
        return (
            <Routes>
                {examplePagesKeys.map((key) => {
                    const exPage = EXAMPLES_PAGES[key];
                    return (
                        <Route
                            key={key}
                            path={`/${selectedFramework}?${exPage.path(selectedFramework)}`}
                            element={<ExamplesRoot examplePage={currentExample} seeAlso={seeAlso} />}
                        />
                    );
                })}
                <Route path={PAGES.homapage.path(selectedFramework)} element={<PageHome />} />
                <Route path={"/"} element={<PageHome />} />
            </Routes>
        );
    }
}
