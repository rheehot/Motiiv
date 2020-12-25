import React, {useState,useEffect} from 'react'
import styled ,{css}from 'styled-components';
import Grid from './Grid';

const Template = styled.div`
    display : flex;
    flex-direction: column;
    margin-top: 10rem;
`;
const GridTemplates = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem,1fr));
    //grid-template-rows: repeat(auto-fill,minmax(30rem,1fr));
    justify-content: flex-start;
    grid-gap: 3rem;
    margin-top: 3rem;
`;
const CategoryBox = styled.form`
    display: flex;
`;
const CategoryButton = styled.button`
    color: rgba(153,206,253,1);
    background-color: rgba(240,249,254,1);
    font-size: 2rem;
    padding: 0.5rem;
    border: 2px solid rgba(203,231,253,1);
    margin-right: 1.5rem;
    margin-top: 2rem;
    cursor: pointer;
    font-weight: bold;
    outline: none;

    ${props =>
        props.choice === props.name ? css`
        background-color: rgba(135,199,255,1);
        color: rgba(240,249,254,1);`
        :null 
    }; 
`;
const TitleText = styled.div`
    font-size: 3rem;
    font-weight: bold;
`;
function GridTemplate({postList, ChangeCategory}) {
    const [choice, setChoice] = useState('전체');

    const onHandleClick = (evt)=>{
        setChoice(`${evt.target.name}`);
        ChangeCategory(`${evt.target.name}`);
    }
    return (
        <Template>
            <TitleText>모티브</TitleText>
            <CategoryBox>
                <CategoryButton onClick={onHandleClick} choice={choice} type="button" name='전체' value="전체">전체</CategoryButton>
                <CategoryButton onClick={onHandleClick} choice={choice} type="button" name='공부' value="공부">공부</CategoryButton>
                <CategoryButton onClick={onHandleClick} choice={choice} type="button" name='다이어트' value="다이어트">다이어트</CategoryButton>
                <CategoryButton onClick={onHandleClick} choice={choice} type="button" name='영어' value="영어">영어</CategoryButton>
                <CategoryButton onClick={onHandleClick} choice={choice} type="button" name='스타트업' value="스타트업">스타트업</CategoryButton>
            </CategoryBox>
            <GridTemplates>
                {
                    postList !== null ?
                    postList.map((post,idx)=>(
                        <Grid flag={1} key={`Grid-${idx}`} post={post}></Grid>
                    ))
                    :null
                }
            </GridTemplates>
        </Template>
    );
}

export default React.memo(GridTemplate)
