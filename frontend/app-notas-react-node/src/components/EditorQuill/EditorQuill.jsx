import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditorQuill = (props) => {
    return (
        <>
            <ReactQuill theme="snow" value={props.valorCuerpo} onChange={props.setValorCuerpo} />
        </>
    )
}

export default EditorQuill