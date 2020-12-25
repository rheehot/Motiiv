import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import GridTemplate from '../components/Grid/GridTemplate';
import GridSlider from '../components/Grid/GridSlider';
import { getPostList } from '../lib/api/Post';
import Loading from '../components/Loading/Loading';

const Template = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 8%;
`;

function Home() {
    const [postListState, SetPostListState] = useState({
        status: 'idle',
        newPostList: null,
        popularPostList: null
    });
    const [categoryPostState, SetCategoryPostState] = useState({
        status: 'idle',
        originPostList: null,
        postList: null,
    });

    useEffect(()=>{
        SetPostListState({newPostList: null, popularPostList: null , status: 'pending'});
        SetCategoryPostState({postList: null, originPostList: null , status: 'pending'});
      try { 
          (async() => {
            const result = await getPostList();
                SetPostListState({
                status: 'resolved',
                newPostList: result.newest,
                popularPostList: result.popular,
            });
            SetCategoryPostState({
                status: 'resolved',
                originPostList: result.post,
                postList: result.post,

            });
            console.log(result);
          })();
      } catch (error) {
        SetPostListState({status: 'rejected', newPostList: null, popularPostList: null});
        SetCategoryPostState({status: 'rejected', postList: null, originPostList: null});
      }
    },[]);

    const ChangeCategory = (category)=>{
        if(category === '전체'){
            SetCategoryPostState({
                ...categoryPostState,
                postList: categoryPostState.originPostList,
                }
            )
        }else{
            SetCategoryPostState({
                ...categoryPostState,
                postList: categoryPostState.originPostList.filter((post)=> post.category_one === category),
                }
            )
        }
    }
return (
        <Template>
            {
                postListState.status === 'pending'? <Loading></Loading>
                : postListState.status === 'resolved'?
                <>      
                    <GridSlider text="새롭게 올라온 모티브" postList={postListState.newPostList}></GridSlider>
                    <GridSlider text="인기있는 모티브" postList={postListState.popularPostList}></GridSlider>
                </>
                : null
            }
            {
                categoryPostState.status === 'pending'? <Loading></Loading>
                : categoryPostState.status === 'resolved'?
                <GridTemplate ChangeCategory={ChangeCategory} postList={categoryPostState.postList}></GridTemplate>
                :null
            }   
        </Template>
        );

/*     switch (postListState.status){
        case 'pending':
            return <Loading></Loading>
        case 'rejected' :
            return <div>Load Fail</div>
        case 'resolved' :
            return (
                <Template>
                    <GridSlider text="새롭게 올라온 모티브" postList={postListState.newPostList}></GridSlider>
                    <GridSlider text="인기있는 모티브" postList={postListState.popularPostList}></GridSlider>
                    <GridTemplate ChangeCategory={ChangeCategory} postList={postListState.postList}></GridTemplate>
                </Template>
            );
        case 'idle':
            return <div>idle status</div> */
    
}

export default React.memo(Home)
