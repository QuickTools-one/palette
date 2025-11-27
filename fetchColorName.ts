import {ColorItem} from "./ColorItem.type";
import getColorName from "named-web-colors";

const fetchColorName = (color: ColorItem): string => {
    const result = getColorName(color.hex);
    return result?.name ?? color.hex;
};

export default fetchColorName
