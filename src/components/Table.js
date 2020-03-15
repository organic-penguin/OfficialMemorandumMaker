import React from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>ATTN</th>
                <th>From</th>
                <th>Subject</th>
                <th>First Paragraph</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.memorandumData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.attn}</td>
                <td>{row.from}</td>
                <td>{row.subject}</td>
                <td>{row.para1}</td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}



const MemorandumDataClass = (props) => {
    const { memorandumData } = props;
        return (
            <table>
                <TableHeader />
                <TableBody memorandumData={memorandumData} />
            </table>
        );
}

export default MemorandumDataClass;
