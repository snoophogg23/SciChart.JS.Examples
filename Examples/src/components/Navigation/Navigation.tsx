import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    MENU_ITEMS_2D,
    MENU_ITEMS_3D,
    MENU_ITEMS_FEATURED_APPS,
    MENU_ITEMS_2D_ID,
    MENU_ITEMS_3D_ID,
    MENU_ITEMS_FEATURED_APPS_ID,
    MENU_ITEMS_WHATSNEW,
    MENU_ITEMS_WHATSNEW_ID
} from "../AppRouter/examples";
import ListItemsBlock from "./ListItemsBlock";
import classes from "./Navigation.module.scss";

type TProps = {
    onExpandClick: (id: string) => void;
    testIsOpened: (id: string) => boolean;
    toggleDrawer: () => void;
};

const Navigation: React.FC<TProps> = props => {
    const { onExpandClick, testIsOpened, toggleDrawer } = props;
    const history = useHistory();
    const location = useLocation();

    const historyPushPath = (path: string) => {
        if (!path) return;
        history.push(path);
        toggleDrawer();
    };

    const historyPushHomepage = () => {
        history.push("/");
        toggleDrawer();
    };

    return (
        <List
            className={classes.NavigationList}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <div
                className={location.pathname === "/" ? classes.SelectedHomepageListItem : classes.HomepageListItem}
                onClick={historyPushHomepage}
            >
                Homepage
            </div>
            <ListItemsBlock
                onExpandClick={onExpandClick}
                checkIsOpened={testIsOpened}
                historyPushPath={historyPushPath}
                title="What's New"
                menuItems={MENU_ITEMS_WHATSNEW}
                menuItemsId={MENU_ITEMS_WHATSNEW_ID}
            />
            <ListItemsBlock
                onExpandClick={onExpandClick}
                checkIsOpened={testIsOpened}
                historyPushPath={historyPushPath}
                title="Featured Apps"
                menuItems={MENU_ITEMS_FEATURED_APPS}
                menuItemsId={MENU_ITEMS_FEATURED_APPS_ID}
            />
            <ListItemsBlock
                onExpandClick={onExpandClick}
                checkIsOpened={testIsOpened}
                historyPushPath={historyPushPath}
                title="2D Charts"
                menuItems={MENU_ITEMS_2D}
                menuItemsId={MENU_ITEMS_2D_ID}
            />
            <ListItemsBlock
                onExpandClick={onExpandClick}
                checkIsOpened={testIsOpened}
                historyPushPath={historyPushPath}
                title="3D Charts"
                menuItems={MENU_ITEMS_3D}
                menuItemsId={MENU_ITEMS_3D_ID}
            />
        </List>
    );
};

export default Navigation;
