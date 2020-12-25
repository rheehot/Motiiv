import axios from 'axios';

// const url = 'http://127.0.0.1:5000/api/members';
const url = 'http://3.139.176.195:4000';

const getPostList = async () => {
    try {
        const { data } = await axios.get(`${url}/post`);
        return data.data;
    } catch (e) {
        console.error('[FAIL] GET_POST_LIST ANSWER', e);
        return e;
    }
}
const getPostDetail = async (id) => {
    try {
        const { data } = await axios.get(`${url}/post/${id}/detail`);
        return data.data;
    } catch (e) {
        console.error('[FAIL] GET_POST_DETAIL ANSWER', e);
        return e;
    }
}
const getCommentList = async (id) => {
    try {
        const { data } = await axios.get(`${url}/post/${id}/getcomment`);
        return data.data;
    } catch (e) {
        console.error('[FAIL] GET_COMMENT_LIST ANSWER', e);
        return e;
    }
}
const createComment = async (id, content) => {
    try {
        const { data } = await axios.post(`${url}/post/${id}/createcomment`,{
            UserId : 3,
            content: content
        });
        return data.data;
    } catch (e) {
        console.error('[FAIL] CREATE_COMMENT ANSWER', e);
        return e;
    }
}
const deleteComment = async (comment_id) => {
    try {
        const { data } = await axios.delete(`${url}/post/${comment_id}/deletecomment`);
        return data.data;
    } catch (e) {
        console.error('[FAIL] DELETE_COMMENT ANSWER', e);
        return e;
    }
}
export {
    getPostList,
    getPostDetail,
    getCommentList,
    createComment,
    deleteComment
};