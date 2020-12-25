import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading/Loading';
import {getCommentList, getPostDetail, createComment, deleteComment} from '../lib/api/Post';
import { DeleteOutlined } from '@ant-design/icons';

const Template = styled.div`
    width: 60%;
    display: flex;
    min-width: 50rem;
    flex-direction: column;
    //align-items: center;
    margin: 7% 20%;
`;
const VideoInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    //border: 1px solid rgba(188,224,253,1);
    //border-top: none;
`;
const TitleText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
`;
const Views = styled.div`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;
const DeleteButton = styled.div`
    display: none;
    font-size: 1.5rem;
    margin-left: 1rem;
    padding: 0.5rem;
    border-radius: 20%;
    color: red;
`;
const UserInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    &:hover{
        ${DeleteButton}{
            display: flex;
            background-color: rgb(0,0,0,0.1);
        }
    }
`;
const Avatar = styled.div`
    font-size: 3rem;
    color: rgba(188,224,253,1);
    margin-right: 0.5rem;
`;
const UserName = styled.div`
    font-size:2rem;
    font-weight:bold;
`;
const Comment = styled.div`
    font-size: 1.5rem;
`;
const UserInfo = styled.div`
    display:flex;
    align-items:center;
    margin-bottom: 1rem;
`;
const VideoComment = styled.div`
    display: flex;
    flex-direction:column;
    margin-top: 7rem;
`;
const AddComemntBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;
const Text = styled.div`
    font-size: 2rem;
`;
const SearchBarBox = styled.form`
    display: flex;
    height: 4rem; 
`;
const SearchBarText = styled.input`
    //color: rgba(126,196,253,1);
    border: 1px solid rgba(126,196,253,1);
    width: 100%;
    font-size:1.5rem;
`;
const SubmitButton = styled.button`
    height: 4rem;
    color: rgba(188,224,253,1);
    background-color: rgba(39,153,251,1);
    font-size:1rem;
    border: none;
    
`;
const LikeBox = styled.div`
    display: flex;
    color: rgba(51,157,251,1);
`;
const LikeIcon = styled.div`
    font-size: 1.5rem;
    cursor: pointer;
`;
const LikeText = styled.div`
    font-size: 1.3rem;
    margin-right:1rem;
    margin-left: 0.3rem;
    //margin-bottom: 2rem;
`;
function Detail({props}) {
    const [comment, SetComment] = useState("");
    const [postStatus,SetPostStatus] = useState({
        status: 'idle',
        title: null,
        description: null,
        videoURL: null,
        likeCnt: null,
        view_count: null,
        nickName: null,
        profileImage: null
    });
    const [commentStatus, SetCommentStatus] = useState({
        status: 'idle',
        commentInfo: null,
    });

    useEffect(()=>{
        SetPostStatus({...postStatus, status: 'pending'});
        SetCommentStatus({...commentStatus, status: 'pending'});
        try { 
            (async() => {
              const result_post = await getPostDetail(props.match.params.idx);
              //console.log(props);
                  SetPostStatus({
                  status: 'resolved',
                  postInfo: result_post,
              });
              console.log('result_post : ', result_post);
              const result_comment = await getCommentList(props.match.params.idx);
              SetCommentStatus({
                  status: 'resolved',
                  commentInfo: result_comment.writtenpost,
              });
              console.log('result_comment : ', result_comment.writtenpost);
            })();
        } catch (error) {
          SetPostStatus({...postStatus , status: 'rejected'});
          SetCommentStatus({...commentStatus, status: 'rejected'});
        }
    },[])

    const onHandleCommentText = (evt) => {
        SetComment(evt.target.value);
    }
    const onHandleCommentSubmit = async (evt) => {
        evt.preventDefault();
        try{
            await createComment(props.match.params.idx, comment);
            SetCommentStatus({...commentStatus, status: 'pending'});
            const result_comment = await getCommentList(props.match.params.idx);
              SetCommentStatus({
                  status: 'resolved',
                  commentInfo: result_comment.writtenpost,
              });
              console.log('result_comment : ', result_comment.writtenpost);
        }catch(err){
            console.log(err);
            SetCommentStatus({...commentStatus, status: 'rejected'});
        }
    }
    const onHandleDeleteButton = async (evt)=>{
        
        try{
            console.log(evt.currentTarget.attributes.id.value);
            await deleteComment(evt.currentTarget.attributes.id.value);
            SetCommentStatus({...commentStatus, status: 'pending'});
            const result_comment = await getCommentList(props.match.params.idx);
              SetCommentStatus({
                  status: 'resolved',
                  commentInfo: result_comment.writtenpost,
              });
              console.log('result_comment : ', result_comment.writtenpost);
        }catch(err){
            console.log(err);
            SetCommentStatus({...commentStatus, status: 'rejected'});
        }
    }
    return (
        <Template>
            {
                postStatus.status === 'pending'? <Loading></Loading>
                : postStatus.status === 'resolved'?
                <>
                    <section class="player" >
                            <iframe width="100%" style={{height: "35vw", minHeight: "30rem", minWidth: "50rem"}} src={postStatus.postInfo.videoURL} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </section>
                    <VideoInfoBox>
                        <TitleText>{postStatus.postInfo.title}</TitleText>
                        <Views>조회수&nbsp;{postStatus.postInfo.view_count}회</Views>
                        <UserInfoBox>
                            <UserInfo>
                                <Avatar><i class="fas fa-user-circle"></i></Avatar>
                                <UserName>{postStatus.postInfo.User.nickName} 님이 작성한 모티브</UserName>
                            </UserInfo>
                            <Comment>{postStatus.postInfo.description}</Comment>
                        </UserInfoBox>
                    </VideoInfoBox>
                </>
                : null
            }
            <VideoComment>
                <AddComemntBox>
                    <Text>한줄 평 달기</Text>
                    <SearchBarBox onSubmit={onHandleCommentSubmit}>
                        <SearchBarText onChange={onHandleCommentText} type="text" name="comment_input" placeholder="Type Comment"></SearchBarText>
                        <SubmitButton>COMMENT</SubmitButton>
                    </SearchBarBox>
                </AddComemntBox>
                {
                    commentStatus.status === 'pending' ? <Loading></Loading>
                    : commentStatus.status === 'resolved' && commentStatus.commentInfo.length?
                    commentStatus.commentInfo.map((comment, idx)=>(
                        <UserInfoBox key={`UserInfo-${idx}`}>
                            <UserInfo>
                                <Avatar><i class="fas fa-user-circle"></i></Avatar>
                                <UserName>{comment.nickName}</UserName>
                                <DeleteButton id={comment.Comment.Id} onClick={onHandleDeleteButton}><DeleteOutlined /></DeleteButton>
                            </UserInfo>
                            <Comment>{comment.Comment.content}</Comment>
                            <LikeBox>
                                <LikeIcon><i class="fas fa-heart"></i></LikeIcon>
                                <LikeText>0</LikeText>
                            </LikeBox>
                        </UserInfoBox>
                    ))
                    :null
                }
            </VideoComment>
        </Template>
    )
}

export default React.memo(Detail)
