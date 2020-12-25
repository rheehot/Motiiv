import React from 'react'
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

const Template = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: rgba(126,196,253,1);
    align-items: center;
`;
const Logo = styled.div`
    font-size: 3.5rem;
    color: white;
    font-weight: bold;
    margin : 1rem , 0;
    margin-left: 10rem;
    cursor: pointer;
`;
const RightBox = styled.div`
    display: flex;
    color: white;
    margin: 1.5rem 0;
    margin-right: 8rem;
`;
const SearchIcon = styled.div`
    font-size: 3rem;
    margin: 0 2rem;
    cursor: pointer;
`;
const AvatarIcon = styled.div`
    font-size: 3rem;
    cursor: pointer;
`;
function Navbar({history}) {
    return (
        <Template> 
            <Logo onClick={()=> history.push('/')}>Motiiv</Logo> 
            <RightBox> 
                <SearchIcon><i class="fas fa-search"></i></SearchIcon> 
                <AvatarIcon><i class="fas fa-user-tie"></i></AvatarIcon> 
            </RightBox> 
        </Template> 
    )
}

export default withRouter(Navbar)
