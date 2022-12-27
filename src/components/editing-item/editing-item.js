export default function EditingItem(props) {
  const { editing, editingValue, onItemChange } = props;
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      onItemChange(document.getElementsByClassName('edit')[0].value, editingValue.id);
    }
  };

  if (editing === true) {
    return (
      <input
        type="text"
        className="edit"
        defaultValue={editingValue.taskName}
        onKeyUp={(e) => handleKeyUp(e, editingValue.id)}
      />
    );
  }
}
