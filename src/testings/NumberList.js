function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Здесь строковый атрибут key требует React.
    // Ключи помогают React определять, какие элементы были изменены, 
    // добавлены или удалены. Их необходимо указывать, 
    // чтобы React мог сопоставлять элементы массива с течением времени:
    <li key={number.toString()}>{number}</li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

export default NumberList;