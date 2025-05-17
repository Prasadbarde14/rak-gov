
const Select = ({options,className,selected,handleSelect}) => {
  return (
    <select className={className} value={selected} onChange={(e)=>handleSelect(e.target.value)}>
        {options.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
        ))}
    </select>
  )
}

export default Select