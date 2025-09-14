import axios from 'axios';

function Notification({ student, message, course, id }) {
    console.log(id);
    const joinCourseApi = `${import.meta.env.VITE_BE_API_BASE_URL}/me/join`;
    const handleSubmitJoinCourse = () => {
        axios.put(joinCourseApi, {
            requestId: id,
            status: 'approved',
        });
    };
    return (
        <div>
            <p>{`${student.username} ${message} `}</p>
            <button type="submit" onClick={handleSubmitJoinCourse}>
                Xác nhận{' '}
            </button>
        </div>
    );
}

export default Notification;
