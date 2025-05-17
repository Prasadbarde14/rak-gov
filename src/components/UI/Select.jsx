
const Select = ({options,className}) => {
  return (
    <select className={className}>
        {options.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
        ))}
    </select>
  )
}

export default Select