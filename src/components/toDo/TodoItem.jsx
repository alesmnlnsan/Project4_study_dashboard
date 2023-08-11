// import React, { useState } from 'react';
// import axios from 'axios';

// export default function TodoItem({
//   item,
//   onCheck,
//   onDelete,
//   onEdit,
//   user_id,
// }) {
//   const [editing, setEditing] = useState(false);
//   const [editedText, setEditedText] = useState(item.text);

//   const handleCheck = async (e) => {
//     try {
//       await axios.put(`/api/todo/${item.id}/${user_id}`, { completed: e.target.checked });
//       onCheck(item.id, e.target.checked);
//     } catch (error) {
//       console.log('Error updating item', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/todo/${item.id}/${user_id}`);
//       onDelete(item.id);
//     } catch (error) {
//       console.log('Error deleting item', error);
//     }
//   };

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleCancel = () => {
//     setEditing(false);
//     setEditedText(item.text);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`/api/todo/${item.id}/${user_id}`, { item: editedText });
//       onEdit(item.id, editedText);
//       setEditing(false);
//     } catch (error) {
//       console.log('Error editing item', error);
//     }
//   };

//   return (
//     <div className='todo-item'>
//       <span onClick={handleDelete} className='delete-btn'>
//         Delete
//       </span>
//       <div className={`todo ${item.completed ? 'completed' : ''}`}>
//         {editing ? (
//           <div>
//             <input
//               type='text'
//               value={editedText}
//               onChange={(e) => setEditedText(e.target.value)}
//             />
//             <button onClick={handleSave}>Save</button>
//             <button onClick={handleCancel}>Cancel</button>
//           </div>
//         ) : (
//           <div>
//             <label>
//               <input
//                 type='checkbox'
//                 checked={item.completed}
//                 onChange={handleCheck}
//               />
//               {item.text}
//             </label>
//             <button onClick={handleEdit}>Edit</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
