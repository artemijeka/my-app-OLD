import c from './Testings.module.css';

function Testings() {

  const name = 'Artem';
  const span = <span className={c.name} data-name={name}>{name}</span>;
  const reactElement = (
    <div className="test" data-test="test" tabIndex="0">
      {span}
    </div>
  );

  return reactElement;

}

export default Testings;