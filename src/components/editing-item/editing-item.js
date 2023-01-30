export default function EditingItem({ editing, editingValue, onItemChange }) {
  const onSubmit = () => {
    onItemChange(document.getElementsByClassName('edit')[0].value, editingValue.id);
  };

  if (editing === true) {
    return (
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" defaultValue={editingValue.taskName} />
      </form>
    );
  }
}
