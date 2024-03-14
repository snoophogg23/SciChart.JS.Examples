import { FC, Fragment, useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { TMenuItem } from "../AppRouter/examples";
import { useLocation } from "react-router-dom";
import MenuListItemText from "../../helpers/shared/MenuListItemText/MenuListItemText";
import classes from "./ListItemsBlock.module.scss";
import ListItemCollapseArrowIcon from "./ListItemCollapseArrowIcon";
import { FrameworkContext } from "../../helpers/shared/Helpers/FrameworkContext";

type TProps = {
    onExpandClick: (id: string) => void;
    checkIsOpened: (id: string) => boolean;
    historyPushPath: (path: string) => void;
    title: string;
    menuItems: TMenuItem[];
    menuItemsId: string;
};

const ListItemsBlock: FC<TProps> = (props) => {
    const location = useLocation();
    const selectedFramework = useContext(FrameworkContext);
    console.log("ListItemsBlock selectedFramework", selectedFramework);
    const { onExpandClick, checkIsOpened, historyPushPath, title, menuItems, menuItemsId } = props;

    return (
        <div className={classes.ListItemBlock}>
            <div onClick={() => onExpandClick(menuItemsId)} className={classes.CollapsibleMenuListItem}>
                <MenuListItemText text={title} className={classes.MenuListItemText} />
                <ListItemCollapseArrowIcon
                    className={classes.CollapseArrowButton}
                    isCollapseOpened={checkIsOpened(menuItemsId)}
                />
            </div>
            <Collapse in={checkIsOpened(menuItemsId)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {menuItems.map((el) => (
                        <Fragment key={el.item.id}>
                            <div className={classes.CollapsibleMenuListItem} onClick={() => onExpandClick(el.item.id)}>
                                <MenuListItemText text={el.item.name} className={classes.SecondLevelMenuListItemText} />
                                <ListItemCollapseArrowIcon
                                    className={classes.CollapseArrowButton}
                                    isCollapseOpened={checkIsOpened(el.item.id)}
                                />
                                {/*{isOpened[el.item.id] ? <ExpandLess /> : <ExpandMore />}*/}
                            </div>
                            <Collapse in={checkIsOpened(el.item.id)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {el.submenu.map((subEl) => (
                                        <div
                                            key={subEl.id}
                                            className={
                                                location.pathname === subEl.path(selectedFramework)
                                                    ? classes.SelectedBottomLevelListItem
                                                    : classes.BottomLevelListItem
                                            }
                                            onClick={() =>
                                                historyPushPath(`${selectedFramework}${subEl.path(selectedFramework)}`)
                                            }
                                        >
                                            <a
                                                className={classes.ExampleLink}
                                                href={`${selectedFramework}${subEl.path(selectedFramework)}`}
                                                title={subEl.title}
                                            >
                                                {subEl.title}
                                            </a>
                                            {/*<ListItemText*/}
                                            {/*    className={classes.listItemText2}*/}
                                            {/*    primary={subEl.title}*/}
                                            {/*    primaryTypographyProps={{ variant: "body2" }}*/}
                                            {/*/>*/}
                                        </div>
                                    ))}
                                </List>
                            </Collapse>
                        </Fragment>
                    ))}
                </List>
            </Collapse>
        </div>
    );
};

export default ListItemsBlock;
