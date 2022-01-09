import React from "react";

// Styles
import { Wrapper } from "./ListItem.styles";
import {Link} from "react-router-dom";
import LinkButton from '../LinkButton';


// Types
type Props = {
    url: string,
    items: any[],
    canDelete?: boolean,
    deleteCallback?: () => void,
}

const ListItem: React.FC<Props> = ({ url, items, canDelete, deleteCallback }) => (
        <Wrapper>
            {items.map(item => (<td>{item}</td>))}
            {url && <Link to={url}><td>link</td></Link>}
            {canDelete && deleteCallback && <td className='delete'><LinkButton
                text='X'
                clickable={true}
                callback={deleteCallback} /></td>}
        </Wrapper>

)

export default ListItem;