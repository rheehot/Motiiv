import React from 'react'
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

const Template = styled.div`
    display: flex;
    flex-direction: column;
    //max-width: 30rem;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(222,223,223,1);
    cursor: pointer;
`;
const Image = styled.img`
    width: 100%;
    height: auto;
`;
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    width: 91%;
    //height: 40%;
`;
const TitleText = styled.div`
    font-size:2rem;
    font-weight: bold;
    color: rgba(105,183,252,1);
    margin-top: 1rem;
    //height: 45%;

    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 표시하고자 하는 라인 수 */
    -webkit-box-orient: vertical;
`;
const SubText = styled.div`
    font-size: 1.5rem;
    color: rgba(105,183,252,1);
    height: 60%;
    margin: 1rem 0;
    margin-bottom: 0;
    //white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    word-wrap: break-word;
    line-height: 2rem;
    max-height: 4rem;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 표시하고자 하는 라인 수 */
    -webkit-box-orient: vertical;
`;
const InfoBox = styled.div`
    display: flex;
    justify-content:space-between;
    margin-bottom: 1rem;
    margin-top: auto;
`;
const LeftInfo = styled.div`
    display: flex;
    margin-left: 5%;
    margin-top: 1rem;
`;
const LikeBox = styled.div`
    display: flex;
    color: rgba(51,157,251,1);
    margin-right: 2rem;
    
`;
const LikeIcon = styled.div`
    font-size: 1.5rem;
`;
const LikeText = styled.div`
    font-size: 1.3rem;
`;
const ShareButton = styled.div`
    font-weight: bold;
    font-size: 1.3rem;
    color: rgba(51,157,251,1);
    margin-right: 5%;
    margin-top: 1rem;
`;
const CommentBox = styled.div`
    display: flex;
    color: rgba(51,157,251,1); 
`;
const CommentIcon = styled.div`
    font-size: 1.5rem;
`;
const CommentText = styled.div`
    font-size: 1.3rem;
`;

function Grid({history, post, flag}) {
    return (
        <Template onClick={()=> history.push(`detail/${post.id}`)}>
            <Image src={post.thumbnailURL}></Image>
            <TextBox>
                <TitleText>{post.title}</TitleText>
                {
                    flag === 1?
                    <SubText>{post.description}</SubText>
                    :null
                }
            </TextBox> 
            <InfoBox>
                <LeftInfo>
                    <LikeBox>
                        <LikeIcon><i class="fas fa-heart"></i></LikeIcon>
                        <LikeText>{post.likeCnt}</LikeText>
                    </LikeBox>
                    <CommentBox>
                        <CommentIcon><i class="fas fa-plus-square"></i></CommentIcon>
                        <CommentText>101</CommentText>
                    </CommentBox>
                </LeftInfo>
                <ShareButton>
                    SHARE
                </ShareButton>
            </InfoBox>
        </Template>
    )
}

export default React.memo(withRouter(Grid));
