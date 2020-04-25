import React from "react"
const ParagraphInputs = (props) => {
  return (
    props.paragraphArray.map((val, index)=> {
      let paraID = `paragraph-${index +2}`

      return (
        <div key={index} class="col100">
          <label htmlFor={paraID}>{`Paragraph #${index + 2}`}</label>
          <textarea
          style={{height:'10%'}}
            type="text"
            name={paraID}
            data-id={index}
            id={paraID}
            placeholder={`Insert Paragraph ${index + 2}`}
            value={props.paragraphArray[index].paraInfo}
            className="paraInfo"
          />
        </div>
      )
    })
  )
}
export default ParagraphInputs
