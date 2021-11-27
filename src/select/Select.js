// import './select.scss';

export default function Select(props) {
  return (
    <select id={props.id} className={`select ${props.className}`}>
      {props.optionsList}
    </select>
  );
}