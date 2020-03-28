import React from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>ATTN</th>
                <th>From</th>
                <th>Subject</th>
                <th>First Paragraph</th>
                <th>Unit</th>
                <th>Date</th>
                <th>Duty Title</th>
                <th>Rank</th>
                <th>Name</th>
                <th>Branch</th>
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
                <td>{row.unit}</td>
                <td>{row.date}</td>
                <td>{row.dutytitle}</td>
                <td>{row.rank}</td>
                <td>{row.writersname}</td>
                <td>{row.branch}</td>
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
