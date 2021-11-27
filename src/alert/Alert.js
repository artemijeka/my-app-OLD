import './alert.scss';

export default function Alert(props) {
  return (
    <strong className={`alert ${props.className}`}>{props.text}</strong>
  );
}