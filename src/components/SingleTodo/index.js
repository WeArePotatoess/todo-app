import style from './SingleTodo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function index({ task, removeTask, handleChangeStat }) {
    function handleDelete(e) {
        removeTask(task.id)
    }
    function changeStat(e) {
        if (e.target.tagName !== 'path') {
            handleChangeStat(task.id);
        }
    }
    return (
        <li
            onClick={changeStat}
            className={`${style.single_todo} ${task.completed ? style.done_task : style.todo_task}`}
        >
            <div >
                {task.name}
                <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
            </div>
        </li>
    )
}
