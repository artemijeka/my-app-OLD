import './select.scss';

export default function Select(props) {
  return (
    <select
      id={props.id}
      className={`select ${props.className}`}
      defaultValue={props.defaultValue}
    >
      {props.optionsList}
    </select>
  );
}