import React, { useState } from "react";

// Components
import Button from "../Button";

// Styles
import { Wrapper, Content, Table } from './List.styles';

// Types
type ColumnConfig = {
    name: string,
    shouldBeInForm: boolean

}
type Props = {
    header: string,
    columnConfig: ColumnConfig[],
    submitCallback: ({}) => void
}


const List: React.FC<Props> = ({ header, columnConfig, submitCallback, children }) => {
    const [showAddNew, setShowAddNew] = useState(false);
    const [addNewInputActive, setAddNewInputActive] = useState(false);

    const [formData, setFormData] = useState({});

    const addNewHandler = () => {
        setShowAddNew(!showAddNew);
        setAddNewInputActive(!addNewInputActive);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('Submit');
        event.preventDefault();
        console.log(submitCallback);
        submitCallback(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
    <Wrapper>
        <Content>
            <h1>{header}</h1>
            <Table>
                <thead>
                    <tr>
                        {columnConfig.map(column => (
                            <th>{column.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                    {showAddNew &&
                    <tr className={addNewInputActive ? 'active' : ''} >
                        <td colSpan={columnConfig.length}>
                            <form onSubmit={handleSubmit}>
                            {columnConfig.map(column => (
                                column.shouldBeInForm ?
                                <input
                                    type='text'
                                    name={column.name}
                                    placeholder={column.name}
                                    onChange={handleChange}
                                />
                                :
                                    <span></span>

                            ))}
                            <button type='submit'>add</button>
                            </form>
                        </td>
                    </tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={columnConfig.length}>
                            <Button
                                text={'add new'}
                                callback={addNewHandler}
                                clickable={true}/>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Content>
    </Wrapper>
)};

export default List;